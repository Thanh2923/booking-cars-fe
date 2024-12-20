"use client"
import { useState, useEffect } from 'react';

const EditUserForm = ({ session,user, onSubmit, onCancel }) => {
  const isUser = session?.user.role_id ==="admin" ;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone:'',
    role_id: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        phone:user.phone,
        role_id: user.role_id
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({id: user._id,formData});

   
  };

  return (
    <div className='w-full fixed z-20 bg-slate-400  bg-opacity-20 flex h-screen top-0 left-0 justify-center items-center'>
    <div className='w-[50%] bg-white shadow-lg rounded-lg flex justify-center  '>
    <form onSubmit={handleSubmit} className="space-y-4 w-[90%] ">
    <h2 className='py-5 font-semibold  text-lg '>Sửa người dùng</h2>
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Tên</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {isUser ? 
      (   <div>
        <label htmlFor="role_id" className="block text-sm font-medium text-gray-700">Vai trò</label>
        <select
          id="role_id"
          name="role_id"
          value={formData.role_id}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={formData.role_id._id}>{formData.role_id.roleName}</option>
        </select>
      </div>)
    : ""  
    } 
   

      <div className="flex py-5 justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Hủy</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Lưu</button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default EditUserForm;
