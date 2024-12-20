"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AddCategoryForm from './AddCategoryForm';
import EditCategoryForm from './EditCategoryForm';
import CategoryTable from './CategoryTable';
import Pagination from '@/components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '@/redux/category/categoryThunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ActionDelete from '../ActionDelete';
const CategoryManagement = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || 1);
  const limit = 4;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector((state: RootState) => state.category);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  // Fetch categories khi component mount
  useEffect(() => {
    dispatch(fetchCategories({ page: currentPage, limit: limit }));
  }, [dispatch,currentPage]);

  // Hàm thêm mới danh mục
  const handleAddCategory = (categoryData) => {
    dispatch(addCategory(categoryData)); 
    toast.success("Thêm mới thành công")
    setTimeout(()=>{
      setShowForm(false);
  },1000)
  };

  // Hàm xử lý cập nhật danh mục
  const handleUpdateCategory = (updatedCategory) => {
    const { id, ...category_name } = updatedCategory;
  
    dispatch(updateCategory({id,category_name})); // Gửi action cập nhật category
    toast.success("Cập nhật thành công")
    setTimeout(()=>{
      setShowForm(false);
  },1000)
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true); // Hiển thị form sửa
  };

  const handleDeleteCategory = () => {
    
    dispatch(deleteCategory(categoryToDelete)); 
    setShowModal(false);
    toast.success("Xoá thành công")
    setTimeout(()=>{
      setShowModal(false);
  },1000)
  };

  const handleShowDeleteCategory = (categoryId) => {
     setCategoryToDelete(categoryId)
    setShowModal(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleCancelFormDelete = () => {
    setShowModal(false);
  };

  

  return (
    <div className="p-6 bg-white">
    {showModal ?  <ActionDelete onDelete={handleDeleteCategory} onClose={handleCancelFormDelete}/> : "" } 
      <ToastContainer/>
      <h1 className="text-xl font-bold mb-4">Quản lý Danh Mục</h1>

      {/* Nút thêm danh mục */}
      <div className="my-3 text-right">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Thêm Danh Mục
        </button>
      </div>

      {/* Hiển thị form Thêm hoặc Sửa */}
      {showForm && (
        <div className="mb-6">
          {editingCategory ? (
            <EditCategoryForm category={editingCategory} onSubmit={handleUpdateCategory} onCancel={handleCancelForm} />
          ) : (
            <AddCategoryForm onSubmit={handleAddCategory} onCancel={handleCancelForm} />
          )}
        </div>
      )}

      {/* Bảng hiển thị danh mục */}
      <div className="mb-6">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
  
          <CategoryTable
            categories={categories.data}
            onEdit={handleEditCategory}
            onDelete={handleShowDeleteCategory}
            currentPage={categories.currentPage}
            limit={limit}
          />
        )}
      </div>

      {/* Phân trang */}
      <div className="pt-4">
      <Pagination
        currentPage={categories.currentPage}
        totalPages={categories.totalPages}
       
      />
      </div>
    </div>
  );
};

export default CategoryManagement;
