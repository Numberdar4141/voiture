import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_HOST = "http://localhost:4200/v1/";

export const SearchCar = async () => {
    const url = API_HOST + "search";
 
    const { data } = await axios.post(url);
    console.log(data)
    return data?.data;
    
  };

export default SearchCar;  