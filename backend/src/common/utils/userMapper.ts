import { UserDataDto } from "../../users/dto/response/userData.dto";
import { UserEntity } from "../../users/entity/users.entity";

export function userMapperToUserData(userEntity: UserEntity): UserDataDto {
    const user : UserDataDto = {
        id: userEntity.id,
        email: userEntity.email,
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        emailConfirm: userEntity.emailConfirm
    }
    return user
}