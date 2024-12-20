"use client"
import { useEffect, useState } from 'react';

const EditEventForm = ({ event, onSubmit, onCancel }) => {
  const [event_name, setEventName] = useState(event.event_name);
  const [image, setImage] = useState(event.image);
  const [event_date, setEventDay] = useState(event.event_date);
  const [description, setDescription] = useState(event.description);
  console.log(event.event_date)
  const ulrImgae = process.env.NEXT_PUBLIC_API_IMAGE;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: event._id,
      event_name,
      image,
      event_date,
      description
    });
  };

  


  useEffect(() => {
    // Đảm bảo định dạng ngày là YYYY-MM-DD
    const formattedDate = new Date(event.event_date).toISOString().split('T')[0];
    setEventDay(formattedDate); // Đặt giá trị event_date dưới định dạng YYYY-MM-DD
  }, [event.event_date]);

  return (
    <div className='w-full fixed z-20 bg-slate-400 bg-opacity-20 flex h-screen top-0 left-0 justify-center items-center'>
      <div className='w-[50%] bg-white flex justify-center shadow-lg rounded-lg'>
        <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
          <h2 className="pt-5 font-semibold text-lg">Chỉnh Sửa Sự Kiện</h2>
          
          {/* Event Name */}
          <div>
            <label htmlFor="event_name" className="block text-sm font-medium text-gray-700">Tên Sự Kiện</label>
            <input 
              type="text" 
              id="event_name"
              value={event_name} 
              onChange={(e) => setEventName(e.target.value)} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              required 
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Chọn Hình Ảnh</label>
            <input 
              type="file" 
              id="image"
              
              onChange={(e) => setImage(e.target.files[0])} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              required 
            />
          </div>
          <div>
          {image ===event.image ? (
                  <img
                    src={`${ulrImgae}/src/uploads/${image}`} // Đảm bảo đường dẫn đúng
                    alt={event.event_name}
                    className="w-[100px] h-[100px] object-cover"
                  />
                ) : ""}
          </div>

          {/* Event Day */}
          <div>
            <label htmlFor="event_date" className="block text-sm font-medium text-gray-700">Ngày Sự Kiện</label>
            <input 
              type="date" 
              id="event_date"
              value={event_date} 
              onChange={(e) => setEventDay(e.target.value)} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              required 
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô Tả</label>
            <textarea 
              id="description"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              required 
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 py-5">
            <button 
              type="button" 
              onClick={onCancel} 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Lưu Thay Đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventForm;
