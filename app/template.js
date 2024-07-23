"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Provider } from "react-redux";
// import appStore from "./redux/appStore";
// import Header from "./components/global/Header";
// Create a client
const queryClient = new QueryClient();

export default function Template({ children }) {
  return (
  
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} />
         */}
        {children}
      </QueryClientProvider>
    
  );
}