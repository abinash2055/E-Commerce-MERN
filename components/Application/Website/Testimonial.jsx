'use client'

import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoStar } from "react-icons/io5";
import { BsChatQuote } from "react-icons/bs";

const testimonials = [
    {
        name: "Aarav Sharma",
        review: "I was initially skeptical, but this product exceeded my expectations in every way. The quality feels premium, and it performs exactly as promised. Customer support was responsive and helpful throughout the process.",
        rating: 5
    },
    {
        name: "Priya Verma",
        review: "From ordering to delivery, the entire experience was seamless. The packaging was neat and secure, ensuring the product arrived in perfect condition. I’m already recommending it to my friends and family.",
        rating: 4
    },
    {
        name: "Rohan Mehta",
        review: "This has been a game-changer for my daily routine. I appreciate the attention to detail in its design and usability. I can see myself using this for years to come without hesitation.",
        rating: 5
    },
    {
        name: "Sneha Kapoor",
        review: "It’s rare to find something that delivers on all its promises, but this one does. The performance, build quality, and after-sales service are all top-notch. Worth every penny I spent.",
        rating: 4
    },
    {
        name: "Vikram Singh",
        review: "I’ve tried similar products in the past, but none come close to this in terms of durability and ease of use. The instructions were clear, and setup was quick and straightforward.",
        rating: 5
    },
    {
        name: "Ananya Das",
        review: "The product design is sleek and modern, blending perfectly with my setup at home. I appreciate the fast delivery and the effort put into the eco-friendly packaging. It’s clear the company cares about the customer experience.",
        rating: 4
    },
    {
        name: "Kunal Joshi",
        review: "At first, I bought it for occasional use, but now I find myself relying on it daily. The build is solid, and the performance has been consistent since day one. Definitely one of my best purchases this year.",
        rating: 5
    },
    {
        name: "Meera Nair",
        review: "The customer service was quick to address my queries before purchase, which gave me confidence. After using it for a month, I can confirm it works exactly as described. Highly recommended for anyone considering it.",
        rating: 4
    },
    {
        name: "Aditya Khanna",
        review: "I appreciate that the company stands by its product with a solid warranty. The design is intuitive, and I had no trouble getting used to it. This has genuinely improved my daily workflow.",
        rating: 5
    },
    {
        name: "Ritika Bansal",
        review: "From unboxing to first use, I was impressed with the attention to detail. The product feels well-engineered and reliable. I’m very satisfied with my purchase and look forward to future upgrades from this brand.",
        rating: 5
    }
];


const Testimonial = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 3,  
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                }
            },
        ]
    }

    return (
        <div className='lg:px-32 px-4 sm:pt-20 pt-5 pb-10'>
            <h2 className="text-center sm:text-4xl text-2xl mb-5 font-semibold">Customer Review</h2>
            <Slider {...settings}>
                {testimonials.map((item, index) => (
                    <div key={index} className="p-5">
                        <div className="border rounded-lg p-5">
                            <BsChatQuote
                                size={30}
                                className='mb-3' />
                            <p className='mb-5'>{item.review}</p>
                            <h4 className="font-semibold">{item.name}</h4>
                            <div className="flex mt-1">
                                {Array.from({ length: item.rating }).map((_, i) => (
                                    < IoStar
                                        key={`star${i}`}
                                        className='text-yellow-400'
                                        size={20} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Testimonial