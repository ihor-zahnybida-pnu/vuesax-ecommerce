import { StaticImageData } from "next/image";

export interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    rating?: number; 
    img: StaticImageData;
    category: string;
    brand: string;
}