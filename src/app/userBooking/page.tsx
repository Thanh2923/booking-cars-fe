"use client";
import React from "react";
import WrapContainer from "@/components/wrapContainer/wrapContainer";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ToastContainer, toast } from "react-toastify";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import PaymentPageTsx from "@/components/PaymentPage/PaymentPage";
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Nếu modal không mở thì không render
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-1/3 text-center">
        <h2 className="text-xl font-semibold mb-4">Xác nhận xóa</h2>
        <p className="mb-4">Bạn có chắc chắn muốn xóa ?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};
const EditBookingModal = ({ isOpen, onClose, booking, onConfirm }) => {
  if (!isOpen) return null;

  const [startDate, setStartDate] = useState(
    booking.start_date ? new Date(booking.start_date) : new Date()
  );
  const [endDate, setEndDate] = useState(
    booking.end_date ? new Date(booking.end_date) : new Date()
  );
  const [error, setError] = useState("");
  const handleSubmit = () => {
    // Kiểm tra nếu ngày kết thúc nhỏ hơn ngày bắt đầu
    if (endDate < startDate) {
      setError("Ngày kết thúc phải sau ngày bắt đầu.");
      return;
    }

    // Định dạng ngày tháng trước khi gửi dữ liệu
    const formattedData = {
      start_date: format(startDate, "yyyy-MM-dd"),
      end_date: format(endDate, "yyyy-MM-dd"),
      car_id: booking.car_id
    };

    onConfirm(formattedData); // Gọi hàm xác nhận với dữ liệu mới
    onClose(); // Đóng modal
  };


  const urlImage =process.env.NEXT_PUBLIC_API_IMAGE

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-3/3 text-center">
        <h2 className="text-xl font-semibold mb-4">Cập nhật Booking</h2>

        <div className="mt-3 flex gap-4">
          {/* Chọn ngày bắt đầu */}
          <div className="date-start">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={"w-[280px] justify-start text-left font-normal"}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a start date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Chọn ngày kết thúc */}
          <div className="date-end">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={"w-[280px] justify-start text-left font-normal"}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, "PPP")
                  ) : (
                    <span>Pick an end date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            onClick={handleSubmit}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

interface User {
  _id: string;
  email: string;
}

interface Car {
  _id: string;
  car_name: string;
  category_id: string;
  image: string[];
  price_per_day: number;
}

interface Booking {
  _id: string;
  user_id: User;
  car_id: Car;
  start_date: string; // ISO 8601 format string (e.g. "2024-12-10T00:00:00.000Z")
  end_date: string; // ISO 8601 format string (e.g. "2024-12-14T00:00:00.000Z")
  driver_option: boolean;
  total_price: number;
  status: "pending" | "approved" | "rejected"; // Example of status types; you can modify these as needed
  createdAt?: string; // ISO 8601 format string
  updatedAt?: string;
}
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [bookingList, setBookingList] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [itemIdUpdate, setItemIdUpdate] = useState(null);
  const handleDelete = (itemId: string) => {
    setItemIdToDelete(itemId);
    setIsModalOpen(true); // Mở modal khi muốn xóa
  };
  const handleUpdate = (updatedBooking) => {
    setItemIdUpdate(updatedBooking);
    setIsModalOpenUpdate(true); // Mở modal khi muốn xóa
  };

  const confirmDelete = async () => {
    // Thực hiện hành động xóa ở đây
    try {
      // Gọi API xóa item với itemIdToDelete
      const response = await axios.delete(
        `${baseURL}/booking/${itemIdToDelete}`
      );
      if (response.status === 200) {
        console.log("Xóa thành công:", itemIdToDelete);
        setBookingList(
          bookingList.filter((item) => item._id !== itemIdToDelete)
        );
        // Thực hiện hành động sau khi xóa thành công, ví dụ: cập nhật lại UI
        setIsModalOpen(false); // Đóng modal
      } else {
        console.error("Không thể xóa mục", response);
        // Hiển thị lỗi nếu API trả về không thành công
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      // Hiển thị lỗi nếu có sự cố khi gọi API
    }

    setIsModalOpen(false); // Đóng modal sau khi xóa
  };
  const confirmUpdate = async (updatedBookingData) => {
    try {
      // Gọi API cập nhật booking với dữ liệu chỉ có ngày bắt đầu và ngày kết thúc
      const response = await axios.patch(
        `${baseURL}/booking/${itemIdUpdate._id}`,
        updatedBookingData,
        {
          headers: {
            Authorization: `Bearer ${session.token}` // Gửi token với prefix "Bearer"
          }
        }
      );

      if (response.status === 200) {
        console.log("Cập nhật thành công:", updatedBookingData);

        // Cập nhật lại danh sách booking sau khi cập nhật
        setBookingList((prevList) =>
          prevList.map((item) =>
            item._id === itemIdUpdate._id
              ? { ...item, ...updatedBookingData } // Cập nhật booking đúng
              : item
          )
        );

        // Đóng modal
        setIsModalOpenUpdate(false);
      } else {
        console.error("Không thể cập nhật mục", response);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Đóng modal nếu người dùng hủy bỏ
  };
  const cancelUpdate = () => {
    setIsModalOpenUpdate(false); // Đóng modal nếu người dùng hủy bỏ
  };

 
  useEffect(() => {
    const fetchData = async () => {
      if (session?.token) {
        try {
          console.log(session?.token); // In ra token (đã sửa lỗi từ "ession" thành "session")
          const response = await axios.get(`${baseURL}/booking`, {
            headers: {
              Authorization: `Bearer ${session.token}`, // Gửi token với prefix "Bearer"
            },
          });
          const data = response.data;
          setBookingList(data); // Cập nhật bookingList với dữ liệu nhận được
        } catch (error) {
          console.error('Error fetching bookings:', error); // Log lỗi để debug
          setBookingList([]); // Trả về mảng rỗng nếu xảy ra lỗi
        } finally {
          setLoading(false); // Tắt trạng thái loading
        }
      }
    };
  
    fetchData(); // Gọi hàm fetchData
  
  }, [session, status]); // Phụ thuộc vào session và status
  
  if (loading) return <p>Loading...</p>;
  const handlePayment = async (bookingId: string) => {
    // Gọi API để thực hiện thanh toán
    console.log(bookingId)
    try {
      const response = await axios.post(
        `${baseURL}/payment`,
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${session.token}`
          }
        }
      );
      console.log(response.data.transaction.return_code);
      if (response.data.transaction.return_code === 1) {
        const orderUrl = response.data.transaction.order_url;
        console.log(orderUrl);
        // Render giao diện thanh toán
        router.push(orderUrl);
      } else {
        alert(
          response.data.return_message || "Đã xảy ra lỗi khi tạo thanh toán."
        );
      }
      if (response.status === 301) {
        return toast.success("Vui lòng đăng nhập để đặt xe!");
      }
      if (response.status === 200) {
        return toast.success("Đã gửi tanh toán thành công!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;

        // Hiển thị lỗi dựa trên thông báo
        if (
          errorMessage ===
          "Booking status is pending ! Please wait for the admin to confirm"
        ) {
          toast("Đặt chỗ đang chờ duyệt! Vui lòng đợi quản trị viên xác nhận.");
        } else if (errorMessage === "Booking success , can't create payment") {
          toast("Đặt chỗ đã hoàn tất, bạn không thể tạo thanh toán.");
        } else if (
          errorMessage === "Please wait for booking status approved !"
        ) {
          toast("Vui lòng đợi trạng thái đặt chỗ được phê duyệt!");
        } else {
          toast("Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.");
        }
      } else {
        console.error("Unexpected error:", error);
        toast("Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.");
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      {/* Modal xác nhận xóa */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
      {/* modal update */}
      <EditBookingModal
        isOpen={isModalOpenUpdate}
        onClose={cancelUpdate}
        booking={itemIdUpdate}
        onConfirm={confirmUpdate}
      />
      <WrapContainer>
        <h1 className="text-[1.4rem] mt-5 text-slate-600/70 font-bold">
          Danh Sách Booking{" "}
        </h1>
        <div className="headerBooking  flex justify-between text-center items-center bg-black/90 p-3 rounded-xl mt-5">
          <div className="text-[1rem] w-[calc(100%-90%)]  font-semibold text-white filter">
            STT
          </div>
          <div className="text-[1rem] w-[calc(100%-80%)] font-semibold text-white nameCar">
            Tên xe
          </div>
          <div className="text-[1rem] w-[calc(100%-80%)]  font-semibold text-white nameCar">
            Ảnh
          </div>
          <div className="text-[1rem] w-[calc(100%-90%)]  font-semibold text-white nameCar">
            Tổng ngày thuê
          </div>
          <div className="text-[1rem] w-[calc(100%-90%)]  font-semibold text-white nameCar">
            Tổng tiền
          </div>
          <div className="text-[1rem] w-[calc(100%-90%)]  font-semibold text-white nameCar">
            Trạng thái
          </div>
          <div className="text-[1rem] w-[calc(100%-80%)] font-semibold text-white nameCar">
            Hành động
          </div>
        </div>
        <div className="container">
          {bookingList.map((item, index) => (
            <div
              key={index}
              className="flex text-center justify-between p-3 items-center"
            >
              <div className="text-[1rem] w-[calc(100%-90%)] font-500 text-black/70 filter">
                {index}
              </div>
              <div className="text-[1rem] w-[calc(100%-80%)]  font-500 text-black/70 nameCar">
                {item.car_id.car_name}
              </div>
              <div className="text-[1rem] w-[calc(100%-80%)] font-500 text-black/70 nameCar">
                <img
                  src={`${urlImage}/${item.car_id.image[0]}`}
                  alt=""
                  className="w-12 m-auto h-12 rounded-xl"
                />
              </div>
              <div className="text-[1rem]  w-[calc(100%-90%)] font-500 text-black/70 nameCar">
                {Math.ceil(
                  (new Date(item.end_date) - new Date(item.start_date)) /
                    (1000 * 60 * 60 * 24)
                )}
              </div>
              <div className="text-[1rem] w-[calc(100%-90%)]  font-semibold  text-red-500/70 nameCar">
                {(
                  Math.ceil(
                    (new Date(item.end_date) - new Date(item.start_date)) /
                      (1000 * 60 * 60 * 24)
                  ) * item.car_id.price_per_day
                ).toLocaleString("vi-VN")}
                {/* {item.total_price.toLocaleString("vi-VN")} */}
              </div>
              <div className="text-[1rem]  font-semibold w-[calc(100%-90%)]  nameCar">
                <span className="text-orange-500 font-bold bg-orange-300 p-2 rounded-xl">
                  {item.status}
                </span>
              </div>
              <div className="text-[1rem] flex gap-2  font-semibold w-[calc(100%-80%)]  nameCar">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 border border-orange-500 rounded-xl text-orange-300/80 font-bold hover:bg-orange-400/80 hover:text-orange-500 transition-all duration-300 cursor-pointer"
                >
                  {" "}
                  Xóa
                </button>
                <button
                  onClick={() => handleUpdate(item)}
                  className="p-2 border border-green-500 rounded-xl text-green-300/80 font-bold hover:bg-green-400/80 hover:text-green-500 transition-all duration-300 cursor-pointer"
                >
                  {" "}
                  Sửa
                </button>
                <button
                  onClick={() => handlePayment(item._id)}
                  className="p-2 border border-red-500 rounded-xl text-red-300/80 font-bold hover:bg-red-400/80 hover:text-red-500 transition-all duration-300 cursor-pointer"
                >
                  {" "}
                  Thanh toán
                </button>
              </div>
            </div>
          ))}
        </div>
      </WrapContainer>
    </div>
  );
};

export default Page;
