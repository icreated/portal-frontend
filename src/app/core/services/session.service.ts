import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
/**
 * Session storage service
 * Provides methods to get, set, remove, clear session storage items.
 */
export class SessionService {
    /**
     * set session storage item
     */
    setItem(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * get session storage item
     */
    getItem(key: string): any {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    /**
     * remove session storage item
     */
    removeItem(key: string) {
        sessionStorage.removeItem(key);
    }

    /**
     * remove all session storage items
     */
    clear() {
        sessionStorage.clear();
    }

}
