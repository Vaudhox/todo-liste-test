import {NextFunction, Request, Response} from "express"; 
import  DB from "../../common/database";
import { UserEntity } from "../entity/users.entity";
import { UserCreateDto } from "./dto/userCreate.dto"

export default class UserController {

    private userRepository;

    constructor(){
        this.userRepository = DB.getUserRepository()
    }
   
    async all(request: Request, response: Response, next: NextFunction) { 
      return await this.userRepository.find(); 
    }

    async create(request: Request, response: Response, next: NextFunction) {
        
        try {
            const userDto: UserCreateDto = request.body

            const user = new UserEntity()
            user.email = userDto.email
            user.firstName = userDto.firstName
            user.lastName = userDto.lastName
            user.password = userDto.password // crypt le passs


            const userCreate: UserEntity = await this.userRepository.save(user);
            
            response.send(userCreate);
        } catch (err) {
            response.status(400).send();
        }
    }
    
}
