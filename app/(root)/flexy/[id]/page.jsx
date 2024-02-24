import React from 'react'

import { getFlexyById } from '@/lib/actions'
import { AddFlexyForm } from './components/add-flexy-form'

const Product = async ({params}) => {
  const flexy = await getFlexyById(params.id)

  return (
    <div className="flex-col mb-10">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AddFlexyForm 
        initialData={flexy} 
        />
      </div>
    </div>
  )
}

export default Product