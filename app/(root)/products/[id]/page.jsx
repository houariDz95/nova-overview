import React from 'react'
import { AddProductForm } from '../components/AddProductForm' 
import { getProductById } from '@/lib/actions'

const Product = async ({params}) => {
  const product = await getProductById(params.id)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AddProductForm 
        initialData={product} 
        />
      </div>
    </div>
  )
}

export default Product