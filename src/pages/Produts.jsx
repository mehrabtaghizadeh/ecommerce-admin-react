import { Link } from 'react-router-dom'
import {Button} from "@nextui-org/react";
import ProductTable from '../components/ProductTable.jsx'

function Produts() {

  return (
    <div>
      <div className='py-4 px-8 mt-4'>
        <Button variant='flat' className='bg-softblue text-darkblue font-bold rounded'>
          <Link className='text-blod text-lg' to={"/products/add"}>اضافه کردن محصول</Link>
        </Button>
      </div>
     <ProductTable/>
    </div>
  )
}

export default Produts