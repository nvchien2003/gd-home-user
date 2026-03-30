export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    role: 'user' | 'admin';
    verify: boolean;
}

export interface UserProfile {
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
}