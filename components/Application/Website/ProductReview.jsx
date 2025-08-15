'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Progress } from '@/components/ui/progress'
import React, { useState } from 'react'
import { IoStar } from 'react-icons/io5'
import ButtonLoading from '../ButtonLoading'
import { Input } from '@/components/ui/input'
import { zSchema } from '@/lib/zodSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const ProductReview = ({ product }) => {

    const [loading, setLoading] = useState(false)

    const formSchema = zSchema.pick({
        name: true,
        slug: true
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
        },
    });

    const handleReviewSubmit = (values) => {
        //
    }

    return (
        <div className="shadow rounded border mb-20">
            <div className="p-3 bg-gray-50 border-b">
                <h2 className="font-semibold text-2xl">Rating & Reviews</h2>
            </div>
            <div className='p-3'>
                <div className="flex justify-between flex-wrap items-center">
                    <div className="md:w-1/2 w-full md:flex md:gap-10 md:mb-0 mb-5">
                        <div className="md:w-[200px] w-full md:mb-0 mb-5">
                            <h4 className="text-center text-8xl font-semibold">0.0</h4>
                            <div className="flex justify-center gap-2">
                                <IoStar />
                                <IoStar />
                                <IoStar />
                                <IoStar />
                                <IoStar />
                            </div>

                            <p className="text-center mt-3">
                                (0 Rating & Reviews)
                            </p>
                        </div>

                        <div className="md:w-[calc(100%-200px)] flex items-center">
                            <div className="w-full">

                                {[5, 4, 3, 2, 1].map(rating => (
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center gap-1">
                                            <p className="w-3">{rating}</p>
                                            <IoStar />
                                        </div>
                                        <Progress value={20} />
                                        <span className="text-sm">20</span>
                                    </div>
                                ))}


                            </div>
                        </div>

                    </div>

                    <div className="md:w-1/2 w-full md:text-end text-center">
                        <Button
                            type="button"
                            variant="outline"
                            className="md:w-fit w-full py-6 px-10" >
                            Write Review
                        </Button>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleReviewSubmit)}>

                        <div className="mb-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Enter category name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mb-5">
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Enter category slug" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mb-3">
                            <ButtonLoading
                                loading={loading}
                                type="submit"
                                text="Add Category"
                                className="cursor-pointer"
                            />
                        </div>
                    </form>
                </Form>

            </div>
        </div>
    )
}

export default ProductReview