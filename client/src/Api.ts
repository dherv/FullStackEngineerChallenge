export default class Api {
  static prefix = 'http://localhost:7000/api';

  static url(endpoint: string) {
    return `${this.prefix}${endpoint}`;
  }
  static headers(): Headers {
    const requestHeaders = new Headers({
      'Content-Type': 'application/json',
    });

    return requestHeaders;
  }

  static get(endpoint: string): Promise<any> {
    return fetch(this.url(endpoint), {
      method: 'GET',
      headers: this.headers(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  static post(endpoint: string, body: any): Promise<any> {
    return fetch(this.url(endpoint), {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.headers(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  static put(endpoint: string, body: any): Promise<any> {
    return fetch(this.url(endpoint), {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: this.headers(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  static delete(endpoint: string): Promise<any> {
    return fetch(this.url(endpoint), {
      method: 'DELETE',
      headers: this.headers(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
