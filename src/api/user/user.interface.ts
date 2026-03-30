export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
    role: 'user' | 'admin';
    verify: boolean;
}

export interface UserProfile {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    location?: string;
    avatar?: string;
}