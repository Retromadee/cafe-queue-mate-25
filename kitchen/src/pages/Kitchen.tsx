import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CheckCircle, ChefHat } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import type { Order } from '../types/menu';
import axios from 'axios';

const Kitchen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders/kitchen');
      setOrders(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId: number, status: Order['status']) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${orderId}/status`, { status });
      toast({
        title: "Success",
        description: `Order #${orderId} marked as ${status}`,
      });
      fetchOrders();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] p-8">
      <div className="container max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ChefHat className="h-8 w-8 text-[#9b87f5]" />
            <h1 className="text-3xl font-bold text-white">Kitchen Dashboard</h1>
          </div>
          <div className="bg-[#6E59A5] px-4 py-2 rounded-lg">
            <span className="text-white font-medium">Active Orders: {orders.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="bg-[#2A2F3C] border-[#7E69AB] border text-white">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Order #{order.queueNumber}</h3>
                    <p className="text-sm text-[#8E9196]">
                      {new Date(order.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'ready' ? 'bg-green-500/20 text-green-300' :
                    order.status === 'preparing' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-[#1A1F2C] p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#7E69AB] text-white px-2 py-1 rounded-md text-sm">
                          {item.quantity}x
                        </span>
                        <span>{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#7E69AB]">
                  {order.status === 'pending' && (
                    <Button 
                      className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                    >
                      Start Preparing
                    </Button>
                  )}
                  {order.status === 'preparing' && (
                    <Button 
                      className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Ready
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kitchen;