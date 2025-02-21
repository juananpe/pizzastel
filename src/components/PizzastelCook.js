import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  ChefHat,
  Timer,
  AlertCircle,
  Pizza,
  UserCheck
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PizzastelCook = () => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Mock data with status tracking
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      status: "pending", // pending, in-progress, completed
      timeReceived: "14:30",
      assignedTo: null,
      items: [
        {
          type: "Large Pizza",
          ingredients: ["Tomato", "Double Mozzarella", "Ham", "Mushrooms"],
          special: "Extra crispy"
        },
        {
          type: "Medium Pizza",
          ingredients: ["Tomato", "Mozzarella", "Olives"],
          special: null
        }
      ]
    },
    {
      id: "ORD-002",
      status: "pending",
      timeReceived: "14:35",
      assignedTo: null,
      items: [
        {
          type: "Regular Pizza",
          ingredients: ["Tomato", "Mozzarella", "Pepperoni", "Olives"],
          special: null
        }
      ]
    },
    {
      id: "ORD-003",
      status: "in-progress",
      timeReceived: "14:20",
      assignedTo: "Cook2",
      items: [
        {
          type: "Large Pizza",
          ingredients: ["Tomato", "Mozzarella", "Mushrooms"],
          special: null
        }
      ]
    }
  ]);

  const handleTakeOrder = (order) => {
    setSelectedOrder(order);
    setShowConfirmation(true);
  };

  const confirmTakeOrder = () => {
    // Update only the selected order's status
    setOrders(orders.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: 'in-progress', assignedTo: 'CurrentCook' }
        : order
    ));
    
    setActiveOrder(selectedOrder);
    setShowConfirmation(false);
    setSelectedOrder(null);
  };

  const completeOrder = () => {
    setOrders(orders.map(order => 
      order.id === activeOrder.id 
        ? { ...order, status: 'completed', assignedTo: null }
        : order
    ));
    setActiveOrder(null);
  };

  const OrderConfirmationModal = () => {
    if (!showConfirmation) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-xl font-bold mb-4">Confirm Order Assignment</h3>
          <p className="mb-4 text-gray-600">
            Are you sure you want to take order {selectedOrder?.id}? Once assigned, this order will be locked to you until completion.
          </p>
          <div className="flex justify-end gap-3">
            <button 
              className="px-4 py-2 rounded-lg border"
              onClick={() => {
                setShowConfirmation(false);
                setSelectedOrder(null);
              }}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 rounded-lg bg-blue-500 text-white"
              onClick={confirmTakeOrder}
            >
              Confirm & Take Order
            </button>
          </div>
        </div>
      </div>
    );
  };

  const OrderQueue = () => {
    const pendingOrders = orders.filter(order => order.status === 'pending');
    const inProgressOrders = orders.filter(order => 
      order.status === 'in-progress' && order.id !== activeOrder?.id
    );

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Order Queue</h2>
        {activeOrder ? (
          <Alert variant="info" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You already have an active order. Complete it before taking a new one.
            </AlertDescription>
          </Alert>
        ) : (
          <p className="text-gray-600 mb-4">Available orders: {pendingOrders.length}</p>
        )}

        <div className="space-y-6">
          {/* Pending Orders Section */}
          {pendingOrders.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Pending Orders</h3>
              {pendingOrders.map(order => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{order.id}</span>
                      <span className="text-gray-500">
                        <Clock size={16} className="inline mr-1" />
                        {order.timeReceived}
                      </span>
                    </div>
                    <button 
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        activeOrder 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                      onClick={() => !activeOrder && handleTakeOrder(order)}
                      disabled={!!activeOrder}
                    >
                      <UserCheck size={18} />
                      Take Order
                    </button>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Pizza size={16} className="text-gray-500" />
                        <span>{item.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* In Progress Orders Section */}
          {inProgressOrders.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">In Progress by Other Cooks</h3>
              {inProgressOrders.map(order => (
                <div key={order.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{order.id}</span>
                      <span className="text-gray-500">
                        <Clock size={16} className="inline mr-1" />
                        {order.timeReceived}
                      </span>
                    </div>
                    <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                      In Progress • {order.assignedTo}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Pizza size={16} className="text-gray-500" />
                        <span>{item.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const ActiveOrder = () => {
    if (!activeOrder) return (
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <Pizza size={48} className="mx-auto mb-4" />
          <p>No active order. Take an order from the queue to start cooking!</p>
        </div>
      </div>
    );

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Active Order: {activeOrder.id}</h2>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Timer className="text-gray-500" />
              Started: 15 mins ago
            </span>
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={completeOrder}
            >
              <CheckCircle2 size={20} />
              Mark as Complete
            </button>
          </div>
        </div>

        <Alert variant="info" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This order is now assigned to you. Other cooks cannot take it.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {activeOrder.items.map((item, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-3">{item.type}</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Ingredients:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {item.ingredients.map((ingredient, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-2 bg-gray-50 p-2 rounded"
                      >
                        <input type="checkbox" className="rounded" />
                        <span>{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {item.special && (
                  <div>
                    <h4 className="font-medium mb-2">Special Instructions:</h4>
                    <div className="bg-yellow-50 p-2 rounded">
                      {item.special}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CookStats = () => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChefHat size={24} className="text-gray-600" />
          <div>
            <h3 className="font-semibold">Your Stats Today</h3>
            <p className="text-sm text-gray-500">12 pizzas prepared</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Average Time</div>
            <div className="font-semibold">18 mins</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Orders Left</div>
            <div className="font-semibold">{orders.filter(o => o.status === 'pending').length}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <CookStats />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OrderQueue />
          <ActiveOrder />
        </div>
      </div>
      <OrderConfirmationModal />
    </div>
  );
};

export default PizzastelCook;
