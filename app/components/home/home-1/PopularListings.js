"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import listingCar from "@/data/listingCar";
import Image from "next/image";
import { QueryClientProvider, useQuery, QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import SearchCar from "@/app/api/useTanStackQuery";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { FaLocationDot } from "react-icons/fa6";

const PopularListings = () => {
  const queryClient = new QueryClient();
  const params = useParams();


  const {
    data: SearchData = [],
    isLoading: SearchIsLoading,
    isError: SearchIsError,
  } = useQuery({
    queryKey: ["trending"],
    queryFn: () => SearchCar({ trending: 1 }),
    // enabled: "trending" === params?.slugs?.[0].toLowerCase(),
    staleTime: 5000,
  });
  console.log(SearchData)
  
  if (SearchIsLoading) return <div>Loading...</div>;
  if (SearchIsError) return <div>Error loading data...</div>;

  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-IN").format(number);
  };

  const formatKilometers = (kms) => {
    if (kms >= 1000) {
      return `${(kms / 1000).toFixed(0)}K Km`;
    }
    return `${kms} KM`;
  };

  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        speed={1000}
        modules={[Navigation]}
        navigation={{
          nextEl: ".p1-arrow-next",
          prevEl: ".p1-arrow-prev",
        }}
        breakpoints={{
          // breakpoints for responsive design
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {SearchData.map((car) => (
          <SwiperSlide key={car.carSkuId}>
            <div className="item">
              <div className="car-listing">
                <div className="thumb">
                  {car.featured ? (
                    <>
                      <div className="tag">FEATURED</div>
                    </>
                  ) : undefined}
                  {!car.featured ? (
                    <>
                      <div className="tag blue">SPECIAL</div>
                    </>
                  ) : undefined}

                  <Image
                    width={284}
                    height={183}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    priority
                    src={car.imageUrl}
                    alt={car.modalName}
                  />
                  <div className="thmb_cntnt2">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <a className="text-white" href="#">
                          <span className="flaticon-photo-camera mr3" /> Photos
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="text-white" href="#">
                          <span className="flaticon-play-button mr3" /> Videos
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="thmb_cntnt3">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <a href="#">
                          <span className="flaticon-shuffle-arrows" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <span className="flaticon-heart" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="details">
                  <div className="wrapper">
                    <h6 className="title">
                      <Link href="/listing-single-v1">{car.make_year} {car.make} {car.modalName}{" "}
                      {car.varientName}</Link>
                    </h6>
                    <h5 className="price"><span>&#8377;</span> {formatNumberWithCommas(car?.discounted_price)}</h5>
                    <p className="text-xs lg:text-[9px] xl:text-[12px] font-medium text-green-700">
                      <span className="line-through text-[#00000070]">
                        <span>&#8377;</span>
                        {formatNumberWithCommas(car?.actual_price)}
                      </span>{" "}
                      (Save <span>&#8377;</span>
                      {formatNumberWithCommas(
                        car?.actual_price - car?.discounted_price
                      )}
                      )
                    </p>
                    <div className="listign_review">
                      <ul className="mb0">
                        {/* {[...Array(5)].map((_, index) => (
                        <li key={index} className="list-inline-item">
                          <a href="#">
                            <i className="fa fa-star" />
                          </a>
                        </li>
                      ))} */}
                        <li className="list-inline-item">
                          <a href="#"><FaLocationDot /></a>
                        </li>
                        <li className="list-inline-item">
                          ({car.address})
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="listing_footer">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <span className="flaticon-road-perspective me-1" />
                        {formatKilometers(car?.driven_kms)}
                      </li>
                      <li className="list-inline-item">
                        <span className="flaticon-gas-station me-1" />
                        {car.fuel_desc}
                      </li>
                      <li className="list-inline-item">
                        <span className="flaticon-gear  me-1" />
                        {car.transmission_desc}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="d-none d-sm-block">
        <div className="slider-arrow-center">
          <button className="prev p1-arrow-prev">
            <i className="flaticon-left-arrow"></i>
          </button>
          <button className="next p1-arrow-next">
            <i className="flaticon-right-arrow"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default PopularListings;
