"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchCar from "../../../api/useTanStackQuery";
import { FaLocationDot } from "react-icons/fa6";

const FeaturedFilterListing = () => {
  const [filter, setFilter] = useState("*");

  const {
    data: SearchData = [],
    isLoading: SearchIsLoading,
    isError: SearchIsError,
  } = useQuery({
    queryKey: ["SearchCarKey"],
    queryFn: SearchCar,
    staleTime: 5000,
  });

  if (SearchIsLoading) return <div>Loading...</div>;
  if (SearchIsError) return <div>Error loading data...</div>;
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-IN").format(number);
  };

  const filteredItems =
    filter === "*"
      ? SearchData.slice(0, 8)
      : SearchData.slice(0, 8).filter((item) => item.status === filter);


  return (
    <div className="popular_listing_sliders">
      {/* Nav tabs */}
      <div className="nav nav-tabs justify-content-center">
        <button
          className={filter === "*" ? "active nav-link" : "nav-link"}
          onClick={() => setFilter("*")}
        >
          All Status
        </button>
        <button
          className={filter === "Active" ? "active nav-link" : "nav-link"}
          onClick={() => setFilter("Active")}
        >
          Active Cars
        </button>
        <button
          className={filter === "Inactive" ? "active nav-link" : "nav-link"}
          onClick={() => setFilter("Inactive")}
        >
          Inactive Cars
        </button>
      </div>
      {/* Tab panes */}
      <div className="row">
        {filteredItems.map((car) => (
          <div className="col-sm-6 col-xl-3" key={car.car_id}>
            <div className="car-listing">
              <div className="thumb">
                {car.discountPercent > 0 ? (
                  <div className="tag">FEATURED</div>
                ) : (
                  <div className="tag blue">SPECIAL</div>
                )}
                <Image
                  width={284}
                  height={183}
                  style={{
                    objectFit: "cover",
                  }}
                  priority
                  src={car.image_url}
                  alt={car.model}
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
                    <Link href="/listing-single-v1">{car.make_year}{" "}{car.brand_name}{" "}{car.model}{" "}{car.variant}</Link>
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
                      {car.driven_kms} kms
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
        ))}
      </div>
    </div>
  );
};

export default FeaturedFilterListing;
