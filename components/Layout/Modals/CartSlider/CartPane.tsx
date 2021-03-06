import { Fragment, memo } from "react"
import { Dialog, Transition } from "@headlessui/react"
import shallow from "zustand/shallow"
import ArrowRightIcon from "@heroicons/react/outline/ArrowRightIcon"
import XIcon from "@heroicons/react/outline/XIcon"

import useStore from "@lib/hooks/useStore"

import Link from "@components/Link"
import CartItem from "./CartItem"

import { StyledCartPane } from "./style"
import useCart from "@lib/hooks/useCart"
import { useGetUiStringsQuery } from "@api/gql/types"
import useLocale from "@lib/hooks/useLocale"

const CartPane = memo(function CartPane() {
  const { cart, setCheckout, setOpen } = useStore(
    state => ({
      cart: state.cart.state,
      setCheckout: state.cart.setCheckout,
      setOpen: state.cart.setOpen,
    }),
    shallow,
  )
  const { locale } = useLocale()
  const [{ data }] = useGetUiStringsQuery({ variables: { id: `ui-${locale}` } })

  const cartStrings = data?.artilleryPage?.ACFui?.cart

  const { clearCart } = useCart()

  const handleCheckout = () => {
    setCheckout(true)
  }

  const handleClearCart = async () => {
    await clearCart()
  }

  return (
    <>
      <StyledCartPane>
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <Dialog.Title className="text-lg font-extrabold text-gray-900">
                    {cartStrings?.title ?? "Shopping Cart"}
                  </Dialog.Title>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      className="-m-2 p-2 text-gray-400 hover:text-red-main outline-none ring-transparent"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8 h-full">
                  <div className="flow-root h-full">
                    {cart?.contents?.nodes &&
                    cart.contents.nodes?.length > 0 ? (
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cart?.contents?.nodes &&
                          cart?.contents?.nodes.map(lineItem => (
                            <CartItem
                              key={lineItem?.key}
                              lineItem={lineItem}
                              removeItemString={cartStrings?.removeItem}
                              setOpen={setOpen}
                            />
                          ))}
                      </ul>
                    ) : (
                      <div className="text-gray-600 h-full">
                        <div className=" font-bold">
                          {cartStrings?.emptyCart ?? "Your cart is empty..."}
                        </div>
                        <div className="mt-8 h-full">
                          <Link
                            href="/products"
                            className="text-gray-800 h-full transition hover:text-green-main font-bold flex justify-center items-center"
                            onClick={() => setOpen(false)}
                          >
                            {cartStrings?.emptyActionLabel ?? "Visit our shop!"}
                            <ArrowRightIcon className="h-4 w-4 text-green-main ml-2" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`border-t border-gray-200 py-6 px-4 sm:px-6${
                  cart?.isEmpty !== false && " hidden"
                }`}
              >
                {/* <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{cart?.subtotal}</p>
                  </div> */}
                <div className="mt-2">
                  <button
                    onClick={handleCheckout}
                    className="flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-main hover:bg-green-main"
                  >
                    {cartStrings?.checkout ?? "Checkout"}
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <button
                    type="button"
                    className="text-red-600 font-medium hover:text-green-main"
                    onClick={handleClearCart}
                  >
                    {cartStrings?.clearCart ?? "Clear Cart"} &nbsp;
                  </button>
                  <p>
                    or{" "}
                    <button
                      type="button"
                      className="text-blue-main font-medium hover:text-green-main"
                      onClick={() => setOpen(false)}
                    >
                      {cartStrings?.closeCart ?? "Continue Shopping"}
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </StyledCartPane>
    </>
  )
})

export default CartPane
