import { MenuItem } from "../types/menu";

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Juicy beef patty with fresh lettuce and tomatoes",
    price: 5.99,
    category: "Main Course",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Caesar Salad",
    description: "Crispy romaine lettuce with parmesan and croutons",
    price: 4.99,
    category: "Salads",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "French Fries",
    description: "Crispy golden fries with sea salt",
    price: 2.99,
    category: "Sides",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with walnuts",
    price: 3.99,
    category: "Desserts",
    image: "/placeholder.svg"
  }
];

export const categories = [...new Set(menuItems.map(item => item.category))];