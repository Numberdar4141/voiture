"use client"
import listingCar from "@/data/listingCar";
import Image from "next/image";
import Link from "next/link";
import { QueryClientProvider, useQuery , QueryClient} from "@tanstack/react-query";
import SearchCar from "../../../../api/useTanStackQuery";
import { FaLocationDot } from "react-icons/fa6";

const CarItems = () => {
  const queryClient = new QueryClient();

  const {
    data: SearchData = [],
    isLoading: SearchIsLoading,
    isError: SearchIsError,
  } = useQuery({
    queryKey: ["SearchCarKey"],
    queryFn: SearchCar,
    staleTime: 5000,
  });

  const formatKilometers = (kms) => {
    if (kms >= 1000) {
      return `${(kms / 1000).toFixed(0)}K Km`;
    }
    return `${kms} KM`;
  };

  if (SearchIsLoading) return <div>Loading...</div>;
  if (SearchIsError) return <div>Error loading data...</div>;
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-IN").format(number);
  };
  return (
    <>
      <QueryClientProvider client={queryClient}>
      {SearchData.map((car) => (
        <div className="col-sm-6 col-lg-4 col-xl-3" key={car.car_id}>
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
      ))}
      </QueryClientProvider>
    </>
  );
};

export default CarItems;
