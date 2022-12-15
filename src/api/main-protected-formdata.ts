import HttpClientProtected from './http-client-protected';

export default class MainProtectedFormData extends HttpClientProtected {
  private static instanceCached: MainProtectedFormData;

  private constructor() {
    super(process.env.BASE_URL, 'multipart/form-data');
  }

  static getInstance = () => {
    if (!MainProtectedFormData.instanceCached) {
      MainProtectedFormData.instanceCached = new MainProtectedFormData();
    }

    return MainProtectedFormData.instanceCached;
  };

  public createPost(formData: FormData) {
    return this.instance.post('/posts', formData);
  }

  public editPost(id: number, formData: FormData) {
    return this.instance.patch(`/posts/${id}`, formData);
  }
}
