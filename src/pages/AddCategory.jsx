/* eslint-disable no-sequences */
import { Fragment ,useState } from "react";
import BASE_URL from "../utils/BASE_URL";
import { useQuery } from "react-query";
import {EditIcon} from "../components/icons/EditIcon.js";
import {DeleteIcon} from "../components/icons/DeleteIcon.js";
import { ToastContainer,toast } from 'react-toastify'
import { Link } from "react-router-dom";
import Lodding from "../components/Lodding.jsx";
import { Dialog, Transition } from '@headlessui/react'
import {Button} from "@nextui-org/react"
function AddCategory() {
  const [name, setName] = useState();
  const [properties, setProperties] = useState([]);
  const [category, setCategory] = useState([]);
  const [images,setImages] = useState()
  let   [isOpen, setIsOpen] = useState(false)
  let [saveModal, setSaveModal] = useState(false)
    const { isLoading, error  } = useQuery(["category"], () =>
       fetch(`${BASE_URL}/cat/all`)
      .then((res) => res.json())
      .then( data => setCategory(data)) 
  );
 
  if (isLoading) return <Lodding/>;
 
  if (error) return "An error has occurred: " + error.message;

   
  function closeSaveModal() {
    setSaveModal(false)
  }

  function openSaveModal() {
    setSaveModal(true)
  }
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const saveCategory = async (e) => {
    e.preventDefault();
    if(!name) {
      return toast.error('نام دسته بندی را وارد کنید')
    }

    const data = {
      name,images,
      properties: properties?.map(pro => ({
        name:pro.name , values:pro.values.split(",")
      }))
    }
   fetch(`${BASE_URL}/cat/new`,{
      method:'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data)
    }).then(res => res.json())
    .then(() => {
      toast.success("با موفقیت ثبت شد");
    })
     
    };
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
  function addProperties() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }
  function onChengeNameProperties(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function onChengeValueProperties(index, property, newValue) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValue;
      return properties;
    });
  }
  function removeProperties(indextoremov) {
    setProperties((prev) => {
      return [...prev].filter((p, index) => {
        return index !== indextoremov;
      });
    });
  }
  function deleteCategory (id) {
     setIsOpen(false);
     fetch(`${BASE_URL}/cat/deleteCat/${id}`,{
      method:'DELETE'
     })
     .then(res => res.json())
     .then(data => {console.log(data)})
  }
  return (
    <div>
      <div className="p-8">
        <ToastContainer/>
        <h3 className="text-blue-500 mb-4">اضافه کردن دسته بندی</h3>
        <input
          type="text"
          // className="w-60 rounded bg-primarywhite"
          placeholder="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="p-8">
        <Button
          className="text-bold rounded mb-6 flex"
          onClick={addProperties}
          type="button"
        >
          افزودن ویژگی
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </Button>
      </div>
      {properties.length > 0 &&
        properties.map((property, index) => (
          <div className="flex gap-3 transition-all py-4 px-6">
            <input
              type="text"
              placeholder="سایز,رنگ و ..."
              onChange={(ev) =>
                onChengeNameProperties(index, property, ev.target.value)
              }
              // className="w-60 rounded"
              value={property.name}
            />
            <input
              type="text"
              placeholder="زرد,آبی و ..."
              onChange={(ev) =>
                onChengeValueProperties(index, property, ev.target.value)
              }
              className="w-60 rounded"
              value={property.values}
            />
            <Button
              variant="flat"
              color="primary"
              className="p-4 mt-1 h-fit"
              onClick={() => removeProperties(index)}
            >
              حذف
            </Button>
          </div>
        ))}
      <div className="flex gap-4 m-4">
      <div className="flex flex-col p-8 justfi-center items-center border border-gary text-mainblack font-bold w-fit rounded gap-2">
        <p>عکس محصول</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
       <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
         <input onChange={uploadImg} multiple type="file" className="opacity-0 cursor-pointer w-10"/>
      </div>
       {images?.map(imag => (<img src={imag.url} className="w-40 aspect-square rounded" alt=""/>))}
        </div>  
      <div className="px-8 py-2">
        <Button className="rounded" color="primary" onClick={openSaveModal}>
          ثبت
        </Button>
        <Transition appear show={saveModal} as={Fragment}>
             <Dialog as="div" className="relative z-10" onClose={closeSaveModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                  <div className="flex mt-5 p-3">
                    <p className="text-sm text-gray-500">
                      آیا میخواهید یک دسته بندی جدید ایجاد کنید؟
                    </p>
                  </div>

                  <div className="flex justify-between mt-4">
                      <button>

                      </button>
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={saveCategory}         
                    >
                    ایجاد
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
                   </Transition>
      </div>
       
      <div className="relative rounded-md shadow border border-gary ml-16 mr-4 mt-12 max-lg:mx-8  max-sm:mx-2">
    <table className="w-full text-sm rtl:text-right">
        <thead className="text-xs uppercase border-b-1 border-gary max-sm:px-2  text-darkblue">
            <tr>
                <th scope="col" className="px-6 py-4">
                   نام دسته بندی
                </th>
                
                <th scope="col" className="px-6 py-4">
                    ویزگی ها
                </th>

                <th scope="col" class="px-6 py-3">
                    
                </th>
            </tr>
        </thead>
        <tbody>
          {category?.map( cat => (
            <tr key={cat._id} className="border-b-1 border-gary text-darkblue hover:bg-gary">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {cat.name}
                </th>
                 
                <td className="px-6 py-4">
                    <div className="flex justify-start gap-1">
                    {cat.properties?.map( pro => (<p>
                      {pro.name}
                      </p>))}
                    </div>
                    </td>

                <td className="px-6 py-4 flex justify-center items-center">
                  <Link to={`/editCategory/${cat._id}`} className="ml-8 max-sm:ml-5">
                    <EditIcon className="text-darkblue text-lg cursor-pointer"/>
                  </Link>
                  

                    <Button variant="" className="p-0 m-0" onPress={openModal}>
                     <DeleteIcon className="text-red text-lg cursor-pointer"/>
                    </Button>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                  <div className="flex mt-5 p-3">
                    <p className="text-sm text-gray-500">
                     آیا میخواهید "{cat.title}" را حذف کنید ؟
                    </p>
                  </div>

                  <div className="flex justify-between mt-4">

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => deleteCategory(cat._id)}         
                    >
                      حذف
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
                   </Transition>

                </td>
            </tr>          
          )
          )}
        </tbody>
    </table>
</div>

    </div>
  );
  }                    

export default AddCategory;
