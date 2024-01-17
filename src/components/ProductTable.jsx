import { EditIcon } from "./icons/EditIcon.js";
import { DeleteIcon } from "./icons/DeleteIcon.js";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import BASE_URL from "../utils/BASE_URL.js";
import Lodding from "./Lodding.jsx";
import { Button } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
function ProductTable() {
      const [products, setProducts] = useState();
      let [isOpen, setIsOpen] = useState(false);
      const { isLoading, error } = useQuery(["products"], () =>
        fetch(`${BASE_URL}/products/all`)
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
          })
      );
      function closeModal() {
        setIsOpen(false);
      }
    
      function openModal() {
        setIsOpen(true);
      }
      function deleteHandler(id) {
        fetch(`${BASE_URL}/products/delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success === true) {
              toast.success("با موفقیت حذف شد");
            }
          });
      }
    
      if (isLoading) return <Lodding />;
    
      if (error) return "An error has occurred: " + error.message;
    
  return (
      <div className="relative overflow-auto rounded-md shadow border border-gary py-4 mx-12 mt-12 max-lg:mt-16 max-lg:mr-8 max-sm:mx-3">
      <ToastContainer/>
      <table className="w-full text-sm rtl:text-right">
        <thead className="text-xs uppercase border-b-1 border-gary max-sm:px-2  text-darkblue">
          <tr>
            <th scope="col" className="px-6 py-4 max-sm:px-4">
              <p className="font-bold text-sm max-sm:mr-5">نام محصول</p>
            </th>

            <th scope="col" className="px-6 py-4 max-lg:hidden">
              دسته بندی
            </th>
            <th scope="col" className="px-6 py-4 max-sm:hidden">
              قیمت
            </th>
            <th scope="col" class="px-6 py-3 max-sm:px-4"></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr
              key={product._id}
              className="border-b-1 border-gary text-darkblue hover:bg-gary"
            >
              <th
                scope="row"
                className="px-6 py-4 flex justify-start items-center gap-2 font-medium whitespace-nowrap text-darkblue"
              >
                {product.images[0].map((image) => (
                  <img
                    src={image.url}
                    className="w-16 rounded max-sm:w-12"
                    alt="product main pic"
                  />
                ))}
                <h3 className="font-bold text-sm">{product?.title}</h3>
              </th>
              <td className="px-6 py-4 max-lg:hidden">
                {product.category?.name}
              </td>
              <td className="px-6 py-4 max-sm:hidden">{product?.price}</td>
              <td className="px-6 py-4 max-sm:px-4">
                <div className="flex items-center justify-center gap-5 max-sm:gap-3 ">
                  <Link to={`/products/edit/${product._id}`}>
                    <EditIcon className="text-darkblue text-lg" />
                  </Link>
                  <Button onPress={openModal} variant="light">
                    <DeleteIcon className="cursor-pointer text-red text-lg" />
                  </Button>
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
                    >
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
                                  آیا میخواهید "{product.title}" را حذف کنید ؟
                                </p>
                              </div>

                              <div className="flex justify-between mt-4">
                                <button
                                  className="inline-flex justify-center rounded-md border border-blue bg-blue-100 px-4 py-2 text-sm font-medium text-blue hover:bg-softblue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={closeModal}
                                >
                                  بیخیال
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={() => deleteHandler(product._id)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable