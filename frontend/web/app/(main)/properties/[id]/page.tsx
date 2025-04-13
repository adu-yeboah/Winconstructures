"use client";
import React from 'react';
import { properties } from "@/constants/properties";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function PropertyDetail({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === parseInt(params.id));

  if (!property) return <p className="p-4 text-black">Property Not Found</p>;

  // Carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="container mx-auto mt-10 px-4 py-8">

      <div className="flex md:flex-row justify-evenly">

        <div className="w-1/2">

          {/* Title and Location */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className='flex gap-4.5 items-center'>
              <h1 className="text-secondary text-2xl md:text-3xl font-bold">{property.title}</h1>
              <span className='px-6 py-1.5 rounded bg-tertiary text-white'>{property.status.toUpperCase()}</span>
            </div>
            <div className="text-right mt-2 md:mt-0">
              <p className="text-secondary text-xl md:text-2xl font-semibold">{property.price}</p>
            </div>
          </div>

        {/* Carousel */}

          <div className="relative">
            <Slider {...settings}>
              {property?.images.map((image: any, index: number) => (
                <div key={index}>
                  <Image
                    src={image.img}
                    alt={`${property.title} image ${index + 1}`}
                    width={800}
                    height={500}
                    className="rounded-lg w-full h-[400px] object-cover"
                  />
                </div>
              ))}
            </Slider>
            {/* Pagination */}
            <div className="absolute bottom-4 left-4 bg-white text-gray-800 px-3 py-1 rounded text-sm">
              1/{property.images.length}
            </div>
          </div>

          {/* Property Details */}

          <div className="mt-6 bg-white py-3 px-6 rounded">
            <h4 className='text-xl'>Description</h4>
            <div className='bg-secondary h-[3px] w-[100px] rounded-xl mb-5'></div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore accusamus, eum in incidunt magnam vitae similique blanditiis reiciendis. Omnis, perspiciatis ratione optio mollitia excepturi pariatur molestiae possimus error qui reprehenderit.
              Velit soluta quaerat voluptatibus perspiciatis commodi, iste exercitationem illum dolore molestias, doloremque odio voluptatum cupiditate. Nisi eveniet pariatur perferendis, beatae quaerat vero. Cum nobis dolores, similique obcaecati cupiditate ab aliquid.
              Earum ipsum beatae laudantium et illum? Fugit eaque dignissimos, laborum aliquam explicabo architecto expedita eligendi, repudiandae provident vel fugiat dolores? Fuga repellat perspiciatis veritatis dicta deserunt enim eaque esse optio.
            </p>


          </div>


          {/* Details */}
          <div className="mt-6 bg-white py-3 px-6 rounded">
            <h4 className='text-xl'>Properties Details</h4>
            <div className='bg-secondary h-[3px] w-[100px] rounded-xl mb-5'></div>

            <div className="flex flex-wrap gap-7 text-gray-600 text-sm mb-2">

              <div className="flex flex-row gap-1.5">
                <h5 className='text-grey1'>Property Type:</h5>
                <span>{property.type}</span>
              </div>

              <div className="flex flex-row gap-1.5">
                <h5 className='text-grey1'>Bedrooms:</h5>
                <span>{property.bedrooms}</span>
              </div>


              <div className="flex flex-row gap-1.5">
                <h5 className='text-grey1'>sqr feet:</h5>
                <span>{property.area}</span>
              </div>


              <div className="flex flex-row gap-1.5">
                <h5 className='text-grey1'>Bathrooms:</h5>
                <span>{property.bathrooms}</span>
              </div>

              <div className="flex flex-row gap-1.5">
                <h5 className='text-grey1'>Status:</h5>
                <span>{property.status}</span>
              </div>

              <div className="flex flex-row gap-1.5">
                <h5 className='text-grey1'>type:</h5>
                <span>{property.type}</span>
              </div>


            </div>

          </div>


          {/* Property Video */}
          <div className="mt-6 bg-white py-3 px-6 rounded">
            <h4 className='text-xl'>Property Video</h4>
            <div className='bg-secondary h-[3px] w-[100px] rounded-xl mb-5'></div>

            <video src=""></video>
          </div>
        </div>






        {/* Advisor Contact Form */}
        <div className="w-1/3 bg-white max-h-min px-8 py-10 rounded-lg shadow-lg">
          <h3 className='text-xl font-bold text-secondary py-3'>Contact Us</h3>
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name *"
                className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email *"
                className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                placeholder="Phone"
                className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Message *"
                className="w-full border border-grey1 rounded px-4 py-2 h-35 resize-none focus:outline-none focus:ring-2 focus:ring-secondary"
              ></textarea>
            </div>

            <button className='bg-secondary text-white rounded px-10 py-1.5 cursor-pointer'>
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}