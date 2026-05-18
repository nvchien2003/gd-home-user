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
    subscription?: UserSubscription | null;
    plan?: UserPlan | null;
    activePlan?: UserPlan | null;
}

export interface UserProfile {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    location?: string;
    avatar?: string;
}

export type SubscriptionStatus = 'active' | 'trialing' | 'expired' | 'canceled' | 'inactive';

export interface UserSubscription {
    id?: string;
    status?: SubscriptionStatus;
    expiresAt?: string | null;
    endDate?: string | null;
}

export interface UserPlan {
    id?: string;
    name?: string;
    isActive?: boolean;
    active?: boolean;
    expiresAt?: string | null;
}
