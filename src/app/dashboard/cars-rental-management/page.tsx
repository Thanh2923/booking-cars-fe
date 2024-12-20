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
const urlImage = process.env.NEXT_PUBLIC_API_IMAGE;
const Page = () => {
  const [statusUpdate , setStatus] = useState('Pending')
  const router = useRouter(); 
  const confirmUpdateStatus = async (bookingId: string, status: "Pending" | "Approved" | "Rejected") => { 
    try {
      // Gọi API 
      const response = await axios.patch(
        `${baseURL}/owner/updateBooking/${bookingId}` , {status} ,
        {
          headers: {
            Authorization: `Bearer ${session?.token}` // Gửi token với prefix "Bearer"
          }
        }
      );
      if (response.status === 200) { 
        toast.success("Cập nhật trạng thái thành công");
        setStatus(status)
        fetchRequests();
     
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật trạng thái");
    }
 
    
  }
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [bookingList, setBookingList] = useState<Booking[]>([]);
  const isUser = session ? session?.user.role_id === "admin" : "";
    const fetchRequests = async () => {
      try {
        console.log("Session Token:", session?.token); // Log token để debug

        const response = await axios.get(`${baseURL}/owner/listBooking`, {
          headers: {
            Authorization: `Bearer ${session.token}`, // Gửi token với prefix "Bearer"
          },
        });
        const data = Array.isArray(response.data.bookings) ? response.data.bookings : [];
        setBookingList(data)
        
      } catch (error) {
        
          console.error("Unexpected error:", error.message);
        }
     
    }
  

  useEffect(() => {
    if(session?.user.role_id === "ownerCar"){
      fetchRequests();
    }else{
      const fetchRequest = async () => {
        try {

  
          const response = await axios.get(`${baseURL}/bookingRoleAdmin`);
          const data = Array.isArray(response.data.bookings) ? response.data.bookings : [];
          setBookingList(data)
          console.log(data)
        } catch (error) {
          
            console.error("Unexpected error:", error.message);
          }
       
      }
      fetchRequest();
    } 

  }, [session, status]);

  return (
    <div>
      <ToastContainer />
     
      <h1 className="text-[1.4rem] mt-5 text-slate-600/70 font-bold">
        Danh Sách Booking{" "}
      </h1>
      <div className="headerBooking  flex justify-between text-center items-center bg-red-100 p-3 rounded-xl mt-5">
        <div className="text-[1rem] w-[calc(100%-90%)]  font-semibold text-red-500 filter">
          STT
        </div>
        <div className="text-[1rem] w-[calc(100%-80%)] font-semibold text-red-500 nameCar">
          Tên xe
        </div>
        <div className="text-[1rem] w-[calc(100%-90%)]  font-semibold text-red-500 nameCar">
          Ảnh
        </div>
        <div className="text-[1rem] w-[calc(100%-80%)]  font-semibold text-red-500 nameCar">
          Tổng ngày thuê
        </div>
        <div className="text-[1rem] w-[calc(100%-90%)]  font-semibold text-red-500 nameCar">
          Tổng tiền
        </div>
      {!isUser ? 

      <>
        <div className="text-[1rem] w-[calc(100%-90%)]  font-semibold text-red-500 nameCar">
        Trạng thái
      </div>
      <div className="text-[1rem] w-[calc(100%-80%)] font-semibold text-red-500 nameCar">
        Hành động
      </div>
      </>
           : ""
   }
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
            <div className="text-[1rem] w-[calc(100%-90%)] font-500 text-black/70 nameCar">
              <img
                src={`${urlImage}/${item.car_id.image[0]}`}
                alt=""
                className="w-12 m-auto h-12 rounded-xl"
              />
            </div>
            <div className="text-[1rem]  w-[calc(100%-80%)] font-500 text-black/70 nameCar">
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
            </div>
            <div className="text-[1rem]  font-semibold w-[calc(100%-90%)]  nameCar">
              <span className="text-orange-500 font-bold bg-orange-300 p-2 rounded-xl">
                {item.status}
              </span>
            </div>
            {!isUser ? 
           ( <div className="text-[1rem] flex gap-2  font-semibold w-[calc(100%-80%)]  nameCar">
            <button
              onClick={() => confirmUpdateStatus(item._id , 'Approved')}
              className="p-2   border border-green-500 rounded-xl text-green-300/80 font-bold hover:bg-green-400/80 hover:text-green-500 transition-all duration-300 cursor-pointer"
            >
              Chấp nhận
            </button>
            <button
              onClick={() => confirmUpdateStatus(item._id , 'Rejected')}
              className="p-2   border border-green-500 rounded-xl text-green-300/80 font-bold hover:bg-green-400/80 hover:text-green-500 transition-all duration-300 cursor-pointer"
            >
              Từ chối
            </button>
          </div>)   : ""
          }
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
