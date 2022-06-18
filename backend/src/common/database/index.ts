import "reflect-metadata";
import AppDataSource from "../../config/ormconfig"
import { UserEntity } from "../../users/entity/users.entity"

class DB {
    private _connection = AppDataSource;
    constructor() {
        this._connection
            .initialize()
            .then(() => {
                console.log("BDD connection has been initialized!")
            })
            .catch((err) => {
                console.error("Error BDD connection initialization:", err)
            })
    }
    
    
    connected() { 
        return typeof this._connection !== null; 
    }

    getUserRepository() {
        return this._connection.getRepository(UserEntity)
    }
}

const db = new DB();
export default db
