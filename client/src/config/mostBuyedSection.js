import cheeseBurgerImg from "/src/assets/images/Cheese Burger.png";
import frenchFriesImg from "/src/assets/images/French Fries.png";
import chickenNuggetsImg from "/src/assets/images/Chicken Nuggets.png";

export const mostBuyedProducts = [
  {
    productId: 3,
    name: "Cheese Burger",
    imageUrl: cheeseBurgerImg,
    description: "Our #1 bestseller, juicy beef patty with melted cheddar.",
    ingredients: ["Beef", "Cheddar", "Ketchup", "Mustard", "Mayonnaise", "Lettuce", "Tomato", "Onion"],
    diets: ["Vegetarian", "Vegan"],
    cost: 8.99,
    orders: 1200,
    rank: 1,
    bgColor: "white",
  },
  {
    productId: 1,
    name: "Crispy Fries",
    imageUrl: frenchFriesImg,
    ingredients: ["Potato", "Oil", "Salt", "Pepper"],
    diets: ["Vegetarian", "Vegan"],
    description: "Golden, crispy perfection, perfectly seasoned.",
    cost: 3.99,
    orders: 980,
    rank: 2,
    bgColor: "white",
  },
  {
    productId: 2,
    name: "Chicken Nuggets",
    imageUrl: chickenNuggetsImg,
    description: "Crispy on the outside, tender on the inside.",
    ingredients: ["Chicken", "Breading", "Salt", "Pepper"],
    diets: ["Vegetarian", "Vegan"],
    cost: 6.99,
    orders: 875,
    rank: 3,
    bgColor: "white",
  },
];
