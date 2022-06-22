import { UserEntity } from "../../users/entity/users.entity";
import  DB from "../../common/database";
import { ListEntity } from "../entity/lists.entity";
import { CreateListDto } from "../dto/createList.dto";
import { DeepPartial } from "typeorm";
import { ServerError } from "../../config/server-errors";

export default class ListService {
    
    private listRepository;

    constructor() {
        this.listRepository = DB.getListRepository()
    }


    async findListByUser(user: UserEntity): Promise<ListEntity[]> {
        const lists = await this.listRepository.find({owner: user})
        return lists
    }

    async findListById(id: string): Promise<ListEntity> {
        const list = await this.listRepository.findOne({where: {id: id }, relations: ["owner"]})
        return list
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

    async update(user: UserEntity, listDto: CreateListDto, id: string): Promise<ListEntity> {
        const list = await this.findListById(id);
        if (list.owner.id === user.id) {
            const endDate = new Date(listDto.endDate)
            list.title = listDto.title;
            list.endDate = endDate;
            const listSave = await this.listRepository.save(list)
            return listSave
        } else {
            throw new ServerError('Unauthorize', 401);
        }
    }

    async delete(id: string) {
        await this.listRepository.delete(id);
        return
    }
}