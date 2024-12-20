import React from 'react';

import { TbEaseInOutControlPoints } from "react-icons/tb";
import { IoBatteryCharging } from "react-icons/io5";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { MdOutlineGpsFixed } from "react-icons/md";
import { GiTransparentSlime } from "react-icons/gi";
import { MdOutlineToll } from "react-icons/md";
import { IoIosBluetooth } from "react-icons/io";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BsUsbPlug } from "react-icons/bs";
import { MdOutlineScreenRotation } from "react-icons/md";
import { AiOutlineSafety } from "react-icons/ai";
const Description = () => {
    return (
        <>
              <div className="order-2 lg:order-1 lg:w-[75%]">
                  <div className="content-detail mt-10">
                    <div className="inforDetail">
                      <h6 className="font-semibold text-[1.25rem]">Đặc điểm</h6>
                      <div className="flex justify-between  mt-4">
                        <div className="flex flex-col gap-3">
                          <TbEaseInOutControlPoints className="text-[2rem] text-blue-500" />
                          <span className=" text-[0.7rem] text-[#767676] transition">
                            Chuyển động
                          </span>
                          <p className="font-semibold">Số sàn</p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <MdAirlineSeatReclineNormal className="text-[2rem] text-blue-500" />
                          <span className=" text-[0.7rem] text-[#767676] number-of-seats">
                            Số ghế
                          </span>
                          <p className="font-semibold">5 chỗ</p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <BsFillFuelPumpFill className="text-[2rem] text-blue-500" />
                          <span className=" text-[0.7rem] text-[#767676] fuel">
                            Nhiên liệu
                          </span>
                          <p className="font-semibold">Xăng</p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <IoBatteryCharging className="text-[2rem] text-blue-500" />
                          <span className=" text-[0.7rem] text-[#767676] consumption">
                            Tiêu hao
                          </span>
                          <p className="font-semibold">1h/100km</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="description mt-10">
                    <h6 className="font-semibold text-[1.25rem]">Mô tả</h6>
                    <p className="py-3 text-[1rem] text-[#767676]">
                      TOYOTA INNOVA E 2016
                    </p>
                  </div>
                  {/*  */}
                  <div className="description mt-10">
                    <h6 className="font-semibold text-[1.25rem]">
                      Các tiện nghi khác
                    </h6>
                    <ul className="py-3 text-[0.9rem] flex flex-wrap lg:flex-row flex-col gap-4 text-[#767676]">
                      <li className="flex items-center gap-2">
                        {" "}
                        <FaMapMarkedAlt className="text-[1.12rem]" />
                        <span className="text-[1.25rem]">Bản đồ</span>
                      </li>
                      <li className="flex items-center gap-2">
                        {" "}
                        <FaCamera className="text-[1.12rem]" />
                        <span className="text-[1.25rem]">Camera lùi</span>{" "}
                      </li>
                      <li className="flex items-center gap-2">
                        {" "}
                        <MdOutlineGpsFixed className="text-[1.12rem]" />
                        <span className="text-[1.25rem]">Định vị GPS</span>{" "}
                      </li>
                      <li className="flex items-center gap-2">
                        {" "}
                        <GiTransparentSlime className="text-[1.12rem]" />
                        <span className="text-[1.25rem] spare-tire">
                          Lốp dự phòng
                        </span>{" "}
                      </li>
                      <li className="flex items-center gap-2">
                        {" "}
                        <MdOutlineToll className="text-[1.12rem]" />
                        <span className="text-[1.25rem] electronic_toll_collection">
                          ETC
                        </span>{" "}
                      </li>
                      <li className="flex items-center gap-2">
                        {" "}
                        <IoIosBluetooth className="text-[1.12rem]" />
                        <span className="text-[1.25rem]">Bluetooth</span>{" "}
                      </li>
                      <li className="flex items-center gap-2">
                        {" "}
                        <IoSpeedometerOutline className="text-[1.12rem]" />
                        <span className="text-[1.25rem]">
                          Cảnh báo tốc độ
                        </span>{" "}
                      </li>
                      <li className="flex items-center gap-2">
                        {" "}
                        <BsUsbPlug className="text-[1.12rem]" />
                        <span className="text-[1.25rem]">Khe cắm USB</span>{" "}
                      </li>
                      <li className="flex items-center gap-2">
                        {" "}
                        <MdOutlineScreenRotation className="text-[1.12rem]" />
                        <span className="text-[1.25rem]">
                          Màn hình DVD
                        </span>{" "}
                      </li>
                      <li className="flex items-center gap-2">
                        {" "}
                        <AiOutlineSafety className="text-[1.12rem]" />
                        <span className="text-[1.25rem]">Túi khí an toàn</span>
                      </li>
                    </ul>
                  </div>
                </div>
        </>
    );
}

export default Description;
