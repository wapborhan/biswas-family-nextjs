"use client";
import Link from "next/link";
import React from "react";

const MembersTable = ({ members }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>#</th>
            <th>নাম</th>
            <th>পিতা</th>
            <th>লিঙ্গ</th>
            <th>স্ট্যাটাস</th>
            <th>আপডেট</th>
          </tr>
        </thead>

        <tbody>
          {members.length > 0 ? (
            members.map((member, index) => (
              <tr key={member._id} className="hover">
                <td>
                  <Link href={`/member/${member._id}`}>
                    <span style={{ color: "black" }}>{index + 1}</span>
                  </Link>
                </td>
                <td>{member.fullName}</td>
                <td>{member.fatherId ? member.fatherId : "অজানা"}</td>
                <td>
                  {member.gender
                    ? member.gender === "male"
                      ? "ছেলে"
                      : "মেয়ে"
                    : ""}
                </td>

                <td>
                  {member.isApproved ? (
                    <span className="badge badge-success">Approved</span>
                  ) : (
                    <span className="badge badge-warning">Pending</span>
                  )}
                </td>

                <td className="flex gap-2">
                  {/* Edit */}
                  <div className="d-flex gap-2">
                    <Link
                      href={`/dashboard/member/${member._id}/editInfo`}
                      className="btn btn-md btn-primary text-white"
                    >
                      আপডেট
                    </Link>
                  </div>

                  {/* Approve */}
                  {!member.isApproved && (
                    <button
                      onClick={() => handleApprove(member._id)}
                      className="btn btn-xs btn-success"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>
                <p className="text-black text-center">কোনো সদস্য পাওয়া যায়নি</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
