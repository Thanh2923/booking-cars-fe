"use client";
import { useState, useEffect } from "react";
import axios from "axios";
const EditCarForm = ({ car,onCancel,handleSubmitCar }) => {
  const [carName, setCarName] = useState(car.car_name);
  const [description, setDescription] = useState(car.description);
  const [pricePerDay, setPricePerDay] = useState(car.price_per_day);
  const [availabilityStatus, setAvailabilityStatus] = useState(car.availability_status ? "Available" : "Unavailable");
  const [categoryId, setCategoryId] = useState(car.category_id._id);
  const [images, setImages] = useState([]); // New uploaded files
  const [existingImages, setExistingImages] = useState(car.images || []); // Existing images
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Bạn chỉ được chọn tối đa 5 ảnh.");
      return;
    }
    setImages(files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("car_name", carName);
    formData.append("description", description);
    formData.append("price_per_day", pricePerDay);

    // Convert availability_status to boolean
    const availabilityStatusBoolean = availabilityStatus === "Available";
    formData.append("availability_status", availabilityStatusBoolean);
    formData.append("category_id", categoryId);

    // Append new images
    images.forEach((file) => {
      formData.append("images", file);
    });

    console.log(formData)
    try {
      const response = await axios.patch(`${baseURL}/car/${car._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      handleSubmitCar();
    } catch (error) {
      console.error("Lỗi khi cập nhật xe:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full fixed z-20 bg-slate-400 bg-opacity-20 flex top-0 left-0 justify-center items-center">
      <div className="w-[50%] bg-white flex justify-center shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
          <h2 className="pt-5 font-semibold text-lg">Chỉnh Sửa Xe</h2>

          <div>
            <label htmlFor="car_name" className="block text-sm font-medium text-gray-700">Tên Xe</label>
            <input
              type="text"
              id="car_name"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="Nhập tên xe"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Chọn hình ảnh (tối đa 5 ảnh)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {/* Existing images */}
            {existingImages.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {existingImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={`${baseURL}/${image}`}
                      alt={`Existing ${index}`}
                      className="h-10 w-10 object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}
            {/* New images */}
            {images.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`New ${index}`}
                      className="h-10 w-10 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô Tả</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả xe"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price_per_day" className="block text-sm font-medium text-gray-700">Giá Theo Ngày</label>
              <input
                type="number"
                id="price_per_day"
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value)}
                placeholder="Nhập giá theo ngày"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Danh Mục</label>
              <input
                type="text"
                id="category_id"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                placeholder="Nhập ID danh mục"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="availability_status" className="block text-sm font-medium text-gray-700">Trạng Thái</label>
            <select
              id="availability_status"
              value={availabilityStatus}
              onChange={(e) => setAvailabilityStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Available">Có Sẵn</option>
              <option value="Unavailable">Không Có Sẵn</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 py-5">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Hủy</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Lưu Thay Đổi</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCarForm;
