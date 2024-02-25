export class HttpService {
    async request(url, options) {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP request failed with status ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error('HTTP request error:', error);
            throw error;
        }
    }
}