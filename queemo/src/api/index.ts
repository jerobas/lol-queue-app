import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiService {
  private apiClient: AxiosInstance;

  constructor(port: number, password: string) {
    const token = btoa(`riot:${password}`);

    this.apiClient = axios.create({
      baseURL: `https://127.0.0.1:${port}`,
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
    //   httpsAgent: new https.Agent({
    //     rejectUnauthorized: false,
    //   }),
    });
    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor() {
    this.apiClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            default:
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.apiClient.get<T>(url, config);
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.apiClient.post<T>(url, data, config);
  }
}

export default ApiService;
