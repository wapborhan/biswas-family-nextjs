export const formatDate = (dateString) => {
  if (!dateString) return "অজানা";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
