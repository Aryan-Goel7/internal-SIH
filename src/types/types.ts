export type THttpResponse = {
  success: boolean;
  statusCode: Number;
  request: {
    ip?: string | null;
    method: string;
    url: string;
  };
  message: string;
  data: unknown;
};

export type THttpError = {
  success: boolean;
  statusCode: number;
  request: {
    ip?: string | null;
    method: string;
    url: string;
  };
  message: string;
  data: unknown;
  trace?: object | null;
};

export type TUser = {
  name: string;
  _id: string;
};

export type TSheet = {
  id: number;
  path: string;
  tmp_path: string;
  name: string;
  owner: number;
  created_at: string;
  modified_at: string;
  access?: { editor?: TUser[]; viewer?: TUser[] };
};

