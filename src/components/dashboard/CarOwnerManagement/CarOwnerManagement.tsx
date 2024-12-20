"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import Pagination from '@/components/pagination/Pagination';
const CarOwnerRequestTable = () => {
  const { data: session, status } = useSession();
  const [carOwner, setCarOwner] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null); // Lưu thông tin yêu cầu được chọn
  const [actionType, setActionType] = useState(""); // Lưu hành động (Approved/Rejected)
  const [showConfirmation, setShowConfirmation] = useState(false); // Hiển thị form xác nhận
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const carOwnerData = carOwner.data ?? [];
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || 1);
  const limit = 5;
  useEffect(() => {

    const fetchRequests = async () => {
      if (session?.token) {
        try {
          console.log("Session Token:", session?.token); // Log token để debug

          const res = await axios.get(`${baseURL}/carOwnerRequest/viewCarOwnerRequest?page=${currentPage}&limit=${limit}`, {
            headers: {
              Authorization: `Bearer ${session.token}`, // Gửi token với prefix "Bearer"
            },
          });

          setCarOwner(res.data); // Cập nhật dữ liệu vào state
        } catch (error) {
          if (error.response) {
            console.error("Failed to fetch requests:", error.response.data);
          } else {
            console.error("Unexpected error:", error.message);
          }
        }
      } else {
        console.warn("User is not authenticated or token is missing");
      }
    };

    fetchRequests();
  }, [session, status]);

  const handleUpdateStatus = async (id, newStatus) => {
    if (session?.token) {
      try {
        // Gửi yêu cầu cập nhật trạng thái lên server
        await axios.patch(
          `${baseURL}/carOwnerRequest/updateCarOwner/${id}`,
          { status: newStatus }, // Trạng thái cần cập nhật
          {
            headers: {
              Authorization: `Bearer ${session.token}`, // Gửi token với prefix "Bearer"
            },
          }
        );

        // Cập nhật trạng thái trong state `carOwner`
        setCarOwner((prevCarOwner) => {
          const updatedData = prevCarOwner.data.map((item) => {
            if (item._id === id) {
              return { ...item, status: newStatus }; // Cập nhật trạng thái mới
            }
            return item;
          });
          return { ...prevCarOwner, data: updatedData };
        });
      } catch (error) {
        if (error.response) {
          console.error("Failed to update status:", error.response.data);
        } else {
          console.error("Unexpected error:", error.message);
        }
      }
    } else {
      console.warn("User is not authenticated or token is missing");
    }
  };

  const openConfirmationForm = (request, action) => {
    setSelectedRequest(request);
    setActionType(action);
    setShowConfirmation(true);
  };

  const handleConfirmAction = async () => {
    if (selectedRequest && actionType) {
      await handleUpdateStatus(selectedRequest._id, actionType);
      setShowConfirmation(false); // Đóng form xác nhận
      setSelectedRequest(null);
      setActionType("");
    }
  };

  return (
    <div className="w-full h-full bg-white py-10 px-5">
      <h1 className="text-xl mb-10 font-bold">Quản Lý Tài Xế</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">STT</th>
              <th className="px-4 py-2 text-left">Tên Chủ Xe</th>
              <th className="px-4 py-2 text-left">Số Điện Thoại</th>
              <th className="px-4 py-2 text-left">Loại Xe</th>
              <th className="px-4 py-2 text-left">Địa Chỉ</th>
              <th className="px-4 py-2 text-left">Trạng Thái</th>
              <th className="px-4 py-2 text-left">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {carOwnerData.map((request, index) => (
              <tr key={request._id} className="border-b">
                <td className="px-4 py-2">{(currentPage - 1) * limit + index + 1}</td>
                <td className="px-4 py-2">{request.nameOwnerCar}</td>
                <td className="px-4 py-2">{request.phoneNumber}</td>
                <td className="px-4 py-2">{request.car_type}</td>
                <td className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {request.address}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      request.status === "Approved"
                        ? "bg-green-500"
                        : request.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => openConfirmationForm(request, "Approved")}
                    className="px-4 w-[100px] py-2 bg-yellow-500 text-white rounded-md"
                  >
                    Xác nhận
                  </button>

                  <button
                    onClick={() => openConfirmationForm(request, "Rejected")}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Huỷ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form xác nhận */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">
              {actionType === "Approved" ? "Xác nhận duyệt?" : "Xác nhận hủy?"}
            </h2>
            <p>
              Bạn có chắc chắn muốn{" "}
              <span className="font-semibold">{actionType === "Approved" ? "duyệt" : "hủy"}</span> yêu cầu của{" "}
              <span className="font-semibold">{selectedRequest?.nameOwnerCar}</span>?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded-md ${
                  actionType === "Approved" ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      
      {/* Phân trang */}
      <div className="pt-4">
      <Pagination
        currentPage={currentPage}
        totalPages={carOwner.totalPages}
       
      />
      </div>
    </div>
    
  );
};

export default CarOwnerRequestTable;
