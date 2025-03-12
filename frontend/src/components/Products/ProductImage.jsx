import service from '@/appwrite/config'
import React, { useEffect, useState } from 'react'

const ProductImage = ({prod_image, className}) => {
    const [url, setUrl] = useState()
   
    useEffect(() => {
        service.getFilePreview(prod_image).then((image) => {
            if(image)
                setUrl(image)
        })
    }, [])
  return (
                            
    <img className={`object-cover ${className}`} src={url} alt="" />
   
  )
}

export default ProductImage