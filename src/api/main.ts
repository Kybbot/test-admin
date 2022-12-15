import HttpClient from './http-client';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

class Main extends HttpClient {
  private static instanceCached: Main;

  private constructor() {
    super(process.env.BASE_URL);
  }

  static getInstance = () => {
    if (!Main.instanceCached) {
      Main.instanceCached = new Main();
    }

    return Main.instanceCached;
  };

  public login = (data: {}) => this.instance.post<LoginResponse>('/login', data);

  public refresh = (data: {refreshToken: string}) => this.instance.post<LoginResponse>('/login/refresh', data);
}

export default Main;
