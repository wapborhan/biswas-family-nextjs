import AxiosInstance from "./axiosInstance";

export const fetchMembers = async () => {
  try {
    const response = await AxiosInstance.get("/members");

    console.log(response.data);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
