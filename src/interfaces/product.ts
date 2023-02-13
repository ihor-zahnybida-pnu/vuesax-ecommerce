export interface Product {
    id: string;
    images: string[];
    title: string;
    category: string;
    brand: string;
    rating?: number; 
    price: number;
}