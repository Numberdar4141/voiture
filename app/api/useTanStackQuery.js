import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_HOST = "http://localhost:4200/v1/";

export const SearchCar = async (item) => {
  const url = "http://localhost:4000/admin/inventory/get-inventory";

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

export const Brands = async (params) => {
  const url = "http://localhost:4000/public/get-make";
  const { data } = await axios.get(url, {
    params: params  // Pass query parameters here
  });
  return data?.data;
};
export const Models = async (make) => {
  console.log(make);
 
  const url = "http://localhost:4000/public/get-model";
  const params = {
    make: make,
  };
  const { data } = await axios.get(url, { params });
  return data?.data;
};

export default SearchCar;  