"use client";
import Footer from "@/app/components/common/Footer";
import DefaultHeader from "@/app/components/common/DefaultHeader";
import HeaderSidebar from "@/app/components/common/HeaderSidebar";
import HeaderTop from "@/app/components/common/HeaderTop";
import MobileMenu from "@/app/components/common/MobileMenu";
import LoginSignupModal from "@/app/components/common/login-signup";
import AdvanceFilter from "@/app/components/listing/advance-filter";
import Pagination from "@/app/components/common/Pagination";
import ListGridFilter from "@/app/components/listing/ListGridFilter";
import CarItems from "@/app/components/listing/listing-styles/listing-v1/CarItems";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SearchCar, {
  Brands,
  CarDetails,
  Models,
  useSearchCar,
} from "@/app/api/useTanStackQuery";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// export const metadata = {
//     title: "Listing V1 || Voiture - Automotive & Car Dealer NextJS Template",
// };

const ListingV1 = () => {
  const router = useRouter();
  const { query } = router;
  const params = useSearchParams();
  const makeqr = params.get("make");
  const modelqr = params.get("model");
  console.log(makeqr);
  console.log(modelqr);
  const [filterData, setFilteData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [carData, setCarData] = useState([]);
  const [carMake, setCarMake] = useState([]);
  const [carModel, setCarModel] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState("");

  console.log("query", filterData);

  // const {
  //     data: SearchData,
  //     isLoading: SearchIsLoading,
  //     isError: SearchIsError,
  //   } = useQuery({
  //     queryKey: ["SearchCarKey"],
  //     queryFn: () => SearchCar({make:makeqr , model: modelqr}),
  //     staleTime: 5000,
  //   });
  //   console.log("naveen11",SearchData)

  const fetchCarMakes = async () => {
    try {
      const brandsData = await Brands();
      setCarMake(brandsData || []);
      console.log("pagemake", carMake);
    } catch (error) {
      console.error("Error fetching car makes:", error);
    }
  };

  const fetchCarModels = async () => {
    try {
      const modelsData = await Models(make);
      setCarModel(modelsData || []);
      console.log("pagemodel", carModel);
    } catch (error) {
      console.error("Error fetching car models:", error);
    }
  };

  useEffect(() => {
    fetchCarMakes();
  }, []);


  useEffect(() =>{
    fetchCarModels();
  },[]);

  const SearchCarSuccessHandler = (data) => {
    setFilteData(data);
    setCarData(data);
    console.log("filterdata", data);
    // setShowConfirmation(true);
  };

  const SearchCarErrorHandler = (err) => {
    console.log("err", err);
    // setNameError(err?.response?.data?.message);
  };

  const { mutate } = useSearchCar(
    SearchCarSuccessHandler,
    SearchCarErrorHandler
  );

  useEffect(() => {
    // Initialize variables to hold IDs
    let selectedMakeId = null;
    let selectedModelId = null;
  
    // Check carMake and set selectedMakeId if found
    if (carMake.length > 0 && makeqr) {
      console.log("carmake ===> ", carMake);
      const makeItem = carMake.find(
        (item) => item.makeName.toLowerCase() === makeqr.toLowerCase()
      );
      if (makeItem) {
        selectedMakeId = makeItem.id; // Set selected make ID
        console.log("Selected make id: ", selectedMakeId);
      } else {
        console.warn("No matching make found for:", makeqr);
      }
    }
  
    // Check carModel and set selectedModelId if found
    if (carModel.length > 0 && modelqr) {
      console.log("carmodel ===>",carModel);
      const modelItem = carModel.find(
        (item) => item.modelName.toLowerCase() === modelqr.toLowerCase()
      );
      if (modelItem) {
        selectedModelId = modelItem.modelId; // Set selected model ID
        console.log("Selected model id: ", selectedModelId);
        console.log("model itweem" ,modelItem)
      } else {
        console.warn("No matching model found for:", modelqr);
      }
    }
  
    // Only call mutate if we have valid IDs
    const payload = {};
    if (selectedMakeId) payload.make = [selectedMakeId];
    if (selectedModelId) payload.model_id = [selectedModelId];
  
    if (Object.keys(payload).length > 0) {
      mutate(payload);
      console.log("Payload sent to mutate:", payload);
    }
  
  }, [carMake, carModel, makeqr, modelqr]);

  return (
    <div className="wrapper">
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <HeaderSidebar />
      </div>
      {/* Sidebar Panel End */}

      {/* header top */}
      <HeaderTop />
      {/* End header top */}

      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Main Header Nav For Mobile */}
      <MobileMenu />
      {/* End Main Header Nav For Mobile */}

      {/* Advance_search_menu_sectn*/}
      <section className="advance_search_menu_sectn bgc-thm2 pt20 pb0 mt70-992 filter-style_two">
        <div className="container">
          <AdvanceFilter />
        </div>
      </section>
      {/* End Advance_search_menu_sectn*/}

      {/* Inner Page Breadcrumb */}
      <section className="inner_page_breadcrumb style2 inner_page_section_spacing">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="breadcrumb_content style2">
                <h2 className="breadcrumb_title">Used Vehicles For Sale</h2>
                <p className="subtitle">Listing-v1</p>
                <ol className="breadcrumb fn-sm mt15-sm">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Listing-v1
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Inner Page Breadcrumb */}

      {/* Listing Grid View */}
      <section className="our-listing pt0 bgc-f9 pb30-991">
        <div className="container">
          <div className="row">
            <ListGridFilter />
          </div>
          {/* End .row */}

          <div className="row">{<CarItems SearchData={carData} />}</div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="mbp_pagination mt10">
                <Pagination />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* Listing Grid View */}

      {/* Our Footer */}
      <Footer />
      {/* End Our Footer */}

      {/* Modal */}
      <div
        className="sign_up_modal modal fade"
        id="logInModal"
        data-backdrop="static"
        data-keyboard=""
        tabIndex={-1}
        aria-hidden="true"
      >
        <LoginSignupModal />
      </div>
      {/* End Modal */}
    </div>
    // End wrapper
  );
};

export default ListingV1;
