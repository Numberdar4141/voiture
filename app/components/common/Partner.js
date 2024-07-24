import Image from "next/image";
import { Brands } from "@/app/api/useTanStackQuery";
import { useQuery } from "@tanstack/react-query";
import { auto } from "@popperjs/core";
// import {
//   SiToyota,
//   SiSuzuki,
//   SiTata,
//   SiHonda,
//   SiKia,
//   SiNissan,
//   SiMercedes,
//   SiRenault,
//   SiHyundai,
//   SiSkoda,
//   SiBmw,
//   SiMg,
//   SiJeep,
// } from "react-icons/si";

// const partners = [
//   {
//     id: 10,
//     logo: <SiToyota className="text-gray-900 text-4xl" />,
//     name: "Toyota",
//   },
//   {
//     id: 71,
//     logo: <SiMg className="text-gray-900 text-4xl" />,
//     name: "MG",
//   },
//   {
//     id: 11,
//     logo: <SiTata className="text-gray-900 text-4xl" />,
//     name: "Tata",
//   },
//   {
//     id: 5,
//     logo: <SiHonda className="text-gray-900 text-4xl" />,
//     name: "Honda",
//   },
//   {
//     id: 70,
//     logo: <SiKia className="text-gray-900 text-4xl" />,
//     name: "Kia",
//   },
//   {
//     id: 16,
//     logo: <SiNissan className="text-gray-900 text-4xl" />,
//     name: "Nissan",
//   },
//   {
//     id: 22,
//     logo: <SiMercedes className="text-gray-900 text-4xl" />,
//     name: "Mercedes",
//   },
//   {
//     id: 40,
//     logo: <SiRenault className="text-gray-900 text-4xl" />,
//     name: "Renault",
//   },
//   {
//     id: 7,
//     logo: <SiHyundai className="text-gray-900 text-4xl" />,
//     name: "Hyundai",
//   },
//   {
//     id: 52,
//     logo: <SiJeep className="text-gray-900 text-4xl" />,
//     name: "Jeep",
//   },
//   {
//     id: 12,
//     logo: <SiSkoda className="text-gray-900 text-4xl" />,
//     name: "Skoda",
//   },
//   {
//     id: 95,
//     logo: <SiBmw className="text-gray-900 text-4xl" />,
//     name: "BMW",
//   },
// ];

const Partner = () => {
  const {
    data: SearchData = [],
    isLoading: SearchIsLoading,
    isError: SearchIsError,
  } = useQuery({
    queryKey: ["SearchCarKey"],
    queryFn: () => Brands({ }), // Pass query parameter here
    staleTime: 5000,
  });

  console.log("partner", SearchData);
  const filteredData = SearchData.filter(brand => brand.is_featured === 1);

  // Limit to first 12 items after filtering
  const limitedData = filteredData.slice(0, 12);

  return (
    <>
      {limitedData.map((brand, index) => (
        <div
          key={index}
          className="col-5 col-xs-5 col-sm-3 col-xl-2"
          data-aos="fade-up"
          data-aos-delay={brand.delay}
        >
          <div className="partner_item text-xl">
            <Image 
            src={brand.img} 
            alt={brand.name} 
           width={70}
            height={70}
            
            /> {/* Render the image */}
            {/* Example of rendering partner name */}
            {brand.name}
          </div>
        </div>
      ))}
    </>
  );
};

export default Partner;
