import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_HOST = "http://localhost:4200/v1/";

export const SearchCar = async (item) => {
  const url = API_HOST + "search";

  const { data } = await axios.post(url,item);
  console.log(data)
  
  return data?.data;
};

export const CarDetails = async (id) => {
  console.log(id);
  const url = API_HOST + "vehicleInfo";
  const params = {
      car_id: id,
  };
  const { data } = await axios.get(url, { params });
  console.log("hi ", data);
  return data?.data;
};

export const Brands = async () => {
  const url = API_HOST + "brands";
  const { data } = await axios.get(url);
  return data?.data;
};
export const Models = async (brandIds) => {
  console.log(brandIds);
 
  const url = API_HOST + "models";
  const params = {
    brandId: brandIds,
  };
  const { data } = await axios.get(url, { params });
  return data?.data;
};

export default SearchCar;  