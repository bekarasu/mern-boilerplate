declare namespace Express {
  export interface Response {
    message: string | object;
    data: object | null;
    customResponse: (data?: object | null) => this;
    setRedirect: (redirectUrl: string) => this;
    setMessage: (message: string | object) => this;
  }
}
