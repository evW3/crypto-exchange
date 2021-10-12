export interface CreateUserAccountDto {
    email: string;
    password: string;
    password_salt: string;
}