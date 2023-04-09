export interface IAuthBaseRequestParams {
  email: string;
  password: string;
}

export interface IAuthBaseResponse {
  accessToken: string;
  refreshToken: string;
  type?: string; // 'BEARER'
}

export interface IAuthRegisterRequestParams extends IAuthBaseRequestParams {
  firstname: string;
  lastname: string;
}

export interface IAuthUpdateAccessTokenRequestParams {
  refreshToken: string;
}
