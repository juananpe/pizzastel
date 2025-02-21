import React, { useState } from 'react';
import { 
  Search, 
  Pizza, 
  Plus, 
  Minus, 
  ShoppingCart, 
  AlertCircle,
  Printer,
  Trophy,
  ChefHat
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PizzastelFOE = () => {
  const [currentStep, setCurrentStep] = useState('customer-verification');
  const [customerFound, setCustomerFound] = useState(false);
  const [searchType, setSearchType] = useState('address');
  const [order, setOrder] = useState({
    pizzas: [],
    beverages: [],
    total: 0
  });
  
  // Mock data
  const ingredients = [
    { id: 1, name: 'Tomato', price: 1, inStock: true },
    { id: 2, name: 'Mozzarella', price: 2, inStock: true },
    { id: 3, name: 'Ham', price: 2.5, inStock: false },
    { id: 4, name: 'Mushrooms', price: 1.5, inStock: true },
    { id: 5, name: 'Olives', price: 1, inStock: true }
  ];

  const beverages = [
    { id: 1, name: 'Cola', price: 2, inStock: true },
    { id: 2, name: 'Sprite', price: 2, inStock: true },
    { id: 3, name: 'Water', price: 1, inStock: true }
  ];

  const CustomerVerification = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Customer Verification</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <select 
            className="p-2 border rounded"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="address">Address</option>
            <option value="phone">Phone Number</option>
            <option value="dni">Identity Card (DNI)</option>
          </select>
          <div className="flex-1 relative">
            <input 
              type="text" 
              className="w-full p-2 border rounded pl-10" 
              placeholder={`Enter customer ${searchType}`}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setCustomerFound(true);
              setCurrentStep('order-creation');
            }}
          >
            Verify Customer
          </button>
        </div>
      </div>
    </div>
  );

  const OrderCreation = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Create Order</h2>
        
        {/* Pizza Builder */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-semibold">Add Pizza</h3>
          <div className="flex gap-4 mb-4">
            <select className="p-2 border rounded">
              <option value="regular">Regular - €8</option>
              <option value="medium">Medium - €10</option>
              <option value="large">Large - €12</option>
            </select>
            <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2">
              <Plus size={20} />
              Add Pizza
            </button>
          </div>
          
          {/* Ingredients Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ingredients.map(ingredient => (
              <div 
                key={ingredient.id} 
                className={`p-4 border rounded flex justify-between items-center
                  ${!ingredient.inStock ? 'bg-gray-100 opacity-60' : ''}`}
              >
                <span>{ingredient.name} (€{ingredient.price})</span>
                {!ingredient.inStock ? (
                  <span className="text-red-500 text-sm">Out of stock</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <button className="p-1 rounded-full border">
                      <Minus size={16} />
                    </button>
                    <span>0</span>
                    <button className="p-1 rounded-full border">
                      <Plus size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Beverages */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Add Beverages</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {beverages.map(beverage => (
              <div 
                key={beverage.id}
                className="p-4 border rounded flex justify-between items-center"
              >
                <span>{beverage.name} (€{beverage.price})</span>
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded-full border">
                    <Minus size={16} />
                  </button>
                  <span>0</span>
                  <button className="p-1 rounded-full border">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="text-xl font-bold">Total: €0.00</div>
        </div>
        
        <Alert variant="warning" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Minimum order amount is €10.00
          </AlertDescription>
        </Alert>

        <button 
          className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          onClick={() => setCurrentStep('payment')}
        >
          <ShoppingCart size={20} />
          Proceed to Payment
        </button>
      </div>
    </div>
  );

  const ActionBar = () => (
    <div className="bg-white shadow-lg border-t fixed bottom-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
              onClick={() => setCurrentStep('reports')}
            >
              <Printer size={20} />
              Daily Cook Report
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
              onClick={() => setCurrentStep('customer-month')}
            >
              <Trophy size={20} />
              Customer of the Month
            </button>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat size={20} className="text-gray-600" />
            <span className="text-sm text-gray-600">Active Orders: 3</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto p-4">
        {currentStep === 'customer-verification' && <CustomerVerification />}
        {currentStep === 'order-creation' && <OrderCreation />}
      </div>
      <ActionBar />
    </div>
  );
};

export default PizzastelFOE;
