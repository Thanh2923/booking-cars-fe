"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({ currentPage, totalPages }) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  // Hàm xử lý khi click vào nút phân trang
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      // Cập nhật URL query
      const params = new URLSearchParams(searchParams as any);
      params.set("page", page.toString());
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      {/* Nút Previous */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-md text-sm font-medium ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
  <button
    key={page}
    onClick={() => handleClick(page)}
    className={`px-4 py-2 border rounded-md text-sm font-medium ${
      currentPage === page
        ? "bg-blue-500 text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
  >
    {page}
  </button>
))}

      {/* Nút Next */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md text-sm font-medium ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
