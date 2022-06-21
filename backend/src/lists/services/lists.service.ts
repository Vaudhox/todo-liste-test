import { UserEntity } from "../../users/entity/users.entity";
import  DB from "../../common/database";
import { ListEntity } from "../entity/lists.entity";
import { CreateListDto } from "../dto/createList.dto";

export default class ListService {
    
    private listRepository;

    constructor() {
        this.listRepository = DB.getListRepository()
    }


    async findListByUser(user: UserEntity): Promise<ListEntity[]> {
        const lists = await this.listRepository.find({owner: user})
        return lists
    }

    async create(user: UserEntity, listDto: CreateListDto): Promise<ListEntity> {
        const endDate = new Date(listDto.endDate)
        const list = new ListEntity();
        list.title = listDto.title;
        list.endDate = endDate;
        list.owner = user;
        const listSave = await this.listRepository.save(list)
        return listSave
    }
}