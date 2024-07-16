export interface UserEdit {
    id?: number | undefined;
    name: string | undefined;
    phone: string | undefined;
    address: string | undefined;
    description: string | null | undefined;
}
export interface UserResponse {
    user: UserEdit;
}
