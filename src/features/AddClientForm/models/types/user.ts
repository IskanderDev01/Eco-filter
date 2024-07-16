export interface FieldType {
    name: string;
    address: string;
    phone: string;
    category_id: number;
    expiration_date?: string;
    created_at?: string;
    first_date?: string;
    second_date?: string;
}

export interface User {
    id: number;
    name: string;
    phone: string;
    address: string;
    description: string | null;
}
