export interface IProductOptionValue {
    label: string;
    value: string;
    image?: string;
}

export interface IProductOption {
    title: string;
    type: 'text' | 'image';
    values: IProductOptionValue[];
}

export interface IProduct {
    id: number | string;
    title: string;
    price: string | number;
    images?: string[]; // Main source of images. index 0 is cover.
    image?: string; // Deprecated, kept for backward compat or fallback
    rating?: string | number;
    discountText?: string;
    extraDrop?: string;
    originalPrice?: string | number;
    sold?: number;
    options?: IProductOption[];
}

export interface ICartItem {
    id: number | string;
    name: string; // Product title mapped to name often
    price: number;
    originalPrice?: number;
    image: string;
    quantity: number;
    variant?: string;
    isSelected?: boolean;
}

export interface IUser {
    id: string; // Firebase UID
    name: string;
    email: string;
    avatar?: string;
}

export interface IOrder {
    id?: string;
    items: ICartItem[];
    total: number;
    createdAt: Date;
    status: 'pending' | 'completed';
}

export interface ICategory {
    id: number | string;
    name: string;
    slug: string;
    icon?: string;
}

export interface IReview {
    id: string;
    productId: string | number;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: Date;
}
