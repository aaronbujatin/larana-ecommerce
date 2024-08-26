import { ProductSize } from "./product-size.model";

export interface Product {

    id?:string;
    name?: string;
    description?: string;
    brand?: string;
    category?: string;
    price?: number;
    details?: string[]
    productSizes?: ProductSize[];
    imageUrl: string[];

}
