"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "@/redux/car/carSliceThunk";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CiStar } from "react-icons/ci";
import { SiGoogleanalytics } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface Car {
  id: string;
  car_name: string;
  category_id: string;
  price_per_day: number;
  availability_status: boolean;
  image: string[];
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
const Car = () => {
  const [cars, setCars] = useState<Car[]>([]); // Danh sách xe
  const [loading, setLoading] = useState(true); // Trạng thái loading
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get<Car[]>(`${baseURL}/car/getAllCars`);
        const data = response.data || [];
        setCars(Array.isArray(data) ? data : []); // Đảm bảo `cars` là mảng
      } catch (error) {
        console.error("Lỗi khi lấy danh sách xe:", error);
        setCars([]); // Trả về mảng rỗng nếu lỗi
      } finally {
        setLoading(false);
      }
    }; 
    fetchCars();
  }, []);
  if (loading) return <p>Đang tải danh sách xe...</p>;
  console.log(cars);
  return (
    <>
      {cars.map((item, index) => (
        <div key={index} className="box flex flex-col  ">
          <Link
            href="/car/3tzuvcW_2ym0eCuolXVKyw"
            className="img relative overflow-hidden rounded-2xl"
          >
            <img
              src="/car/3tzuvcW_2ym0eCuolXVKyw.jpg"
              alt="image car"
              className="rounded-2xl hover:scale-125 cursor-pointer duration-500 transition-all"
            />
            <button className=" absolute right-0 bottom-0 discount bg-orange-400 text-orange-700 px-2 py-1 rounded-2xl font-[300]">
              Giảm 20%
            </button>
          </Link>
          <div className="description flex gap-2 flex-col">
            <div className="desc_tag my-4 flex gap-x-2 items-center">
              <button className="hover:bg-blue-200 transition-all duration-300 ease-in-out px-2 py-1 rounded-xl font-[300] border border-slate-300 bg-slate-200 text-blue-400">
                Số sàn
              </button>
              <button className="hover:bg-blue-200 transition-all duration-300 ease-in-out  px-2 py-1 rounded-xl font-[300] border border-slate-300 bg-slate-200 text-blue-400">
                Giao xe tận nơi
              </button>
            </div>
            <div className="desc_name">
              <p className="font-bold  text-[1.2rem]">MITSUBISHI MIRAGE 2017</p>
            </div>
            <div className="desc_address flex items-center">
              <div className="location-icon mr-1">
                <FaLocationDot />
              </div>
              <span className="text-[#767676] font-[500] text[.65rem]">
                Quận 1 . Hồ Chí Minh
              </span>
            </div>
            <div className="line-page w-full h-1 lg:h-2 bg-slate-300 my-3 rounded-2xl"></div>
            <div className="info-price flex justify-between items-center">
              <div className="info flex items-center">
                <div className="wrap-iconStar mr-1">
                  <CiStar className="fill-yellow-500 " />
                </div>
                <span className="number-star text-[#767676] font-[500] text[.75rem] mr-1">
                  5.0
                </span>
                <div className="wrap-analytics">
                  <SiGoogleanalytics className="text-[#5fcf86] mr-1" />
                </div>
                <span className="text-[#767676] font-[500] text[.6rem]">
                  100 + Chuyến
                </span>
              </div>
              <div className="wrap-price flex items-center text-[#767676] font-[500]">
                <span className="price text-[#767676] font-[500] text[.75rem]">
                  <span className="text-red-600 text[1rem] font-bold">
                    1500k
                  </span>
                </span>
                /ngày
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Car;
