import { Axios, AxiosRequestConfig } from 'axios';

export class Http {
  private readonly axios: Axios;

  constructor(baseURL: string) {
    this.axios = new Axios({
      transformResponse: (data) => {
        try {
          return JSON.parse(data);
        } catch (e) {
          return data;
        }
      },
      baseURL: baseURL,
      validateStatus: (status) => {
        return status < 400;
      },
    });
  }

  private wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  private defaultHeaders() {
    const token =
      sessionStorage.getItem('token') || localStorage.getItem('token');

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  public async request<T = any>(url: string, config: AxiosRequestConfig = {}) {
    if (config.data) {
      config.data = JSON.stringify(config.data);
    }

    config.url = url;

    config.headers = {
      ...this.defaultHeaders(),
      ...config.headers,
    };

    await this.wait(500);

    return this.axios.request<T>(config);
  }
}
