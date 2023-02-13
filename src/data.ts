import { Item } from "./interfaces/Item";
import phone from './assets/img/phone.jpg';

export const items: Item[] = [
    {
        id: '1',
        name: 'Apple watch series 4 GPS',
        description: 'Redesign from scratch',
        price: 399,
        currency: '$',
        rating: 3.4, 
        img: phone,
        category: 'cell_phone',
        brand: 'apple'
    },
    {
        id: '2',
        name: 'Apple Macbook pro 512GB SSD',
        description: 'Redesign from scratch',
        price: 2499,
        currency: '$',
        rating: 4.5,
        img: phone,
        category: 'computers',
        brand: 'apple'
    },
    {
        id: '3',
        name: 'JBL Speaker',
        description: 'Redesign from scratch',
        price: 199,
        currency: '$',
        img: phone,
        category: 'audio',
        brand: 'jbl'
    },
    {
        id: '4',
        name: 'Samsung Galaxy S22',
        description: 'Redesign from scratch',
        price: 1199,
        currency: '$',
        rating: 4, 
        img: phone,
        category: 'cell_phone',
        brand: 'samsung'
    },
    {
        id: '5',
        name: 'Beats Headphone',
        description: 'Redesign from scratch',
        price: 459,
        currency: '$',
        rating: 3.4, 
        img: phone,
        category: 'audio',
        brand: 'beats'
    },
];