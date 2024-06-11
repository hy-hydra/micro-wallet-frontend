import { Token } from './crypto';

export type UserProfile = {
    id: number;
    username: string;
    email: string;
    is_superuser: boolean;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_active: boolean;
    birth_date: string;
    country: string;
    city: string;
    postal_code: string;
    present_address: string;
    deposit_addr: string;
    otp_enabled: boolean;
    otp_verified: boolean;
    otp_base32: string;
    otp_auth_url: string;
    refer_count: number;
    refer_enabled: boolean;
    referral_code: string;
    tier_level: number;
    created_at: string;
    updated_at: string;
    last_login: string;
    rewards?: number;
};

type BuyIQDTType = {
    get_amount: number;
    timestamp: string;
};

export type UserDetailType = {
    user: UserProfile;
    rewards?: number;
    user_token: Token[];
};

export type SimpleUserType = {
    id: number | undefined;
    username: string;
};

export type UserReferralType = {
    id: number;
    username: string;
    referral_code: string;
    iqdt_payout: string;
    children_iqdt_payout: string;
    date: string;
};
