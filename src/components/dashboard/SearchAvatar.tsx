"use client"
import React, { useState } from 'react'

const SearchAvatar = () => {
    const [searchValue, setSearchValue] = useState("");
  return (
    <div className="flex items-center justify-between mb-6">
    {/* Input tìm kiếm */}
    <input
      type="text"
      placeholder="Tìm kiếm..."
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Avatar */}
    <div className="relative group">
      <img
        src="https://via.placeholder.com/40" // Link hình đại diện
        alt="Avatar"
        className="w-10 h-10 rounded-full cursor-pointer"
      />
      {/* Menu khi hover */}
      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md hidden group-hover:block">
        <button
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => alert("Đăng xuất!")}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  </div>
  )
}

export default SearchAvatar
