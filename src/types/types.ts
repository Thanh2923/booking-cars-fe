// types.ts

export interface Category {
    _id: string;
    category_name: string;
  }
  
  export interface Car {
    _id: string;
    car_name: string;
    category_id: string; // ID của Category
    description: string;
    price_per_day: number;
    availability_status: boolean;
    image: string; // Đường dẫn tới ảnh xe
  }
  