 export type Property = {
    id: number;
    images: Image[];
    title: string;
    description: string;
    location: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    status: 'For Sale' | 'For Rent';
    type: "House"| "Condo" | "Apartment"
}

type Image = {
    img: string
}




export type Product = {
    id: number
    image: string;
    name: string;
    price: string;
    orders: number;
    stock: number;
    amount: number;
  };