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
    type: string;
}

export interface ForgotInterface {
    email: string;
}

export interface ResetPasswordInterface {
    resetToken: string;
    newPass: string;
    confirmPass: string;
}