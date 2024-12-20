"use client";
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import UserTable from './UserTable';
import Pagination from '@/components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { addUser, deleteUser,fetchUserById, fetchUsers,updateUser } from '@/redux/users/usersThunk';
import ActionDelete from '../ActionDelete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserManagement = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const limit = 5;
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || 1);
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  console.log(users)
  const [showModal, setShowModal] = useState(false);
  const [usersToDelete, setUsersToDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false); 
  const isUser = session?.user.role_id ==="admin";
  useEffect(() => {
   
    if(session?.user.role_id ==="admin")
      { dispatch(fetchUsers({ page: currentPage, limit: limit })); }
    else{
   
       dispatch(fetchUserById(session?.user.id))
      }
    
  }, [session,currentPage, dispatch]);


  const handleAddUser = (userData: any) => {
    dispatch(addUser(userData))
   if(error !==null) {
    toast.error(error)
   }else{
    
    isUser ?  dispatch(fetchUsers({ page: currentPage, limit: 5 })) :   dispatch(fetchUserById(session?.user.id));
    toast.success("Thêm mới thành công")
    setTimeout(()=>{
      setShowForm(false);
      
  },1000)
   }
  
  };
  const handleUpdateUserByid = (updateuser)=>{
    
    const { id, ...formData } = updateuser;
    dispatch(updateUser({id,formData}));
    if(error !==null) {
      toast.error(error)
     }else{
      isUser ?  dispatch(fetchUsers({ page: currentPage, limit: 5 })) :   dispatch(fetchUserById(session?.user.id));
      toast.success("Cập nhật thành công")
      setTimeout(()=>{
        setShowForm(false);
        
    },1000)
  }
}

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setShowForm(true); 
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(usersToDelete)); 
    setShowModal(false);
    toast.success("Xoá thành công")
    setTimeout(()=>{
      setShowModal(false);
  },1000)
  };

  const handleCancelFormDelete = () => {
    setShowModal(false);
  };


  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null); // Hủy sửa người dùng
  };

  const handleShowDeleteUser = (categoryId) => {
    setUsersToDelete(categoryId)
   setShowModal(true);
 };

  return (
    <div className="p-6 bg-white">
    
      <ToastContainer/>
        {showModal ?  <ActionDelete onDelete={handleDeleteUser} onClose={handleCancelFormDelete}/> : "" } 
      <h1 className="text-xl font-bold mb-4">Quản lý Người Dùng</h1>
      {/* Nút thêm người dùng */}

      {session?.user.role_id === "admin" ?
      <div className="my-3 text-right">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Thêm Người Dùng
        </button>
      </div> : ""}

      {/* Hiển thị form Thêm hoặc Sửa */}
      {showForm && (
        <div className="mb-6">
          {editingUser ? (
            <EditUserForm
            session={session}
              user={editingUser}
              onSubmit={handleUpdateUserByid}
              onCancel={handleCancelForm}
            />
          ) : (
            <AddUserForm onSubmit={handleAddUser} onCancel={handleCancelForm} />
          )}
        </div>
      )}

      {/* Bảng hiển thị người dùng */}
      <div className="mb-6">
      
  
          <UserTable session={session} users={ users.data} onEdit={handleEditUser} onDelete={handleShowDeleteUser} currentPage={users.currentPage} limit={limit} />
        
      </div>

      <div className="pt-4">
        <Pagination
          currentPage={users.currentPage}
          totalPages={users.totalPages}
          
        />
      </div>
    </div>
  );
};

export default UserManagement;
