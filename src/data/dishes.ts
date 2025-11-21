export type DishCategory = 'Mains' | 'Appetisers' | 'Desserts' | 'Drinks' | 'Other';

export interface Dish {
    id: string;
    name: string;
    category: DishCategory;
    image: string;
}

export const DISHES: Dish[] = [
    // Mains
    { id: 'roast-chicken', name: 'Roast Chicken', category: 'Mains', image: '/roast_chicken.png' },
    { id: 'roast-beef', name: 'Roast Beef', category: 'Mains', image: '/roast_beef.png' },
    { id: 'baked-ham', name: 'Baked Ham', category: 'Mains', image: '/baked_ham.png' },
    { id: 'meatballs', name: 'Meat Balls', category: 'Mains', image: '/meatballs.png' },
    { id: 'sweet-potatoes', name: 'Sweet Potatoes', category: 'Mains', image: '/sweet_potatoes.png' },
    { id: 'roast-vegetables', name: 'Roast Vegetables', category: 'Mains', image: '/roast_vegetables.png' },
    { id: 'greens', name: 'Greens', category: 'Mains', image: '/placeholder_food.png' },
    { id: 'brussel-sprouts', name: 'Brussel Sprouts', category: 'Mains', image: '/placeholder_food.png' },
    { id: 'stuffing', name: 'Stuffing', category: 'Mains', image: '/placeholder_food.png' },
    { id: 'roast-potato', name: 'Roast Potato', category: 'Mains', image: '/placeholder_food.png' },
    { id: 'salad', name: 'Salad', category: 'Mains', image: '/placeholder_food.png' },
    { id: 'mashed-potatoes', name: 'Mashed Potatoes', category: 'Mains', image: '/placeholder_food.png' },

    // Appetisers
    { id: 'goat-cheese-rolls', name: 'Goat Cheese & Fig Rolls', category: 'Appetisers', image: '/placeholder_food.png' },
    { id: 'cornbread', name: 'Cornbread', category: 'Appetisers', image: '/placeholder_food.png' },
    { id: 'cranberry-sauce', name: 'Cranberry Sauce', category: 'Appetisers', image: '/placeholder_food.png' },

    // Desserts
    { id: 'pumpkin-cookies', name: 'Pumpkin Cookies', category: 'Desserts', image: '/placeholder_food.png' },
    { id: 'tiramisu', name: 'Tiramisu', category: 'Desserts', image: '/placeholder_food.png' },
    { id: 'fruit-crumble', name: 'Fruit Crumble', category: 'Desserts', image: '/placeholder_food.png' },
    { id: 'pie', name: 'Pie', category: 'Desserts', image: '/placeholder_food.png' },
    { id: 'ice-cream', name: 'Ice Cream', category: 'Desserts', image: '/placeholder_food.png' },
    { id: 'apple-turnovers', name: 'Apple Turnovers', category: 'Desserts', image: '/placeholder_food.png' },

    // Drinks
    { id: 'wine', name: 'Wine', category: 'Drinks', image: '/placeholder_drink.png' },
    { id: 'beer', name: 'Beer', category: 'Drinks', image: '/placeholder_drink.png' },
    { id: 'non-alcoholic', name: 'Non-alcoholic', category: 'Drinks', image: '/soda.png' },
    { id: 'gluhwein', name: 'Glüwine', category: 'Drinks', image: '/gluhwein.png' },
    { id: 'sekt', name: 'Sekt', category: 'Drinks', image: '/sekt.png' },

    // Other
    { id: 'diapers', name: 'Diapers (No Cooking!)', category: 'Other', image: '/diapers.png' },
];
