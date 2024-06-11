import jwtDecode from 'jwt-decode';
import { KeyedObject } from 'src/types';

interface TokenObject {
    access?: string;
    refresh?: string;
}

class TokenService {
    public accessTokenKey = 'accessToken';

    public refreshTokenKey = 'refreshToken';

    public setToken(tokenObj: TokenObject): void {
        if (tokenObj.access) {
            localStorage.setItem(this.accessTokenKey, tokenObj.access);
        }
        if (tokenObj.refresh) {
            localStorage.setItem(this.refreshTokenKey, tokenObj.refresh);
        }
    }

    public getAccessToken(): string | null {
        return localStorage.getItem(this.accessTokenKey);
    }

    public getRefreshToken(): string | null {
        return localStorage.getItem(this.refreshTokenKey);
    }

    private getTokenValidity(token: string): boolean {
        const decoded: KeyedObject = jwtDecode(token);
        return decoded.exp > Date.now() / 1000;
    }

    public getAccessTokenValidity(): boolean | null {
        const accessToken = this.getAccessToken();
        if (accessToken) {
            return this.getTokenValidity(accessToken);
        }
        return null;
    }

    public getRefreshTokenValidity(): boolean | null {
        const refreshToken = this.getRefreshToken();
        if (refreshToken) {
            return this.getTokenValidity(refreshToken);
        }
        return null;
    }

    public clearToken(): void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }
}

export default TokenService;
