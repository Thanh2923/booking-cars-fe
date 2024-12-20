function ActionDelete({ onDelete, onClose }) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Bạn có chắc chắn muốn xóa không?</h2>
          <div className="flex justify-end">
            <button 
              className="bg-red-600 text-white px-4 py-2 rounded mr-2"
              onClick={onDelete}
            >
              Xóa
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default ActionDelete