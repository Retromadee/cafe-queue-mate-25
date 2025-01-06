import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CheckCircle } from 'lucide-react';
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
    const interval = setInterval(fetchOrders, 30000); // Refresh every 30 seconds
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
    <div className="min-h-screen bg-background p-8">
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Kitchen Orders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">Order #{order.queueNumber}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'ready' ? 'bg-green-100 text-green-800' :
                  order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-bold">Total: ${order.totalAmount.toFixed(2)}</span>
                {order.status === 'pending' && (
                  <Button onClick={() => updateOrderStatus(order.id, 'preparing')}>
                    Start Preparing
                  </Button>
                )}
                {order.status === 'preparing' && (
                  <Button onClick={() => updateOrderStatus(order.id, 'ready')}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Ready
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kitchen;