import  DB from "../../common/database";
import { TaskEntity } from "../entity/tasks.entity";
import { ListEntity } from "../../lists/entity/lists.entity";
import { CreateTaskDto } from "../dto/createTask.dto";

export default class TaskService {
    
    private taskRepository;

    constructor() {
        this.taskRepository = DB.getTaskRepository()
    }


    async findTasksByList(list: ListEntity): Promise<TaskEntity[]> {
        const tasks = await this.taskRepository.find({where: {list: {id: list.id}},order: {createdAt: 'ASC'}, relations: ["list"]})
        return tasks
    }

    async create(dto: CreateTaskDto, list: ListEntity): Promise<TaskEntity> {
        const task = new TaskEntity();
        task.text = dto.text;
        task.status = dto.status;
        task.list = list;
        const taskSave = await this.taskRepository.save(task)
        return taskSave
    }
    
    async update(dto: CreateTaskDto, id: string): Promise<TaskEntity> {
        const task = await this.taskRepository.findOne({where: {id: id}, relations: ["list"]})
        task.text = dto.text;
        task.status = dto.status;
        const taskSave = await this.taskRepository.save(task)
        return taskSave
    }
        
    async delete(id: string) {
        await this.taskRepository.delete(id);
        return 
    }
}