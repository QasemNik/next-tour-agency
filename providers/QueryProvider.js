"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import defaultOptions from "@/lib/QueryConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({defaultOptions});
export const QueryProvider = ({ children }) => {

    return (
        <QueryClientProvider client={queryClient}>
             <ReactQueryDevtools initialIsOpen={false} />

            {children}
        </QueryClientProvider>
    );
};
