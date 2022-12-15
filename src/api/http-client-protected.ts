import { AxiosRequestConfig } from 'axios';
import TokensLocalStorage from '@/utils/local-storage/TokensLocalStorage';
import HttpClient from '@/api/http-client';

export default abstract class HttpClientProtected extends HttpClient {
  public constructor(baseURL: string | undefined, contentType = 'application/json') {
    super(baseURL, contentType);

    this.initializeRequestInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    const storage = TokensLocalStorage.getInstance();
    const token = storage.getAccessToken();

    const modifiedConfig = config;

    modifiedConfig.headers.Authorization = `Bearer ${token}`;

    return config;
  };
}
