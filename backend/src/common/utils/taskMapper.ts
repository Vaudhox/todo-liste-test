import { TaskDataDto } from "src/tasks/dto/response/taskData.dto";
import { TaskEntity } from "src/tasks/entity/tasks.entity";

export function taskMapperToTaskData(taskEntity: TaskEntity): TaskDataDto {
    const task : TaskDataDto = {
        id: taskEntity.id,
        createdAt: taskEntity.createdAt,
        updatedAt: taskEntity.updatedAt,
        text: taskEntity.text,
        status: taskEntity.status,
        listId: taskEntity.list.id
    }
    return task
}