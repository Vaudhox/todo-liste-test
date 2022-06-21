import  DB from "../../common/database";
import { UserEntity } from "../entity/users.entity";
import { UserCreateDto } from "../dto/userCreate.dto"
import * as bcrypt from "bcryptjs";
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Tags,
    Route,
    SuccessResponse,
    Response,
    Example,
    Middlewares,
    Security,
    Request
  } from "tsoa";
import { UserDataDto } from "../dto/response/userData.dto";
import { CheckEmailDto } from "../dto/checkEmail.dto";
import { userMapperToUserData } from "../../common/utils/userMapper";
import { sendEmailCheckEmail } from "../../common/services/mailer";
import * as uuid4 from "uuid4";
import { AskCheckEmailDto } from "../dto/askCheckEmail.dto"
import { LoginDto } from "../dto/login.dto";
import { AuthService } from "../../common/services/auth";
import { UserAuthDto } from "../dto/response/userAuth.dto";
import { ServerError } from "../../config/server-errors";

@Route("/")
@Tags('User')
export class UserController extends Controller {

    private userRepository;
    private authService;

    constructor(){
        super()
        this.userRepository = DB.getUserRepository()
        this.authService = new AuthService(this.userRepository)
    }
   
  /*  @Get("users")
    @SuccessResponse("200") // Custom success response
    @Example<UserDataDto[]>([{
        id: "46638910-ae86-42be-bc6e-b5bc8ae76592",
        email: "test",
        emailConfirm: false,
        firstName: "azea",
        lastName: "azaza"
      }])
    async all(): Promise<UserDataDto[]> {
        const users = await this.userRepository.find()
        const usersDto = users.map(user => userMapperToUserData(user))
        return usersDto; 
    }

    */
    @Post("/register")
    @SuccessResponse("201", "Created") // Custom success response
    @Example<UserDataDto>({
        id: "46638910-ae86-42be-bc6e-b5bc8ae76592",
        email: "test",
        emailConfirm: false,
        firstName: "azea",
        lastName: "azaza"
      })
    async create( @Body() userDto: UserCreateDto): Promise<UserDataDto> {
        try {
            var token = uuid4();
            const user = new UserEntity()
            const passwordEncoded = await bcrypt.hashSync(userDto.password, 12);
            user.email = userDto.email
            user.firstName = userDto.firstName
            user.lastName = userDto.lastName
            user.password = passwordEncoded
            user.tokenCheckYourEmail = token
            user.emailCheckYourEmailAt = new Date()
            const userCreate: UserEntity = await this.userRepository.save(user);
            await sendEmailCheckEmail(userCreate)
            return userMapperToUserData(userCreate)
        } catch (error) {
            throw new ServerError('Bad params', 400)
        }
     
    }

    @Post("/checkEmail")
    @SuccessResponse("200", "Email verify") // Custom success response
    async checkEmail( @Body() checkEmail: CheckEmailDto) {
        const user = await this.userRepository.findOneBy({id: checkEmail.id});
        if (user && user.tokenCheckYourEmail && user.tokenCheckYourEmail===checkEmail.token) {
            user.emailConfirm = true
            user.tokenCheckYourEmail = null
            user.emailCheckYourEmailAt = null
            await this.userRepository.save(user);
            this.setStatus(200)
            return
        } else {
            throw new ServerError('Unauthorize', 401)
        }

    }

    @Post("/askCheckEmail")
    @SuccessResponse("200", "Email send") // Custom success response
    async askCheckEmail( @Body() askcheckEmail: AskCheckEmailDto) {
        const user = await this.userRepository.findOneBy({email: askcheckEmail.email});
        if (user && user.tokenCheckYourEmail && !user.emailConfirm) {
            var token = uuid4(); 
            user.tokenCheckYourEmail = token
            user.emailCheckYourEmailAt = new Date()
            const userUpdate: UserEntity = await this.userRepository.save(user);
            await sendEmailCheckEmail(userUpdate)
            this.setStatus(200)
            return
        } else {
            throw new ServerError('Unauthorize', 401)
        }
    }
    
    @Post("/login")
    @SuccessResponse("200", "Success")
    @Example<UserAuthDto>({
        id: "46638910-ae86-42be-bc6e-b5bc8ae76592",
        email: "test",
        emailConfirm: false,
        firstName: "azea",
        lastName: "azaza",
        token: "eznkjnezkjnez",
        refreshToken: "ezaeazeazeaz",
        expireToken: "zeazeazea"
      })
    async login(@Body() loginDto: LoginDto): Promise<UserAuthDto> {
        const userAuthDto:UserAuthDto =  await this.authService.login(loginDto)
        return userAuthDto
    }

/*
    @Get("/iam")
    @Security("bearerAuth")
   async iam(@Request() request: any) {
        console.log("USER ", request?.user || null)
    return
   }
   */
}