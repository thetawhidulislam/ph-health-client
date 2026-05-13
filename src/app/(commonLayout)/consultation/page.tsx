import { QueryClient } from "@tanstack/react-query";
import React from "react";

const ConsultationPage = async () => {
    const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  })
  return <div>ConsultationPage</div>;
};

export default ConsultationPage;
