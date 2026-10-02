import api from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const useFetchMembers = () => {
  const {
    data: members = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await api.get("/members");
      return res.data?.data;
    },
  });

  return [members, isLoading, refetch];
};

export default useFetchMembers;
