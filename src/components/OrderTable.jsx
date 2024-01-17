function OrderTable({orders}) {

  

      return (
      <div className="relative rounded-md shadow border border-gary mx-14 mt-12 max-lg:mx-12 max-lg:mr-8 max-sm:mx-6">
      <table className="w-full text-sm rtl:text-right">
        <thead className="text-xs uppercase border-b-1 border-gary max-sm:px-2  text-darkblue">
          <tr>
              <th scope="col" className="px-6 py-4">
                  نام محصول
              </th>

              <th scope="col" className="px-6 max-md:flex py-4">
              <p className='inline'>
             نام خریدار
              </p>
              <p className='hidden max-md:block'>
               , آدرس
              </p>
              </th>
              <th scope="col" className="px-6 py-4  max-md:hidden">
                آدرس
              </th>
              <th scope="col" class="px-6 py-3 max-md:hidden">
                  شماره تماس
              </th>
          </tr>
      </thead>
      <tbody>
          {orders?.map(order => (
          <tr key={order._id} className="border-b-1 border-gary text-darkblue hover:bg-gary">
              <th scope="row" className="px-6 py-4 max-sm:px-3 max-sm:py-3 max-sm:m-3 flex justify-start items-center gap-2 font-medium whitespace-nowrap text-darkblue">
                <div className='flex gap-2 max-sm:flex-col'>
                {order.lineItems.map(lineItem => 
                <div className='flex items-center flex-col gap-2 max-sm:flex-row max-sm:p-0 max-sm:m-0'>
                  <p className="font-bold">{lineItem.quantity}*{lineItem.title}</p>
                  {lineItem.color ? 
                  <p className='flex justify-center p-1 mt-2 w-fit bg-blue rounded text-white'>{lineItem.color}</p>
                  : ""}
                </div>
                  )}
                </div>
              </th>
              <td className='px-6 py-4 max-sm:px-4 max-sm:py-3'>
               <p>
               {order.fullName}
               </p>
               <p className='hidden max-md:inline'>
               {order.city},{order.streetAddress}
               </p>
              </td>
              <td className="px-6 py-4 max-md:hidden">
                  {order.city},{order.streetAddress}
              </td>
              <td className="px-6 py-4 max-md:hidden">
                  {order.phoneNumber}
              </td>
          </tr>
          ))}
      </tbody>
  </table>
      </div>
  )
}

export default OrderTable