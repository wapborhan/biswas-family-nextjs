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
            <th>মোবাইল</th>
            <th>স্ট্যাটাস</th>
            <th>অ্যাকশন</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member, index) => (
            <tr key={member.id} className="hover">
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.fatherId}</td>
              <td>{member.gender.toUpperCase()}</td>
              <td>{member.contact?.mobileNo || "N/A"}</td>

              <td>
                {member.isApproved ? (
                  <span className="badge badge-success">Approved</span>
                ) : (
                  <span className="badge badge-warning">Pending</span>
                )}
              </td>

              <td className="flex gap-2">
                {/* Edit */}
                <Link
                  href={`/dashboard/member/edit/${member.id}`}
                  className="btn btn-xs btn-info"
                >
                  Edit
                </Link>

                {/* Approve */}
                {!member.isApproved && (
                  <button
                    onClick={() => handleApprove(member.id)}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
