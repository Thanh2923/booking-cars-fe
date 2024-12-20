"use client";
import React from "react";
import WrapContainer from "../wrapContainer/wrapContainer";
import { CiStar } from "react-icons/ci";
import { SiGoogleanalytics } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
const FeatureCar = () => {
  const [cars, setCars] = useState<Car[]>([]); // Danh sách xe
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [showTimeRental, setShowTimeRental] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const urlImage = process.env.NEXT_PUBLIC_API_IMAGE;
  useEffect(() => {
    
    const fetchCars = async () => {
      try {

        const response = await axios.get<Car[]>(
          `${baseURL}/car/getAllCars`
        );

 

        const data = response.data.data;
        setCars(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error("Lỗi khi lấy danh sách xe");
        setCars([]); // Trả về mảng rỗng nếu lỗi
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);
  if (loading)
    return (
      <h2 className="text-center text-black/60 my-10 font-bold text-[1rem]">
        Đang tải danh sách xe...
      </h2>
    );
  console.log(cars);
  return (
    <section className="feature_car">
      <ToastContainer />
      <WrapContainer>
        <div className="p-5">
          <h2 className="text-center mb-[32px] text-[2rem] md:text-[2.25rem] font-bold">
            Xe Dành Cho Bạn
          </h2>
          <div className="container-car grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {cars.map((item) => (
              <div key={item._id} className="box flex flex-col  ">
                <Link
                  href={`/car/${item._id}`}
                  className="img relative overflow-hidden rounded-2xl"
                >
                  <div className="w-[301px] overflow-hidden h-[225.5px] ">
                    <img
                      src={`${urlImage}/${item.image[0]}`}
                      alt="image car"
                      className="rounded-2xl hover:scale-125 cursor-pointer duration-500 transition-all"
                    />
                  </div>
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
                    <p className="font-bold  text-[1.2rem]">{item.car_name}</p>
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
                          {item.price_per_day.toLocaleString("vi-VN")}
                        </span>
                      </span>
                      /ngày
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </WrapContainer>
    </section>
  );
};

export default FeatureCar;
