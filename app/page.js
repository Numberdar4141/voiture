"use client"
import { useState } from "react";
import Home_1 from "./(home)/home-1/page";
import Home_2 from "./(home)/home-2/page";
import Home_3 from "./(home)/home-3/page";
import Home_4 from "./(home)/home-4/page";
import Wrapper from "./layout/wrapper";
import HomeSelector from "./HomeSelector"; // Import the new HomeSelector component
import Home_5 from "./(home)/home-5/page";
import Home_6 from "./(home)/home-6/page";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


// export const metadata = {
//   title: "Home Selector || Voiture - Automotive & Car Dealer NextJS Template",
//   description: `Voiture - Automotive & Car Dealer NextJS Template.`,
// };
const queryClient = new QueryClient();
export default function MainRoot() {
  const [selectedHome, setSelectedHome] = useState(null);


  return (
    <QueryClientProvider client={queryClient}>

    <Wrapper>
      {selectedHome ? (
        <div className="home-content">
          {selectedHome === "home-1" && <Home_1 />}
          {selectedHome === "home-2" && <Home_2 />}
          {selectedHome === "home-3" && <Home_3 />}
          {selectedHome === "home-4" && <Home_4 />}
          {selectedHome === "home-5" && <Home_5 />}
          {selectedHome === "home-6" && <Home_6 />}
        </div>
      ) : (
        <HomeSelector setSelectedHome={setSelectedHome} />
      )}
    </Wrapper>
    </QueryClientProvider>
  );
}
