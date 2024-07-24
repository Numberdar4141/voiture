import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Brands, Models } from "../../api/useTanStackQuery";

const HeroFilter = () => {
  // const router = useRouter();

  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");

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
    const selectedBrand = carMakes.find((option) => option.makeName === value);
    if (selectedBrand) {
      setCarMake(selectedBrand.makeName);
      setSelectedBrandId(selectedBrand.id);
      setCarModel("");
    }
  };

  const handleModelChange = (event, value) => {
    setCarModel(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with selectedBrandId, selectedModelId, and other fields
    console.log("Selected Brand ID:", selectedBrandId);
    console.log("Selected Model:", carModel);
    // Example: router.push('/listing-v4');
  };

  return (
    <div className="col-lg-12">
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${selectedStatus === "All Status" && "active"}`}
            onClick={() => handleStatusClick("All Status")}
          >
            All Status
          </button>
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
          <button
            className={`nav-link ${selectedStatus === "New Cars" && "active"}`}
            onClick={() => handleStatusClick("New Cars")}
          >
            New Cars
          </button>
        </li>
      </ul>

      <div className="adss_bg_stylehome1">
        <div className="home1_advance_search_wrapper">
          <form onSubmit={handleSubmit}>
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
                  <button
                    type="submit"
                    className="btn btn-thm advnc_search_form_btn"
                  >
                    <span className="flaticon-magnifiying-glass" />
                    Search
                  </button>
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
