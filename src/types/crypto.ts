import { UserProfile } from './user';

export type Token = {
    name: string;
    symbol: string;
    balance: number;
    sell_price: number;
    buy_price: number;
    icon: string;
    type: 'ERC20' | 'BEP20' | 'TRC20' | string;
    contract: string;
    id: number;
};

export type DepositDefaultType = {
    depositAddress: string;
    selectedToken: Token | null;
};

export interface TokenStateProps {
    tokenList: Token[];
    userTokenList: Token[];
    isLoading: Boolean;
    error: object | string | null;
    refresh: boolean;
}

export type TransferTokenProps = {
    receiver_email: string;
    token_id: number;
    amount: number;
};

export type SwapTokenProps = {
    send_token_id: number;
    send_amount: number;
    get_token_id: number;
};

export type WithdrawTokenProps = {
    withdraw_addr: string;
    token_id: number;
    amount: number;
    direct: boolean;
};

export type TokenSelectOptionType = {
    label: string;
    value: string;
    icon: string;
};

export type TokenPayoutType = {
    user: UserProfile;
    get_token: Token;
    get_amount: number;
    timestamp: string;
};

export type WithdrawListType = {
    id: number;
    user: UserProfile;
    token: Token;
    amount: number;
    timstamp: string;
    status: number;
};
