import React, { useState, useEffect } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Brands, Models } from "../../api/useTanStackQuery";
import queryString from "query-string";
import Link from "next/link";


const HeroFilter = () => {
  const routes = useRouter();

  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedModelId, setSelectedModelId] = useState("");
  const [search, setSearch] = useState({ make: "", model: "" });

  useEffect(() => {
    const fetchCarMakes = async () => {
      try {
        const brandsData = await Brands();
        setCarMakes(brandsData || []);
      } catch (error) {
        console.error("Error fetching car makes:", error);
      }
    };

    fetchCarMakes();
  }, []);

  useEffect(() => {
    setSearch({ make: selectedBrandId, model: selectedModelId });
  }, [carMake,carModel]);


  // const formatUrl = (string) => {
  //   if (typeof string === "string") {
  //     return string.toLowerCase().replace(/\s+/g, "-");
  //   }
  //   return "";
  // };

  useEffect(() => {
    const fetchCarModels = async () => {
      if (carMake) {
        try {
          const modelsData = await Models(selectedBrandId);
          setCarModels(modelsData || []);
        } catch (error) {
          console.error("Error fetching car models:", error);
        }
      } else {
        setCarModels([]);
      }
    };

    fetchCarModels();
  }, [carMake, selectedBrandId]);

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  const handleBrandChange = async (event, value) => {
    const selectedModel = carModel.find((option) => option.modelName === value);
    if (selectedModel) {
      setCarMake(selectedModel.modelName);
      setSelectedModelId(selectedModel.ModelId);
      setCarModel("");
    }
  };

  

 

  const handleModelChange = async (event, value) => {
    const selectedBrand = carMakes.find((option) => option.makeName === value);
    if (selectedBrand) {
      setCarMake(selectedBrand.makeName);
      setSelectedBrandId(selectedBrand.id);
      setCarModel(selectedModel);
    }
  };




  const handleSearch = () => {
    let query = {};
 
    if (carMake) {
      query.make = carMake;
    };
    if (carModel) {
      query.model = carModel;
    };

    const queryStringified = queryString.stringify(query);
    const url = `/listing-v1?${queryStringified}`;

    routes.push(url);
  };

  return (
    <div className="col-lg-12">
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item" role="presentation">
          {/* <button
            className={`nav-link ${selectedStatus === "All Status" && "active"}`}
            onClick={() => handleStatusClick("All Status")}
          >
            All Status
          </button> */}
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${selectedStatus === "Used Cars" && "active"}`}
            onClick={() => handleStatusClick("Used Cars")}
          >
            Used Cars
          </button>
        </li>
        <li className="nav-item" role="presentation">
          {/* <button
            className={`nav-link ${selectedStatus === "New Cars" && "active"}`}
            onClick={() => handleStatusClick("New Cars")}
          >
            New Cars
          </button> */}
        </li>
      </ul>

      <div className="adss_bg_stylehome1">
        <div className="home1_advance_search_wrapper">
          <form onSubmit={handleSearch}>
            <ul className="mb0 text-center">
              {/* Brand selection */}
              <li className="list-inline-item">
                <div className="select-boxes">
                  <div className="car_brand">
                    <Autocomplete
                      value={carMake}
                      onChange={handleBrandChange}
                      options={carMakes.map((option) => option.makeName)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Make"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              {/* Model selection */}
              <li className="list-inline-item">
                <div className="select-boxes">
                  <div className="car_brand">
                    <Autocomplete
                      value={carModel}
                      onChange={handleModelChange}
                      options={carModels.map((option) => option.groupModelName)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Model"
                          variant="outlined"
                          disabled={!carMake}
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              {/* Search button */}
              <li className="list-inline-item">
                <div className="d-block">
                  <Link href={`/listing-v1?make=${encodeURIComponent(carMake)}&model=${encodeURIComponent(carModel)}`}>
                  <button
                    type="submit"
             
                    className="btn btn-thm advnc_search_form_btn"
                  >
                    <span className="flaticon-magnifiying-glass" />
                    Search
                  </button>
                  </Link>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroFilter;
