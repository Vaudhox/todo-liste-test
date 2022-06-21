import  DB from "../../common/database";
import { UserEntity } from "../../users/entity/users.entity";
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
import * as uuid4 from "uuid4";
import ListService from "../services/lists.service";
import { ListEntity } from "../entity/lists.entity";
import { listMapperToListData } from "../../common/utils/listMapper";
import { ListDataDto } from "../dto/response/listData.dto";
import { CreateListDto } from "../dto/createList.dto";

@Route("/lists")
@Tags('List')
export class ListController extends Controller {

    private listsService;

    constructor(){
        super()
        this.listsService = new ListService();
    }
   
    @Get("")
    @SuccessResponse("200")
    @Example<ListDataDto[]>([{
        id: "46638910-ae86-42be-bc6e-b5bc8ae76592",
        title: "title exemple",
        endDate: new Date(2000, 1, 1),
      }])
    @Security("bearerAuth")
    async listsFromRequester(@Request() request: any): Promise<ListDataDto[]> {
        const lists = await this.listsService.findListByUser(request?.user)
        const listsDto = lists.map(list => listMapperToListData(list))
        return listsDto; 
    }

    @Post("")
    @SuccessResponse("201")
    @Example<ListDataDto>({
        id: "46638910-ae86-42be-bc6e-b5bc8ae76592",
        title: "title exemple",
        endDate: new Date(2000, 1, 1),
    })
    @Security("bearerAuth")
    async create(@Request() request: any, @Body() dto: CreateListDto): Promise<ListDataDto> {
        const list = await this.listsService.create(request?.user, dto)
        const listDto = listMapperToListData(list)
        return listDto; 
    }
}