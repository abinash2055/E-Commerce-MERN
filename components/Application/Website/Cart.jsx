'use client'

import React from 'react'
import { BsCart2 } from "react-icons/bs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'
import { removeFromCart } from '@/store/reducer/cartReducer';

const Cart = () => {

  const cart = useSelector(store => store.cartStore)
  const dispatch = useDispatch()

  return (
    <Sheet>
      <SheetTrigger className="relative">
        <BsCart2
          size={25}
          className="text-gray-500 hover:text-primary" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">My Cart</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="h-[calc(100vh-40px)] pb-10 pt-2">
          <div className="h-[calc(100%-128px)] overflow-auto pe-2">
            {
              cart.count === 0 &&
              <div className="h-full flex justify-center items-center text-xl font-semibold">
                Your Cart is Empty..
              </div>
            }

            {
              cart.products?.map(product => (
                <div
                  key={product.variantId}
                  className="flex justify-between items-center gap-5 mb-4 border-b pb-4">
                  <div className="flex gap-5 items-center">
                    <Image
                      src={product?.media || imgPlaceholder.src}
                      height={100}
                      width={100}
                      alt={product.name}
                      className='w-20 h-20 rounded' />
                    <div>
                      <h4 className='text-lg mb-1'>{product.name}</h4>
                      <p className='text-gray-500'>
                        {product.size} / {product.color}
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="text-red-500 underline underline-offset-1 mb-2"
                      onClick={() => dispatch(removeFromCart({
                        productId: product.productId,
                        variantId: product.variantId
                      }))} >
                      Remove
                    </button>

                    <p className='font-semibold'>
                      {product.qty}
                    </p>

                  </div>

                </div>
              ))
            }

          </div>
          <div className="h-32 border-t pt-5"></div>
        </div>

      </SheetContent>
    </Sheet>
  )
}

export default Cart