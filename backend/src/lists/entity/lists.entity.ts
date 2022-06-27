import { UserEntity } from "../../users/entity/users.entity";
import {
    Entity,
    Column, 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Unique,
    OneToMany,
    ManyToMany,
    ManyToOne
} from "typeorm";
import { TaskEntity } from "../../tasks/entity/tasks.entity";

@Entity({ name: 'lists' })
@Unique(['id'])
export class ListEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'varchar', length: 200, nullable: false })
    title: string;

    @Column({ type: 'timestamptz', nullable: true, default: null})
    endDate: Date;

    @OneToMany(type => TaskEntity, tasks => tasks.list)
    tasks: TaskEntity[];

    @ManyToOne(type => UserEntity, user => user.lists)
    owner: UserEntity;
    
    @Column({ type: 'boolean', nullable: false, default: false})
    reminder: boolean;
}