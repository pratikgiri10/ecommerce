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

    async createProd({name, description, image,  price}){
        try{
           return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                 conf.appwriteColllectionId,
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
                 conf.appwriteColllectionId,
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
                conf.appwriteColllectionId,
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
                conf.appwriteColllectionId,
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
}
const service = new Service()

export default service