import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderService } from '../services/api';

const CreateOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    orderAmount: '',
    invoiceFile: null
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      e.target.value = '';
      return;
    }
    setFormData(prev => ({
      ...prev,
      invoiceFile: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customerName.trim()) {
      toast.error('Customer name is required');
      return;
    }
    
    if (!formData.orderAmount || parseFloat(formData.orderAmount) <= 0) {
      toast.error('Please enter a valid order amount');
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        customerName: formData.customerName.trim(),
        orderAmount: parseFloat(formData.orderAmount),
        invoiceFile: formData.invoiceFile
      };

      await orderService.createOrder(orderData);
      toast.success('Order created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create order. Please try again.');
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-full mb-8 shadow-2xl animate-pulse">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Create New Order
          </h1>
          <p className="text-gray-600 text-lg font-medium">Fill in the details below to create a new order</p>
        </div>

        {/* Form Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-300/20 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-200/20 to-blue-300/20 rounded-full translate-y-16 -translate-x-16"></div>
          
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 p-8">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">Order Information</h2>
              <p className="text-indigo-100">All fields marked with * are required</p>
            </div>
          </div>
          
          <div className="relative z-10 p-10">
            {loading && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-50 rounded-3xl">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-indigo-600"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white rounded-full p-3 shadow-lg">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-indigo-600 font-semibold text-lg mt-4">Creating order...</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Customer Name */}
              <div className="space-y-3">
                <label htmlFor="customerName" className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Customer Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full pl-14 pr-4 py-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg font-medium bg-gradient-to-r from-gray-50 to-white hover:border-gray-300 hover:shadow-lg"
                    placeholder="Enter customer's full name"
                    required
                  />
                </div>
              </div>

              {/* Order Amount */}
              <div className="space-y-3">
                <label htmlFor="orderAmount" className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Order Amount ($) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    id="orderAmount"
                    name="orderAmount"
                    value={formData.orderAmount}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0.01"
                    className="w-full pl-14 pr-4 py-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg font-medium bg-gradient-to-r from-gray-50 to-white hover:border-gray-300 hover:shadow-lg"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Invoice File */}
              <div className="space-y-3">
                <label htmlFor="invoiceFile" className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Invoice PDF (Optional)
                </label>
                <div className="relative">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-indigo-400 transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-white group hover:shadow-lg">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-700 mb-2">
                          {formData.invoiceFile ? formData.invoiceFile.name : 'Upload Invoice PDF'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formData.invoiceFile ? (
                            <span className="text-green-600 font-medium flex items-center justify-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              File selected successfully
                            </span>
                          ) : (
                            'Drag and drop or click to browse'
                          )}
                        </p>
                      </div>
                      <input
                        type="file"
                        id="invoiceFile"
                        name="invoiceFile"
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <button
                        type="button"
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Choose File
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>PDF files only, maximum file size: 10MB</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-6 pt-8">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-5 px-6 rounded-2xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 font-bold py-5 px-6 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg relative overflow-hidden ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                      : 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 text-white group'
                  }`}
                >
                  {!loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  )}
                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Create Order</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
