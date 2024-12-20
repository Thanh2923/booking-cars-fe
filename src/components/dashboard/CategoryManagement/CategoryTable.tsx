"use client";

const CategoryTable = ({ categories, onEdit, onDelete,currentPage, limit }) => {
  const safeCategories = categories ?? [];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Tên danh mục</th>
            <th className="px-4 py-2 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {  safeCategories.map((category,index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{(currentPage - 1) * limit + index + 1}</td>
              <td className="px-4 py-2">{category.category_name}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onEdit(category)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(category._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
