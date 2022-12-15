import axios, { AxiosInstance, AxiosResponse } from 'axios';
import TokensLocalStorage from '@/utils/local-storage/TokensLocalStorage';
import Main from '@/api/main';
import store from '@/store';
import { setErrorMessage } from '@/store/actions/errors';

abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string | undefined, contentType = 'application/json') {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      },
    });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.handleSuccessResponse, this.handleResponseError);
  };

  private handleSuccessResponse = ({ data }: AxiosResponse) => data;

  private handleResponseError = async (e: any): Promise<any> => {
    const status = e.response ? e.response.status : null;
    const tokens = TokensLocalStorage.getInstance();
    const main = Main.getInstance();
    const currentRefreshToken = tokens.getRefreshToken();
    const errors = ['jwt malformed', 'jwt expired'];
    if (errors.indexOf(e.response.data.toLowerCase()) === -1) {
      store.dispatch<any>(setErrorMessage(e.response.data));
    }
    if (status === 401 && currentRefreshToken) {
      try {
        const { accessToken, refreshToken } = await main
          .refresh({ refreshToken: currentRefreshToken });
        tokens.setAccessToken(accessToken);
        tokens.setRefreshToken(refreshToken);
        e.config.headers.Authorization = `Bearer ${accessToken}`;
        const { data } = await axios.request(e.config);
        return data;
      } catch (_) {
        tokens.clear();
        return Promise.reject(e);
      }
    }
    return Promise.reject(e);
  };
}

export default HttpClient;
