import { Fragment , useState } from "react";
import { Button } from "@nextui-org/react";
import BASE_URL from "../utils/BASE_URL";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'
import Lodding from "../components/Lodding";


function EditCategory() {
  const { id } = useParams();
  let   [isOpen, setIsOpen] = useState(false)
  let [saveModal, setSaveModal] = useState(false)
  const [properties, setProperties] = useState([]);
  const [Catid, setCatId] = useState()
  const [images, setImages] = useState();
  const [deletePrevCategory, setDeletePrevCategory] = useState(true);
  const [name, setName] = useState("");
  const { isLoading, error } = useQuery(["category"], () =>
    fetch(`${BASE_URL}/cat/oneCat/${id}`)
      .then((res) => res.json())
      .then((data) => {setCatId(data._id);setName(data.name);setProperties(data.properties);setImages(data.images)})
  );
  if (isLoading) return <Lodding />;

  if (error) return "خطا: " + error.message;

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
  function deleteCategory(Catid) {
    fetch(`${BASE_URL}/cat/deleteCat/${Catid}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  function deletePrevCat() {
    setDeletePrevCategory(false);
  }
  function editCategory(Catid) {
    saveModal(false)
    const data = {
      name,
      images,
      properties: properties?.map((pro) => ({
        name: pro.name,
        values: [pro.values]
      })),
        };
    // console.log(data);
    fetch(`${BASE_URL}/cat/edit/${Catid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  function uploadImg(ev) {
    const images = ev.target.files;
    const data = new FormData();

    if (images.length > 0) {
      for (const image of images) {
        data.append("image", image);
      }
    }
    fetch(`${BASE_URL}/upload`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <div className="p-8">
        <h3 className="text-blue-500 mb-4">اضافه کردن دسته بندی</h3>
        
            <input
              type="text"
              placeholder="نام"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="py-8">
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

              {/* {deletePrevCategory === true &&
                properties?.map((pro) => (
                  <div className="flex gap-3 transition-all py-4 max-sm:flex-col">
                    <input
                      type="text"
                      placeholder="سایز,رنگ و ..."
                      value={pro.name}
                    />
                    <input
                      type="text"
                      placeholder="زرد,آبی و ..."
                      value={pro.values}
                    />
                    <Button
                      variant="flat"
                      color="primary"
                      className="p-5 mb-1 rounded"
                      onClick={deletePrevCat}
                    >
                      حذف
                    </Button>
                  </div>
                ))} */}
              {properties.length > 0 &&
                properties.map((property, index) => (
                  <div className="flex gap-3 transition-all py-4 max-sm:flex-col">
                    <input
                      type="text"
                      placeholder="سایز,رنگ و ..."
                      onChange={(ev) =>
                        onChengeNameProperties(index, property, ev.target.value)
                      }
                      value={property.name}
                    />
                    <input
                      type="text"
                      placeholder="زرد,آبی, ..."
                      onChange={(ev) =>
                        onChengeValueProperties(
                          index,
                          property,
                          ev.target.value
                        )
                      }
                      value={property.values}
                    />
                    <Button
                      variant="flat"
                      color="primary"
                      className="p-4 mt-1 h-fit rounded"
                      onClick={() => removeProperties(index)}
                    >
                      حذف
                    </Button>
                  </div>
                ))}
                    <div className="flex gap-4 m-4">
                      <div className="flex flex-col p-8 justfi-center items-center border border-gary text-mainblack font-bold w-fit rounded gap-2">
                        <p>عکس محصول</p>
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
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>
                        <input
                          onChange={uploadImg}
                          multiple
                          type="file"
                          className="opacity-0 cursor-pointer w-10"
                        />
                      </div>
                      {images?.map((imag) => (
                        <img
                          src={imag.url}
                          className="w-40 aspect-square rounded"
                          alt=""
                        />
                      ))}
                    </div>
            </div>
            <div className="flex justify-start gap-8 px-8 py-2 max-md:justify-center">
              <Button
                onClick={openSaveModal}
                className="rounded"
                color="primary"
              >
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center  shadow-md transition-all">

                  <div className="py-4 px-8 mt-2">
                    <p className="text-sm text-gray-500">
                   آیا میخواهید "{name}" را ویرایش کنید ؟
                    </p>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      className="inline-flex justify-center rounded-md border border-blue bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeSaveModal}
                    >
                              بیخیال
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium bg-blue text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => editCategory(Catid)}
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
              <Button
                onClick={openModal}
                className="rounded"
                color="danger"
              >
                حذف
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
            <div className="flex min-h-full items-center justify-center py-4 px-8 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-md transition-all">

                  <div className="p-4 mt-2">
                    <p className="text-sm text-gray-500">
                                  آیا میخواهید "{name}" را حذف کنید ؟
                    </p>
                  </div>

                  <div className="flex justify-between  mt-4">
                    <button
                      className="inline-flex w-24 max-sm:w-20 justify-center rounded-md border border-transparent bg-blue text-white px-4 py-2 text-sm font-medium text-blue-900 hover:bg-softblue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      type="button"
                      onClick={closeModal}
                    >
                      نه
                    </button>
                    <button
                      className="inline-flex w-24 max-sm:w-20 justify-center rounded-md border border-transparent bg-red text-white px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => deleteCategory(Catid)}
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
            </div>
  
      </div>
    </div>
  );
}

export default EditCategory;
