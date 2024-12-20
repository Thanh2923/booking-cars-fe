"use client";

const EventTable = ({ events, onEdit, onDelete,currentPage,limit }) => {
  const safeEvent = events ?? [];
  const ulrImgae = process.env.NEXT_PUBLIC_API_IMAGE;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Mã Sự Kiện</th>
            <th className="px-4 py-2 text-left">Tên Sự Kiện</th>
            <th className="px-4 py-2 text-left">Hình Ảnh</th>
            <th className="px-4 py-2 text-left">Ngày Sự Kiện</th>
            <th className="px-4 py-2 text-left">Mô Tả</th>
            <th className="px-4 py-2 text-left">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {safeEvent.map((event,index) => {
            const date = new Date(event.event_date).toISOString().split('T')[0]; // Đảm bảo ngày được định dạng đúng
            return (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{(currentPage - 1) * limit + index + 1}</td>
                <td className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">{event.event_name}</td>
                <td className="px-4 py-2">
                  {/* Hiển thị ảnh nếu có */}
                  {event.image && (
                    <img
                      src={`${ulrImgae}/src/uploads/${event.image}`} // Đảm bảo đường dẫn đúng
                      alt={event.event_name}
                      className="w-10 h-10 object-cover"
                    />
                  )}
                </td>
                <td className="px-4 py-2">{date}</td>
                <td className="px-4 py-2 max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">{event.description}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => onEdit(event)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(event._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
