"use client";
import { fetchCategories } from '@/redux/category/categoryThunk';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const AddCarForm = ({ handleAddCar,onCancel }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { categories, loading } = useSelector((state) => state.category);
  const safeCategories = categories?.data || [];

  // State variables
  const [carName, setCarName] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState(0); // Khởi tạo là số 0 thay vì chuỗi rỗng
  const [availabilityStatus, setAvailabilityStatus] = useState('Available');
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState([]);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategories({}));
  }, [dispatch]);

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
    formData.append('car_name', carName);
    formData.append('description', description);
    formData.append('price_per_day', pricePerDay);
    
    // Chuyển đổi availability_status từ string sang boolean
    const availabilityStatusBoolean = availabilityStatus === 'Available';

    formData.append('availability_status', availabilityStatusBoolean); // Truyền Boolean thay vì string
    formData.append('category_id', categoryId);

    // Thêm các file ảnh vào FormData
    images.forEach((file) => {
      formData.append('images', file);
    });

    if (session?.token) {
      try {
        const response = await axios.post(`${baseURL}/car`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${session.token}`,
          },
        });
        handleAddCar();
      } catch (error) {
        console.error('Lỗi khi thêm xe:', error.response?.data || error.message);
      }
    }
};

  return (
    <div className="w-full fixed z-20 bg-slate-400 bg-opacity-20 flex top-0 left-0 justify-center items-center">
      <div className="w-[50%] bg-white flex justify-center shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
          <h2 className="pt-5 font-semibold text-lg">Thêm Xe</h2>

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
            {images.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
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
              <select
                id="category_id"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Chọn danh mục</option>
                {safeCategories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
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
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Thêm Xe</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarForm;
