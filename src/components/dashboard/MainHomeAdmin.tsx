"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MainHomeAdmin = () => {
  const [totalRevenues, setTotalRevenue] = useState(0);
  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchTotalRevenue = async () => {
          try {
            const res = await axios.get(`${baseURL}/payment/totalRevenue`);
            console.log(res);

            // Kiểm tra mã trạng thái HTTP và gán tổng doanh thu
            if (res.status === 200 && res.data.totalRevenue !== undefined) {
              setTotalRevenue(res.data.totalRevenue);
            } else {
              console.error('Total revenue data not found');
            }
          } catch (error) {
            console.error('Error fetching total revenue:', error);
          }
        }
    
    fetchTotalRevenue();
  }, []);
  const data = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12"
    ],
    datasets: [
      {
        label: "Doanh Thu",
        data: [
          5000000, 7000000, 8000000, 4000000, 9000000, 10000000, 6000000,
          8000000, 11000000, 12000000, 13000000, 14000000
        ],
        backgroundColor: "rgba(59, 130, 246, 0.6)", // Xanh Tailwind
        borderWidth: 1
      },
      {
        label: "Số Lượng",
        data: [3, 2, 4, 1, 5, 6, 2, 3, 4, 5, 6, 4],
        type: "line",
        borderColor: "rgba(234, 88, 12, 1)", // Cam Tailwind
        backgroundColor: "rgba(234, 88, 12, 0.2)",
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const totalRevenue = data.datasets[0].data.reduce(
    (sum, value) => sum + value,
    0
  );
  return (
    <div className="flex gap-4">
      {/* Biểu đồ chiếm 80% */}
      <div className="w-4/5 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Doanh Thu</h2>
        <Bar data={data} options={options} />
      </div>

      {/* Tổng doanh thu chiếm 20% */}
      <div className="w-1/5 bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold text-gray-700">Tổng Doanh Thu</h3>
        <p className="text-3xl font-bold text-blue-500 mt-4">
          {totalRevenues.toLocaleString("vi-VN")} VND
        </p>
      </div>
    </div>
  );
};

export default MainHomeAdmin;
