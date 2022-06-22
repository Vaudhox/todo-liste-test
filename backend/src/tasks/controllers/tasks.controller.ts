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
    Request
  } from "tsoa";
import * as uuid4 from "uuid4";
import TaskService from "../services/tasks.service";
import { listMapperToListData } from "../../common/utils/listMapper";
import ListService from "../../lists/services/lists.service";
import { ServerError } from "../../config/server-errors";
import { TaskEntity } from "../entity/tasks.entity";
import { TaskDataDto } from "../dto/response/taskData.dto";
import { taskMapperToTaskData } from "../../common/utils/taskMapper";
import { CreateTaskDto } from "../dto/createTask.dto";

@Route("/")
@Tags('Task')
export class TaskController extends Controller {

    private tasksService;
    private listsService;

    constructor(){
        super()
        this.tasksService = new TaskService();
        this.listsService = new ListService();
    }
   
    @Get("{id}/tasks")
    @SuccessResponse("200")
    @Example<TaskDataDto[]>([ {
        id: "a0651deb-d64a-4f67-9273-da9e5895c5ef",
        createdAt: new Date("2022-06-21T23:20:34.640Z"),
        updatedAt: new Date("2022-06-21T23:20:34.640Z"),
        text: "My first task",
        status: false,
        listId: "29986e3c-e8f2-43e6-927d-91c2a159538a"
      }])
    @Security("bearerAuth")
    async tasksFromList(@Request() request: any, @Path() id: string): Promise<TaskDataDto[]> {
        const list = await this.listsService.findListById(id)
        if (list && list.owner.id === request?.user.id) {
            const tasks = await this.tasksService.findTasksByList(list);
            return tasks.map(task => taskMapperToTaskData(task));
        } else {
            throw new ServerError('Unauthorize', 401)
        }
    }

    @Post("{id}/tasks")
    @SuccessResponse("201")
    @Example<TaskDataDto>({
        id: "a0651deb-d64a-4f67-9273-da9e5895c5ef",
        createdAt: new Date("2022-06-21T23:20:34.640Z"),
        updatedAt: new Date("2022-06-21T23:20:34.640Z"),
        text: "My first task",
        status: false,
        listId: "29986e3c-e8f2-43e6-927d-91c2a159538a"
    })
    @Security("bearerAuth")
    async create(@Request() request: any, @Body() dto: CreateTaskDto, @Path() id: string): Promise<TaskDataDto> {
        const list = await this.listsService.findListById(id)
        if (list && list.owner.id === request?.user.id) {
            const task = await this.tasksService.create(dto, list);
            return taskMapperToTaskData(task);
        } else {
            throw new ServerError('Unauthorize', 401)
        }
    }

    
    @Put("{id}/tasks/{taskId}")
    @SuccessResponse("200")
    @Example<TaskDataDto>({
        id: "a0651deb-d64a-4f67-9273-da9e5895c5ef",
        createdAt: new Date("2022-06-21T23:20:34.640Z"),
        updatedAt: new Date("2022-06-21T23:20:34.640Z"),
        text: "My first task",
        status: false,
        listId: "29986e3c-e8f2-43e6-927d-91c2a159538a"
    })
    @Security("bearerAuth")
    async update(@Request() request: any, @Body() dto: CreateTaskDto, @Path('id') id: string, @Path('taskId') taskId: string): Promise<TaskDataDto> {
        const list = await this.listsService.findListById(id)
        if (list && list.owner.id === request?.user.id) {
            const task = await this.tasksService.update(dto, taskId);
            return taskMapperToTaskData(task);
        } else {
            throw new ServerError('Unauthorize', 401)
        }
    }
    
}