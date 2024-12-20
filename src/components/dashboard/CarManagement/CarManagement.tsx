"use client"
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID for unique ID generation
import AddCarForm from './AddCarForm';
import EditCarForm from './EditCarForm';
import CarTable from './CarTable';
import Pagination from '@/components/pagination/Pagination';
import axios from "axios";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ActionDelete from '../ActionDelete';
import { useSearchParams } from 'next/navigation';

const CarManagement = () => {
    const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || 1);
  const [editingCar, setEditingCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { data: session, status } = useSession();
  const [carOwner, setCarOwner] = useState([]);
   const [categoryToDelete, setCategoryToDelete] = useState(null);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const limit=5;
  const fetchRequests = async () => {
    if (session?.token) {
      try {
        const getcart = session.user.role_id === "admin" ? "/" : "/getListCar";
        console.log("Token hiện tại:", session.token); // Debug token
        const res = await axios.get(`${baseURL}/car${getcart}?page=${currentPage}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${session.token}`, // Gửi token với prefix "Bearer"
          },
        });
  
        console.log("Dữ liệu trả về từ API:", res.data); // Debug response
        setCarOwner(res.data);
      } catch (error) {
        if (error.response) {
          console.error("Lỗi từ server:", error.response.data); // Lỗi phía server
        } else if (error.request) {
          console.error("Không nhận được phản hồi từ server:", error.request); // Server không phản hồi
        } else {
          console.error("Lỗi khác:", error.message); // Lỗi bất thường
        }
  
        setCarOwner([]); // Đảm bảo cập nhật danh sách thành mảng rỗng nếu lỗi
      }
    } else {
      console.warn("Token không hợp lệ hoặc người dùng chưa đăng nhập.");
    }
  };
  
  
  useEffect(() => {
    if(carOwner){
      fetchRequests(); 
    }
  
  }, [session,currentPage]);
  
  
  const handleAddCar = ()=>{
    toast.success("Thêm mới thành công!")
     setShowForm(false);
     fetchRequests();
   }
  

     
  const handleSubmit = ()=>{
    toast.success("Cập nhật thành công!")
     setShowForm(false);
     fetchRequests();
   }
  

  // Edit car
  const handleEditCar = (car) => {
    setEditingCar(car);
    setShowForm(true);
  };

  // Delete a car
  const handleDeleteCar = async() => {
    try {
      const res = await axios.delete(`${baseURL}/car/${categoryToDelete}`);
      if (res.status === 200) { // Kiểm tra mã trạng thái
        fetchRequests();
        toast.success("Xoá thành công!")
        setShowModal(false);
      } else {
        console.error('Xóa xe không thành công:', res.statusText);
      }
    } catch (error) {
      console.error('Lỗi khi xóa xe:', error.response?.data || error.message);
    }
  

  };

  // Cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCar(null);
  };



  const totalPages = 5; // Số lượng trang

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCancelFormDelete = () => {
    setShowModal(false);
  };

  const handleShowDeleteCar = (Id) => {
    setCategoryToDelete(Id)
   setShowModal(true);
 };

  


  return (
    <div className="p-6 bg-white">
        {showModal ?  <ActionDelete onDelete={handleDeleteCar} onClose={handleCancelFormDelete}/> : "" } 
      <ToastContainer/>
      <h1 className="text-xl font-bold mb-4">Quản lý Xe</h1>

      {session?.user.role_id ==="admin" ? "" : <div className="my-3 text-right">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Thêm Xe
        </button>
      </div> }

      {/* Display form for adding or editing a car */}
      {showForm && (
        <div className="mb-6">
          {editingCar ? (
            <EditCarForm car={editingCar}   onCancel={handleCancelForm} handleSubmitCar={handleSubmit} />
          ) : (
            <AddCarForm  handleAddCar={handleAddCar} onCancel={handleCancelForm} />
          )}
        </div>
      )}

   

      {/* Car table */}
      <div className="mb-6">
        <CarTable cars={carOwner.data} onEdit={handleEditCar} onDelete={handleShowDeleteCar} session={session}  currentPage={carOwner.currentPage} limit={limit}  />
      </div>
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

export default CarManagement;
