import React, { useEffect, useState } from 'react'

const ProductImage = ({prod_image, className}) => {

  return (
                            
    <img className={`object-cover ${className}`} src={prod_image} alt="" />
   
  )
}

export default ProductImage