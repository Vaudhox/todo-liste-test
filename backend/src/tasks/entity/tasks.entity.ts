import { ListEntity } from "../../lists/entity/lists.entity";
import {
    Entity,
    Column, 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Unique,
    ManyToOne
} from "typeorm";

@Entity({ name: 'tasks' })
@Unique(['id'])
export class TaskEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @Column({ type: 'text', nullable: false })
    text: string;

    @Column({ type: 'boolean', nullable: false, default: false})
    status: boolean;

    @ManyToOne(type => ListEntity, list => list.tasks)
    list: ListEntity;
}