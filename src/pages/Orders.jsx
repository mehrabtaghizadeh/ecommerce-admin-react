import { useEffect, useState } from 'react'
import BASE_URL from '../utils/BASE_URL'
import OrderChart from '../components/OrderChart'
import OrderTable from '../components/OrderTable'
function Orders() {
  const [orders,setOrders] = useState()
  useEffect(()=>{
    function fetchFunc() {
      fetch(`${BASE_URL}/orders/all`).then(res => res.json()).then(data => {setOrders(data)})
    }
    fetchFunc()
  },[orders])

   

    return (
    <div>

      <h3 className='py-4 px-6 text-xl font-bold text-blue '>سفارشات</h3>
        <OrderChart/>
          <OrderTable orders={orders}/>
    </div>
  )
}

export default Orders