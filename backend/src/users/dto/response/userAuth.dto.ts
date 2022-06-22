import { UserDataDto } from "./userData.dto";

export interface UserAuthDto extends UserDataDto {
    token: string; 
    expireToken: string;
    refreshToken: string;
  }