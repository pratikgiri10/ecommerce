import conf from '../config/conf.js'
import { Client, ID, Databases, Storage, Query} from 'appwrite'

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // for product collection
    async createProd({name, description, image,  price}){
        try{
           return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                 conf.appwriteProductCollectionId,
                  ID.unique(),
                    {
                         prod_name: name, 
                         prod_description: description,
                         prod_image: image,
                         price
                    })
        }catch(error){
             console.log("Appwrite service :: createProd :: error", error);
             
        }
    }
    async updateProd({name, description, image, status, price}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProductCollectionId,
                  ID.unique(),
                    {
                         name, 
                         description,
                         image,
                         status
                    })
        }catch(error){
             console.log("Appwrite service :: updateProd :: error", error);
             
        }
    }
    async deleteProd(){
        try{
            await this.databases.deleteDocument(  conf.appwriteDatabaseId,
                conf.appwriteProductCollectionId,
                 ID.unique())
                 return true
        }catch(error){
            console.log("Appwrite service :: deleteProd :: error", error)
            return false
        }
    }
    async getProds(){
        // queries = [Query.equal("status", "active")]
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProductCollectionId,
                // queries
            )
        }catch(error){
            console.log("Appwrite service :: getProd :: error", error)
        }
    }

    //upload file
    async uploadFile(file){
        try{
           return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log(error)
        }
    }
    async getFilePreview(fileId){
       
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
           
    
    }
    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        }catch(error){
            console.log(error)
        }
    }


    //for order collection
    async createOrder({order_price, order_items, order_status, userId, payment_method, payment_status}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteOrderCollectionId,
                ID.unique(),
                {
                    order_price,
                    order_items, 
                    order_status, 
                    customer: userId, 
                    payment_method, 
                    payment_status
                }
            );
        }catch(error){
            console.log("Appwrite service :: createOrder :: error", error);
        }
    }
    async getOrderInfo(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteOrderCollectionId,
                [

                ]
            )
        } catch (error) {
            console.log("Appwrite service :: getOrderInfo :: error", error);
        }
        
    }
    async getOrderHistory(id){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteOrderCollectionId,
                [
                    Query.equal('customer', id)
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: getOrderHistory :: error", error);
        }
    }
}









const service = new Service()

export default service