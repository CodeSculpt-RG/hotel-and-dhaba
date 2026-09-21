export type MenuItem = { name: string; description: string; price: string; dietaryTags?: string[]; featured?: boolean }
export type MenuCategory = { category: string; items: MenuItem[] }

export const restaurant = {
  restaurantName: 'Aman Dhaba',
  tagline: 'Fire. Flavour. Heart.',
  description: 'A contemporary celebration of North Indian dhaba cooking, made with honest ingredients, live fire and wholehearted hospitality.',
  address: '',
  phone: '',
  email: '',
  reservationUrl: '',
  orderUrl: '',
  googleMapsUrl: '',
  instagramUrl: '',
  facebookUrl: '',
  hours: [] as string[],
}

export const menu: MenuCategory[] = [
  { category: 'Starters', items: [
    { name: 'Aloo Samosa', description: 'Crisp pastry, spiced potato, peas and house chutneys.', price: '₹220', dietaryTags: ['V'] },
    { name: 'Amritsari Fish', description: 'Ajwain, gram flour and a bright mint chutney.', price: '₹480', featured: true },
    { name: 'Masala Papad', description: 'Roasted papad, tomato, onion, chilli and lime.', price: '₹160', dietaryTags: ['V', 'GF'] },
  ]},
  { category: 'Chaat', items: [
    { name: 'Papdi Chaat', description: 'Yoghurt, tamarind, mint and crisp papdi.', price: '₹260', dietaryTags: ['V'] },
    { name: 'Dahi Ke Kebab', description: 'Hung curd, green chilli and toasted spices.', price: '₹360', dietaryTags: ['V'] },
  ]},
  { category: 'From the Tandoor', items: [
    { name: 'Aman Dhaba Tandoori Chicken', description: 'Charred over live fire with yoghurt, Kashmiri chilli and kasuri methi.', price: '₹620', featured: true },
    { name: 'Malai Chicken Tikka', description: 'Cream, cardamom, black pepper and aged cheddar.', price: '₹560' },
    { name: 'Tandoori Soya Chaap', description: 'Smoky soya, yoghurt, mustard oil and lemon.', price: '₹420', dietaryTags: ['V'] },
  ]},
  { category: 'Vegetarian', items: [
    { name: 'Dal Aman', description: 'Black lentils simmered overnight with tomato and cultured butter.', price: '₹390', dietaryTags: ['V', 'GF'], featured: true },
    { name: 'Kadai Paneer', description: 'Cottage cheese, peppers, tomato and crushed coriander.', price: '₹460', dietaryTags: ['V', 'GF'] },
    { name: 'Seasonal Saag', description: 'Slow-cooked greens, garlic and hand-churned butter.', price: '₹390', dietaryTags: ['V', 'GF'] },
  ]},
  { category: 'Curries', items: [
    { name: 'Old Road Butter Chicken', description: 'Tandoori chicken, tomato, fenugreek and butter.', price: '₹560', featured: true },
    { name: 'Dhaba Mutton', description: 'Slow-cooked goat, browned onion and whole spices.', price: '₹640', dietaryTags: ['GF'] },
    { name: 'Home-Style Chicken Curry', description: 'Bone-in chicken, tomato, ginger and warming garam masala.', price: '₹520', dietaryTags: ['GF'] },
  ]},
  { category: 'Biryani & Rice', items: [
    { name: 'Dum Chicken Biryani', description: 'Saffron basmati, browned onion, mint and raita.', price: '₹540', dietaryTags: ['GF'] },
    { name: 'Subz Biryani', description: 'Seasonal vegetables, aromatic rice and smoked yoghurt.', price: '₹440', dietaryTags: ['V', 'GF'] },
  ]},
  { category: 'Indian Breads', items: [
    { name: 'Butter Naan', description: 'Tandoor-baked and brushed with cultured butter.', price: '₹110', dietaryTags: ['V'] },
    { name: 'Garlic Chilli Naan', description: 'Roasted garlic, green chilli and coriander.', price: '₹140', dietaryTags: ['V'] },
    { name: 'Tandoori Roti', description: 'Whole wheat flatbread from the clay oven.', price: '₹90', dietaryTags: ['VE'] },
  ]},
  { category: 'Desserts', items: [
    { name: 'Gulab Jamun', description: 'Warm milk dumplings, saffron syrup and pistachio.', price: '₹240', dietaryTags: ['V'] },
    { name: 'Matka Kulfi', description: 'Reduced milk, cardamom and toasted nuts.', price: '₹280', dietaryTags: ['V', 'GF'] },
  ]},
]

export const drinks: MenuCategory[] = [
  { category: 'House Coolers', items: [
    { name: 'Aam Panna', description: 'Raw mango, roasted cumin, mint and lime.', price: '₹220', dietaryTags: ['VE', 'GF'] },
    { name: 'Nimbu Shikanji', description: 'Fresh lemon, black salt and cracked pepper.', price: '₹180', dietaryTags: ['VE', 'GF'] },
    { name: 'Rose & Basil Spritz', description: 'Rose, sweet basil, citrus and sparkling water.', price: '₹240', dietaryTags: ['VE', 'GF'] },
  ]},
  { category: 'Lassi', items: [
    { name: 'Classic Sweet Lassi', description: 'Churned yoghurt and cardamom.', price: '₹220', dietaryTags: ['V', 'GF'] },
    { name: 'Mango Lassi', description: 'Mango, yoghurt and saffron.', price: '₹260', dietaryTags: ['V', 'GF'] },
  ]},
  { category: 'Chai & Coffee', items: [
    { name: 'Dhaba Masala Chai', description: 'Assam tea, ginger, cardamom and milk.', price: '₹140', dietaryTags: ['V'] },
    { name: 'South Indian Filter Coffee', description: 'Dark roast coffee with hot frothy milk.', price: '₹170', dietaryTags: ['V'] },
  ]},
]

export const reviews = [
  { source: 'Preview copy — replace with verified review', author: 'Guest name pending', text: 'The kind of table where one more naan becomes three and no one is in a hurry to leave.', rating: 5, placeholder: true },
  { source: 'Preview copy — replace with verified review', author: 'Guest name pending', text: 'Warm hospitality, bold spices and tandoor smoke in every bite. It feels both nostalgic and new.', rating: 5, placeholder: true },
  { source: 'Preview copy — replace with verified review', author: 'Guest name pending', text: 'A generous, joyful meal made for sharing with the people you love.', rating: 5, placeholder: true },
]

export const specials = [
  { title: 'Tandoor Thursdays', description: 'A rotating chef selection from the live-fire kitchen, served with breads and seasonal chutneys.', day: 'Every Thursday', time: 'Dinner service', image: '/images/aman-dhaba/food/feast.webp' },
  { title: 'Sunday Dhaba Lunch', description: 'A leisurely family-style spread inspired by road trips, roadside kitchens and long Sunday afternoons.', day: 'Every Sunday', time: 'Lunch service', image: '/images/aman-dhaba/hero/hero.webp' },
]
