'use client'

import ButtonLoading from '@/components/Application/ButtonLoading'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/useFetch'
import { showToast } from '@/lib/showToast'
import { zSchema } from '@/lib/zodSchema'
import { WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import { addIntoCart, clearCart } from '@/store/reducer/cartReducer'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { IoCloseCircleSharp } from 'react-icons/io5'

const breadCrumb = {
    title: 'Checkout',
    links: [
        { label: "Checkout" }
    ]
}


const Checkout = () => {

    const dispatch = useDispatch()


    const [subtotal, setSubTotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [couponDiscountAmount, setCouponDiscountAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [couponCode, setCouponCode] = useState('')

    const cart = useSelector(store => store.cartStore)
    const [verifiedCartData, setVerifiedCartData] = useState([])

    const [isCouponApplied, setIsCouponApplied] = useState(false)
    const [couponLoading, setCouponLoading] = useState(false)

    const { data: getVerifiedCartData } = useFetch('/api/cart-verification', 'POST', {
        data: cart.products
    })

    useEffect(() => {
        if (getVerifiedCartData && getVerifiedCartData.success) {
            const cartData = getVerifiedCartData.data
            setVerifiedCartData(cartData)
            dispatch(clearCart())

            cartData.forEach(cartItem => {
                dispatch(addIntoCart(cartItem))
            });

        }
    }, [getVerifiedCartData])

    useEffect(() => {
        const cartProducts = cart.products
        const subTotalAmount = cartProducts.reduce((sum, product) => sum + (product.sellingPrice * product.qty), 0)

        const discount = cartProducts.reduce((sum, product) => sum + ((product.mrp - product.sellingPrice) * product.qty), 0)

        setSubTotal(subTotalAmount)
        setDiscount(discount)
        setTotalAmount(subTotalAmount)

        couponForm.setValue('minShoppingAmount', subTotalAmount)

    }, [cart])

    // Coupon Form
    const couponFormSchema = zSchema.pick({
        code: true,
        minShoppingAmount: true
    })

    const couponForm = useForm({
        resolver: zodResolver(couponFormSchema),
        defaultValues: {
            code: "",
            minShoppingAmount: subtotal
        }
    })

    const applyCoupon = async (values) => {
        setCouponLoading(true)

        try {
            const { data: response } = await axios.post('/api/coupon/apply', values)
            if (!response.success) {
                throw new Error(response.message)
            }

            const discountPercentage = response.data.discountPercentage

            // Get coupon discount Amount
            setCouponDiscountAmount((subtotal * discountPercentage) / 100)
            setTotalAmount(subtotal - ((subtotal * discountPercentage) / 100))

            showToast('success', response.message)
            setCouponCode(couponForm.getValues('code'))
            setIsCouponApplied(true)

            couponForm.resetField('code', '')
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setCouponLoading(false)
        }
    }

    const removeCoupon = () => {
        setIsCouponApplied(false)
        setCouponCode('')
        setCouponDiscountAmount(0)
        setTotalAmount(subtotal)
    }

    return (
        <div>
            <WebsiteBreadcrumb props={breadCrumb} />

            {cart.count === 0 ?
                <div className="w-screen h-[500px] flex justify-center items-center py-32">
                    <div className="text-center">
                        <h4 className="text-4xl font-semibold mb-5">Your cart is empty!</h4>
                        <Button type="button" asChild>
                            <Link href={WEBSITE_SHOP}>Continue Shopping</Link>
                        </Button>
                    </div>
                </div>
                :
                <div className="flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32 px-4">
                    <div className="lg:w-[60%] w-full"></div>
                    <div className="lg:w-[40%] w-full">
                        <div className="rounded bg-gray-50 p-5 sticky top-5">
                            <h4 className='text-lg font-semibold mb-5'>Order Summary</h4>
                            <div>

                                <table className="w-full border ">
                                    <tbody>
                                        {
                                            verifiedCartData && verifiedCartData?.map(product => (
                                                <tr key={product.variantId}>
                                                    <td className='p-3'>
                                                        <div className="flex items-center gap-5">
                                                            <Image
                                                                src={product.media}
                                                                width={60}
                                                                height={60}
                                                                alt={product.name}
                                                                className='rounded' />
                                                            <div>
                                                                <h4 className="font-medium line-clamp-1">
                                                                    <Link href={WEBSITE_PRODUCT_DETAILS(product.url)} >
                                                                        {product.name}
                                                                    </Link>
                                                                </h4>
                                                                <p className="text-sm">
                                                                    Color: {product.color}
                                                                </p>
                                                                <p className="text-sm">
                                                                    Size: {product.size}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="p-3 text-center">
                                                        <p className="text-nowrap text-sm">
                                                            {product.qty} X {product.sellingPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>

                                <table className='w-full'>
                                    <tbody>
                                        <tr>
                                            <td className="font-medium py-2">Subtotal</td>
                                            <td className="text-end py-2">
                                                {subtotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="font-medium py-2">Discount</td>
                                            <td className="text-end py-2">
                                                - {discount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} </td>
                                        </tr>

                                        <tr>
                                            <td className="font-medium py-2">Coupon Discount</td>
                                            <td className="text-end py-2">
                                                -  {couponDiscountAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="font-medium py-2 text-xl">Total</td>
                                            <td className="text-end py-2">
                                                {totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div>
                                    {
                                        !isCouponApplied ?
                                            <Form {...couponForm}>
                                                <form
                                                    className="flex justify-betwen gap-5"
                                                    onSubmit={couponForm.handleSubmit(applyCoupon)}>
                                                    <div className="w-[calc(100%-100px)]">
                                                        <FormField
                                                            control={couponForm.control}
                                                            name='code'
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Input placeholder="Enter coupon code" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}></FormField>
                                                    </div>

                                                    <div className="w-[100px]">
                                                        <ButtonLoading
                                                            type="submit"
                                                            text="Apply"
                                                            className="w-full cursor-pointer"
                                                            loading={couponLoading} />
                                                    </div>

                                                </form>
                                            </Form>
                                            :
                                            <div className="flex justify-between py-1 px-5 rounded-lg bg-gray-200">
                                                <div>
                                                    <span className='text-xs'>
                                                        Coupon:
                                                    </span>
                                                    <p className="text-sm font-semibold">
                                                        {couponCode}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    className='text-red-500 cursor-pointer'
                                                    onClick={removeCoupon}>
                                                    <IoCloseCircleSharp size={25} />
                                                </button>
                                            </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Checkout