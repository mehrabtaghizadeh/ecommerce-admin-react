import { Fragment ,useEffect, useState} from "react";
import {Button } from '@nextui-org/react'
import {Select , SelectItem} from "@nextui-org/react";
import BASE_URL from "../utils/BASE_URL";
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'

function AddProduct() {
  const navigate = useNavigate()
  let [isOpen, setIsOpen] = useState(false)
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState()
  const [selCategory,setSelCategory] = useState()
  const [properties,setProperties] = useState([])
  const [selPropertiesName,setSelPropertiesName] = useState("")
  const [selPropertiesValue,setSelPropertiesValue] = useState("")
  const [images,setImages] = useState()
  const [quantity,setQuantity] = useState('')

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  useEffect(()=>{
    fetch(`${BASE_URL}/cat/all`).then(res => res.json()).then(data => {
      setCategory(data)
    })
  },[])
 const newProduct = (ev) => {
  ev.preventDefault();
  setIsOpen(false)
  const data = {
    title,description,images,category:selCategory,price,
    properties:[{name:selPropertiesName,values:[selPropertiesValue.split(",")]}],quantity,
  }
   fetch(`${BASE_URL}/products/new`,{
    method: 'POST',
    headers:{
       'content-type': 'application/json'
    },
    body:JSON.stringify(data)
   }).then(res => res.json())
   .then(() => {
    navigate("/products")
    toast.success("با موفقیت ثبت شد")
  })
 } 
   useEffect(()=>{
    if(selCategory){
      fetch(`${BASE_URL}/cat/oneCat/${selCategory}`)
      .then(res => res.json())
      .then(data => {
        setProperties(data.properties)
      }) 
    }},[selCategory])
     
    function uploadImg (ev) {
     const images = ev.target.files
        const data = new FormData()
       
          if(images.length > 0){
            for(const image of images){
              data.append('image',image)
            }
          }
       fetch(`${BASE_URL}/upload`,{
        method:'post',
        body:data
      }).then(res => res.json())
      .then(data =>{setImages(data)}).catch(err => console.log(err))
    }

  return (
    <div className="flex flex-col mt-4 gap-9 p-6">
    <ToastContainer/>
      <input type="text" placeholder="نام" className="w-60" onChange={e => setTitle(e.target.value)} />
      <input type="number" placeholder="قیمت"  className="w-60"  onChange={e => setPrice(e.target.value)} />
      <input type="number" placeholder="تعداد" className="w-60" onChange={e => setQuantity(e.target.value)} />
      <Select 
        label="دسته بندی"
        className="max-w-xs" 
        onChange={e => setSelCategory(e.target.value)}
      >
        {category?.map(cat => (
          <SelectItem key={cat._id} value={cat.name}>
            {cat.name}
          </SelectItem>
        ))}
      </Select>
      
          {
            properties?.map(pro => (
              <>
              <Select 
        label={pro.name} 
        className="max-w-xs"
        selectionMode="multiple"
        onChange={e => {
          setSelPropertiesValue(e.target.value);
          setSelPropertiesName(pro.name);}}
      >
       {pro.values?.map(val => 
        <SelectItem  key={val} value={val}>{val}</SelectItem>
        )}
      </Select>
              </>
            ))
          }

        <div className="flex max-md:flex-col gap-4">
      <div className="flex flex-col p-8 justfi-center items-center border border-gary text-mainblack font-bold w-fit rounded gap-2">
        <p>عکس محصول</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
       <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
         <input onChange={uploadImg} multiple type="file" className="opacity-0 cursor-pointer w-10"/>
      </div>
       {images?.map(imag => (<img src={imag.url} className="w-40 aspect-square rounded" alt=""/>))}
        </div>  
      
      <textarea
      placeholder="توضیحات خود را وارد کنید"
      className="max-w-xs"
      value={description}
      onChange={e => setDescription(e.target.value)}
    />
     <Button variant="flat" color="primary" className="w-fit p-2 text-bold text-lg" onClick={openModal}>ثبت</Button>
     <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">

                  <div className="py-12 mt-2">
                    <p className="text-sm text-gray-500">
                                      ؟آیا میخواهید محصول جدید اضافه کنید
                    </p>
                  </div>

                  <div className="flex justify-between mt-3">
                   <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                   onClick={closeModal}>نه</button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium bg-blue text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={newProduct}
                    >
                      ثبت
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default AddProduct;