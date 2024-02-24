import { getProducts } from '@/lib/actions'
import React from 'react'
import { format, addDays } from 'date-fns'
import { ProductsClient } from './components/product-client'
import { formatter } from '@/lib/utils'

const Poducts = async (paramsKey) => {

  const today = new Date();
  const startDateDefault = paramsKey.searchParams.start_date
    ? new Date(paramsKey.searchParams.start_date)
    : addDays(today, -5); // Set to today - 5 days
  
  const endDateDefault = paramsKey.searchParams.end_date
    ? new Date(paramsKey.searchParams.end_date)
    : today; // Set to today
  
  // Format dates in 'YYYY-MM-DD' using date-fns
  paramsKey.searchParams.start_date = format(startDateDefault, 'yyyy-MM-dd');
  paramsKey.searchParams.end_date = format(endDateDefault, 'yyyy-MM-dd');
  
  // Now startDate and endDate have default values in the desired format
  const startDate = paramsKey.searchParams.start_date;
  const endDate = paramsKey.searchParams.end_date;
  const search = paramsKey.searchParams.search;

  const products = await getProducts(startDate, endDate, search)

  const totalProfit = products.reduce((sum, product) => sum + product.profit, 0);

  return (
    <div className="flex flex-col mb-10">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={products} startDate={startDate} endDate={endDate} search={search} />
        <h2 className='text-md mt-4 px-5 py-1 rounded-md border dark:text-green-500 font-semibold text-red-500 w-fit flex float-right'>
          {formatter.format(totalProfit)}
        </h2>
      </div>
    </div>
  )
}

export default Poducts