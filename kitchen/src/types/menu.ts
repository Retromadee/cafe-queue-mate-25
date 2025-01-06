export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: number;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'ready';
  queueNumber: number;
  totalAmount: number;
  timestamp: string;
}