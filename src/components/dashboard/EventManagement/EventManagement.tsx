"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import EventTable from './EventTable';
import Pagination from '@/components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { deleteEvent, fetchEvents, updateEvent } from '@/redux/event/eventThunks';
import ActionDelete from '../ActionDelete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EventManagement = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || 1);
  const limit = 5;
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const { events, loading, error } = useSelector((state) => state.events);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    dispatch(fetchEvents({ page: currentPage, limit: limit }))
  }, [dispatch,currentPage]);

  // Update an existing event
  const handleUpdateEvent = (updatedevent) => {
      const {  id, event_name,image,event_date,description} = updatedevent;
      dispatch(updateEvent({id, event_name,image,event_date,description}))
      setShowForm(!showForm)
  };

  // Edit event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };


  const handleDeleteUser = () => {
    dispatch(deleteEvent(eventToDelete)); 
    setShowModal(false);
    toast.success("Xoá thành công")
    setTimeout(()=>{
      setShowModal(false);
  },1000)
  };

  const handleCancelFormDelete = () => {
    setShowModal(false);
  };

  // Cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleShowDeleteEnvent = (id) => {
    setEventToDelete(id)
   setShowModal(true);
 };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-xl font-bold mb-4">Quản lý Sự Kiện</h1>
      <ToastContainer/>
      {showModal ?  <ActionDelete onDelete={handleDeleteUser} onClose={handleCancelFormDelete}/> : "" } 
      {/* Add event button */}
      <div className="my-3 text-right">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Thêm Sự Kiện
        </button>
      </div>

      {/* Display form for adding or editing an event */}
      {showForm && (
        <div className="mb-6">
          {editingEvent ? (
            <EditEventForm event={editingEvent} onSubmit={handleUpdateEvent} onCancel={handleCancelForm} />
          ) : (
            <AddEventForm setShowForm={setShowForm}  onCancel={handleCancelForm} />
          )}
        </div>
      )}


      {/* Event table */}
      <div className="mb-6">
        <EventTable events={events.data} onEdit={handleEditEvent} onDelete={handleShowDeleteEnvent} currentPage={events.currentPage}  limit={limit} />
      </div>
      <div className='pt-4'>
      <Pagination
        currentPage={events.currentPage}
        totalPages={events.totalPages}
       
      />
      </div>
    </div>
  );
};

export default EventManagement;
