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
    Put,
    Security,
    Request,
    Delete
  } from "tsoa";
import * as uuid4 from "uuid4";
import ListService from "../services/lists.service";
import { ListEntity } from "../entity/lists.entity";
import { listMapperToListData } from "../../common/utils/listMapper";
import { ListDataDto } from "../dto/response/listData.dto";
import { CreateListDto } from "../dto/createList.dto";
import { ServerError } from "../../config/server-errors";

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

    @Put("{id}")
    @SuccessResponse("201")
    @Example<ListDataDto>({
        id: "46638910-ae86-42be-bc6e-b5bc8ae76592",
        title: "title exemple",
        endDate: new Date(2000, 1, 1),
    })
    @Security("bearerAuth")
    async update(@Request() request: any, @Body() dto: CreateListDto, @Path() id: string): Promise<ListDataDto> {
        const list = await this.listsService.update(request?.user, dto, id)
        const listDto = listMapperToListData(list)
        return listDto; 
    }

    @Delete("{id}")
    @SuccessResponse("200")
    @Security("bearerAuth")
    async delete(@Request() request: any, @Path() id: string) {
        const list = await this.listsService.findListById(id)
        if (list && list.owner.id === request?.user.id) { 
            await this.listsService.delete(id)
            this.setStatus(200)
        } else {
            throw new ServerError('Unauthorize', 401)
        }
    }
}