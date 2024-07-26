import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_HOST = "http://localhost:4200/v1/";

const SearchCar = async (item) => {
  console.log(item);
  const url = "http://localhost:4000/admin/inventory/search";

  const { data } = await axios.post(url,item);
  console.log(data);

  return data?.data;
};

export const CarDetails = async (id) => {
  console.log(id);
  const url = API_HOST + "vehicleInfo";
  const params = {
    carSkuId: id,
  };
  const { data } = await axios.get(url, { params });
  console.log("hi ", data);
  return data?.data;
};

export const Brands = async (params) => {
  const url = "http://localhost:4000/public/get-make";
  const { data } = await axios.get(url, {
    params: params, // Pass query parameters here
  });
  return data?.data;
};
export const Models = async (make, modelId) => {
  console.log("Fetching models for make: ", make);
  console.log("Model ID: ", modelId);
  
  const url = "http://localhost:4000/public/get-model";
  const params = {
    make: make,
    model_id: modelId
  };
  console.log("Sending request to URL: ", url);
  console.log("With params: ", params);
  const { data } = await axios.get(url, { params });
  
  console.log("Received response: ", data);
  return data?.data;
};

export const useSearchCar = (
  SearchCarSuccessHandler,
  SearchCarErrorHandler
) => {
  return useMutation({
    mutationFn: SearchCar,
    onSuccess: SearchCarSuccessHandler,
    onError: SearchCarErrorHandler,
  });
};

export default SearchCar;
