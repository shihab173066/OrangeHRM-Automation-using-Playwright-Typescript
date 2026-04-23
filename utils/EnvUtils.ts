// utils/EnvUtils.ts

export class EnvUtils {
    static getBaseUrl(): string {
        const url = process.env.BASE_URL?.trim();
        if (!url) throw new Error('BASE_URL is missing in your .env file');
        return url;
    }

    static getCredentials() {
        // Change process.env.USERNAME to process.env.APP_USERNAME
        const username = process.env.APP_USERNAME?.trim();
        const password = process.env.PASSWORD?.trim();
        
        console.log(`---> DEBUG: The Username is: ${username}`);
        console.log(`---> DEBUG: The Password is: ${password}`);
        
        if (!username || !password) {
            throw new Error('APP_USERNAME or PASSWORD missing in your .env file');
        }
        
        return { username, password };
    }
}