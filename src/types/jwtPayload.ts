export type JwtPayload = {
  userName: string;
  shopName: string[];
  iat: number;
  exp: number;
};
