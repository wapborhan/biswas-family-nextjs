"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DeleteButton = ({ memberId, memberName }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `আপনি কি নিশ্চিত যে "${memberName || "এই সদস্য"}" কে ডিলিট করতে চান?`,
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/member/${memberId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || errorData.message || "Delete failed",
        );
      }

      // Refresh the server component to get the updated members
      router.refresh();
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("ডিলিট করতে ব্যর্থ হয়েছে: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="btn btn-md btn-danger text-white"
      style={{
        opacity: loading ? 0.7 : 1,
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "ডিলিট হচ্ছে..." : "ডিলিট"}
    </button>
  );
};

export default DeleteButton;
