import service from '@/appwrite/config'
import React, { useEffect, useState } from 'react'
import ProductImage from '../Products/ProductImage'


const ViewProducts = () => {
    const [post, setPost] = useState([])
   
    useEffect(() => {
      // console.log(post)
        service.getProds().then((data) =>{
            console.log(data)
             setPost(data.documents)
        })
    }, [])
  return   ( 
        <div>
         
                { post.map(({prod_name, prod_description, prod_image, idx}) => {
                    return <div key={idx}>
                         <div >{prod_name}</div>
                         <div>{prod_description}</div>
                         <ProductImage prod_image={prod_image}/>
                        
                         
                    </div>
                })}
        </div>
   
      )
}  

export default ViewProducts