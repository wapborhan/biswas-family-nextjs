"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ApproveButton = ({ memberId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/member/${memberId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved: true }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || errorData.message || "Approval failed",
        );
      }

      // Refresh the server component to get the updated members
      router.refresh();
    } catch (error) {
      console.error("Error approving member:", error);
      alert("আপ্রুভ করতে ব্যর্থ হয়েছে: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleApprove}
      disabled={loading}
      className="btn btn-md btn-success text-white"
      style={{
        opacity: loading ? 0.7 : 1,
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "আপ্রুভ হচ্ছে..." : "আপ্রুভ"}
    </button>
  );
};

export default ApproveButton;
