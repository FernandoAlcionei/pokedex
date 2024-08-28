import jwt from 'jsonwebtoken';

export type UserInfo = {
  userId: string;
  name: string;
  lastname: string;
}

export const create = (userInfo: UserInfo): string => {
  const secretKey = process.env.SECRET_KEY as string;
  const options = {
    expiresIn: '8h',
  };

  return jwt.sign(userInfo, secretKey, options);
};
