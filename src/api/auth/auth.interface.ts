export type AuthVerificationType = 'RESET' | 'SIGN_UP';

export interface LoginInterface {
    email: string;
    password: string;
}

export interface SignUpInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface VerifyInterface {
    email: string;
    code: string;
    type: AuthVerificationType;
}

export interface ForgotInterface {
    email: string;
}

export interface ResetPasswordInterface {
    resetToken: string;
    newPass: string;
    confirmPass: string;
}