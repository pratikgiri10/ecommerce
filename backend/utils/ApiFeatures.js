class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;

    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i' // case insensitive
            }
        } : {}

        this.query = this.query.find({...keyword});
        return this
    }
    filter(){
        const queryStrObj = { ...this.queryStr }

        //we need to remove the special fields from the query string 
        const removeFields = ['sort', 'limit', 'page', 'fields']
        removeFields.forEach(el => delete queryStrObj[el]);

        // we need to replace gte with $gte
        //like price[gte]=100 -> { price : { $gte: 100 }}
        // after that this query string is passed to the query

        // let queryStr = JSON.stringify(queryStrObj)
        // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        // this.query = this.query.find(JSON.parse(queryStr));
        // return this


        const mongoQuery = {};
        Object.keys(queryStrObj).forEach((key) => {
        if (key.includes("[")) {
            // Handle operator-based queries like price[gte]=100
            const [field, operator] = key.replace("]", "").split("[");
            if (!mongoQuery[field]) mongoQuery[field] = {};
            mongoQuery[field][`$${operator}`] = queryStrObj[key];
            } else {
                // Handle simple equality queries like category=electronics
                mongoQuery[key] = queryStrObj[key];
            }
        });
        this.query = this.query.find(mongoQuery);
        return this;
    }
    sort(){
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(" ");
            this. query = this.query.sort(sortBy);
        } else{
            this.query = this.query.sort('_createdAt');
        }
        return this
    }
    limitFields(){
        if(this.queryStr.fields){
            const fields = this.queryStr.split(',').join(' ');
            this.query = this.query,select(fields);
        } else {
            this.query = this.query.select("-_v")
        }
        return this
    }

    paginate(){
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 12;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
export default ApiFeatures