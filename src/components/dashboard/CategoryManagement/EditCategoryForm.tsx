"use client";
import { useState, useEffect } from 'react';

const EditCategoryForm = ({ category, onSubmit, onCancel }) => {
  const [category_name, setCategoryName] = useState('');
  // Khi có sự thay đổi từ prop 'category', cập nhật lại state
  useEffect(() => {
    if (category) {
      setCategoryName(category.category_name);
    }
  }, [category]); // Chạy lại khi 'category' thay đổi

  const handleChange = (e) => {
    setCategoryName(e.target.value); // Cập nhật state khi nhập liệu
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (category_name.trim()) {
      // Gửi thông tin cập nhật, không phải tạo mới
      onSubmit({ id: category._id, category_name }); // Gửi đối tượng category với tên đã chỉnh sửa
    }
  };

  return (
    <div className="w-full fixed z-20 bg-slate-400 bg-opacity-20 flex h-screen top-0 left-0 justify-center items-center">
      <div className="w-[50%] bg-white flex justify-center shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
          <h2 className="py-5 font-semibold text-lg">Sửa danh mục</h2>
          <div>
            <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">Tên danh mục</label>
            <input
              type="text"
              id="category_name"
              name="category_name"
              value={category_name} // Gắn giá trị nhập vào từ state
              onChange={handleChange} // Cập nhật giá trị khi người dùng nhập
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="flex py-5 justify-end space-x-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Hủy</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryForm;
