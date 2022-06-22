import { UserEntity } from "../../users/entity/users.entity";
import * as jwtService from 'jsonwebtoken';
import { userMapperToUserData } from "../../common/utils/userMapper";
import { Repository, DeepPartial } from "typeorm";
import { LoginDto } from "../../users/dto/login.dto";
import * as bcrypt from "bcryptjs";
import { configService } from '../../config/config.service';
import { UserAuthDto } from "../../users/dto/response/userAuth.dto";
import { ServerError } from "../../config/server-errors";

export class AuthService {

    private jwtConstants = {
        secret: configService.getValue('JWT_ACCESS_TOKEN_SECRET_KEY'),   
        secretExpiry: configService.getValue('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        refreshToken: configService.getValue('JWT_REFRESH_TOKEN_SECRET_KEY'),        
        refreshTokenExpiry: configService.getValue('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    }

    constructor(private readonly usersService: Repository<UserEntity>) {}


    async validateUser(payload: DeepPartial<UserEntity> ): Promise<UserEntity> {
        const user = await this.usersService.findOneBy({email: payload.email});
        if (!user) {
            throw new ServerError('Unauthorize', 401)
        }
        return user;
    }

    async login(loginUserDto: LoginDto): Promise<UserAuthDto> {
        let user: UserEntity = await this.usersService.findOneBy({email: loginUserDto.email});
        if (user && bcrypt.compareSync(loginUserDto.password, user.password)) {
            const access_token = await this.createToken(user);
            const refreshToken = await this.createRefreshToken(user);
            return {
                id: user.id,
                email: user.email, 
                token: access_token.accessToken, 
                expireToken: access_token.expiresIn, 
                firstName: user.firstName, 
                lastName: user.lastName,
                refreshToken: refreshToken,
                emailConfirm: user.emailConfirm
            };
        }
        throw new ServerError('Unauthorize', 401)
    }

    async refresh(refreshToken: string): Promise<UserAuthDto> {
        jwtService.verify(refreshToken,{secret: this.jwtConstants.refreshToken})
        const tokenDecoded = await jwtService.decode(refreshToken);
        let user = await this.usersService.findOneBy({id: tokenDecoded["id"]});
        if (user.refreshToken === refreshToken ) {
            const access_token = await this.createToken(user);
            const refreshToken = await this.createRefreshToken(user);
            return {
                id: user.id,
                email: user.email, 
                token: access_token.accessToken, 
                expireToken: access_token.expiresIn,
                firstName: user.firstName, 
                lastName: user.lastName, 
                refreshToken: refreshToken,
                emailConfirm: user.emailConfirm
            };
        }
        throw new ServerError('Unauthorize', 401)
    }

    async createToken(user: UserEntity): Promise<any> {
        const expiresIn = this.jwtConstants.secretExpiry;
        const userData = await userMapperToUserData(user)
        const accessToken = await jwtService.sign(userData, this.jwtConstants.secret, {expiresIn: expiresIn});
        return {
            expiresIn,
            accessToken,
        };
    }

    async createRefreshToken(user: UserEntity): Promise<string> {
        const expiresIn = this.jwtConstants.refreshTokenExpiry;
        const userData = await userMapperToUserData(user)
        const refreshTokenCreated = await jwtService.sign(userData, this.jwtConstants.refreshToken, {expiresIn: expiresIn});
        user.refreshToken = refreshTokenCreated;
        const userUpdate = await this.usersService.save(user);
        return userUpdate.refreshToken
    }
}