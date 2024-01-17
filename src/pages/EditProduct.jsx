import { Fragment ,useEffect, useState} from "react";
import {Button } from '@nextui-org/react'
import {Select , SelectItem} from "@nextui-org/react";
import BASE_URL from "../utils/BASE_URL";
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'


function EditProduct() {
  const {id} = useParams() 
  let   [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState()
  const [categoryValue,setCategoryValue] = useState() 
  const [selCategory,setSelCategory] = useState()
  const [properties,setProperties] = useState([])
  const [selPropertiesName,setSelPropertiesName] = useState("")
  const [selPropertiesValue,setSelPropertiesValue] = useState("")
  const [images,setImages] = useState()
  const [quantity,setQuantity] = useState('')





  useEffect(()=>{
     fetch(`${BASE_URL}/products/one/${id}`)
     .then(res => res.json())
     .then(data => {
       data.map((pro) => {
        console.log(pro)
         setTitle(pro.title)
         setDescription(pro.description)
         setImages(pro.images)
         setCategoryValue(pro.category.name)
        // setSelCategory([pro.category])
         setPrice(pro.price)
         setQuantity(pro.quantity)
         setProperties(pro.properties)     
        //  properties.map(pro => pro.values.map(prop => setSelPropertiesValue(prop)))
       })
    })
    },[id])

  useEffect(()=>{
    fetch(`${BASE_URL}/cat/all`).then(res => res.json()).then(data => {
      setCategory(data)
    })
  },[])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
 
  const EditPro = (ev) => {
  ev.preventDefault();
  const data = {
    title,description,images,category:selCategory,price,
    properties:[{name:selPropertiesName,values:[selPropertiesValue.split(",")]}],quantity,
  }
   fetch(`${BASE_URL}/products/edit/${id}`,{
    method: 'PUT',
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
      <input type="text" placeholder="نام" className="w-60" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="number" placeholder="قیمت"  className="w-60" value={price}  onChange={e => setPrice(e.target.value)} />
      <input type="number" placeholder="تعداد" className="w-60" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <Select 
        label={categoryValue ? categoryValue : "دسته بندی"}
        value={categoryValue}
        className="max-w-xs" 
        onChange={e => setSelCategory(e.target.value)}
      >
        {category?.map(cat => (
          <SelectItem  key={cat._id} value={cat.name}>
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
        defaultValue={selPropertiesValue}
        onChange={e => {
          setSelPropertiesValue(e.target.value);
          setSelPropertiesName(pro.name);}}
      >
       {pro.values?.map(val =>
       <SelectItem  key={val} value={val}>{val}</SelectItem>
       ) 
        }
      </Select>
              </>
            ))
          }

        <div className="flex gap-4">
      <div className="flex flex-col p-8 justfi-center items-center border border-gary text-mainblack font-bold w-fit rounded gap-2">
        <p>عکس محصول</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
       <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
         <input onChange={uploadImg} multiple type="file" className="opacity-0 cursor-pointer w-10"/>
      </div>
       {images?.map(imag => imag.map(image => <img src={image.url} className="w-40 aspect-square rounded" alt=""/>))}
        </div>  
      
      <textarea
      placeholder="توضیحات خود را وارد کنید"
      className="max-w-xs"
      value={description}
      onChange={e => setDescription(e.target.value)}
    />
     <Button variant="flat" color="primary" className="w-fit p-2 text-bold text-lg" onClick={openModal}>ویرایش</Button>
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

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      آیا میخواهید "{title}" را ویرایش کنی؟
                    </p>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                    className="inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-blue focus:outline-none "
                    onClick={closeModal}                 
                    >
                    بیخیال
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-white  focus:outline-none "
                      onClick={EditPro}
                    >
                    ویرایش
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

export default EditProduct;