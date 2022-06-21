import { ListEntity } from "../../lists/entity/lists.entity";
import { ListDataDto } from "../../lists/dto/response/listData.dto";

export function listMapperToListData(listEntity: ListEntity): ListDataDto {
    const list : ListDataDto = {
        id: listEntity.id,
        title: listEntity.title,
        endDate: listEntity.endDate
    }
    return list
}