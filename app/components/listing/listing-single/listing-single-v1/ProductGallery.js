"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import { CarDetails } from "@/app/api/useTanStackQuery"; 
import { FreeMode, Navigation, Thumbs } from "swiper";
import Image from "next/image";
import { useParams } from "next/navigation";



export default function ProductGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [carData, setCarData] = useState([]); 
  const { slugs } = useParams();

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const fetchedCarData = await CarDetails(slugs && slugs?.[0]); // Fetch car details based on slugs (car ID or identifier)
        setCarData(fetchedCarData); // Update carData state with fetched data
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarData();
  }, [slugs]);  

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="mySwiper2 sps_content single_product_grid user_profile"
          >
            {carData.map((car, index) => (
              <SwiperSlide key={index}>
                <div className="item">
                  <img
                    src={car?.images?.[0]?.img_url} // Adjust the path according to your API response
                    alt={car.model}
                    width={456}
                    height={254}
                    objectFit="cover"
                    className="w-100 h-100"
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="mySwiper mt-2 thumb-gallery-opacity"
          >
            {carData.length > 0 &&
              carData[0]?.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image.img_url}
                    alt={`Thumbnail ${index + 1}`}
                    width={163}
                    height={106}
                    objectFit="cover"
                    priority
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
