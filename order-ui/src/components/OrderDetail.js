import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderService } from '../services/api';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrderById(id);
      setOrder(data);
    } catch (error) {
      setError('Failed to fetch order details');
      toast.error('Failed to fetch order details');
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', emoji: '🟡', label: 'Pending' },
      processing: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', emoji: '🔵', label: 'Processing' },
      shipped: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200', emoji: '🟠', label: 'Shipped' },
      delivered: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', emoji: '🟢', label: 'Delivered' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', emoji: '🔴', label: 'Cancelled' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center space-x-2 px-4 py-3 rounded-xl text-lg font-semibold ${config.bg} ${config.text} ${config.border} border shadow-sm`}>
        <span className="text-xl">{config.emoji}</span>
        <span>{config.label}</span>
      </span>
    );
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdatingStatus(true);
      await orderService.updateOrderStatus(order.orderId, newStatus);
      setOrder(prev => ({ ...prev, orderStatus: newStatus }));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update order status');
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
          <div className="text-red-500 text-xl mb-4 flex items-center justify-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error || 'Order not found'}</span>
          </div>
          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors transform hover:scale-105"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-indigo-100 p-8">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-tr from-emerald-400/20 to-blue-500/20 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-center relative z-10">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Order Details
            </h1>
            <p className="text-gray-700 text-lg font-medium flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-3 animate-pulse"></span>
              Order ID: {order.orderId}
            </p>
          </div>
          <Link
            to="/"
            className="relative group bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 transform hover:scale-110 shadow-xl hover:shadow-2xl inline-flex items-center space-x-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Order Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
              <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Customer Information
            </h2>
          </div>
          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Customer Name</label>
              <p className="text-2xl font-bold text-gray-900">{order.customerName}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Order Amount</label>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                {formatAmount(order.orderAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* Order Status & Details */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
              <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Order Status & Details
            </h2>
          </div>
          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Current Status</label>
              {getStatusBadge(order.orderStatus || 'pending')}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Order Date</label>
              <p className="text-lg font-semibold text-gray-900">{formatDate(order.orderDate)}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Update Status</label>
              <div className="flex flex-wrap gap-2">
                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(status)}
                    disabled={updatingStatus || order.orderStatus === status}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      order.orderStatus === status
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Section */}
      {order.invoiceFileUrl && (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center">
              <svg className="w-6 h-6 text-emerald-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Invoice Document
            </h2>
          </div>
          <div className="p-8">
            <a
              href={order.invoiceFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 transform hover:scale-110 shadow-xl hover:shadow-2xl inline-flex items-center space-x-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Invoice PDF</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
