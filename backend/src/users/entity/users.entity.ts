import { ListEntity } from "../../lists/entity/lists.entity";
import {
    Entity,
    Column, 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Unique,
    OneToMany
} from "typeorm";

@Entity({ name: 'users' })
@Unique(['id', 'email'])
export class UserEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @Column({ type: 'varchar', unique: true, length: 300, nullable: false })
    email: string;
  
    @Column({ type: 'text', nullable: false })
    password: string;
  
    @Column({ type: 'text', nullable: true })
    refreshToken: string;
  
    @Column({ type: 'timestamptz', default: null, nullable: true })
    passwordRequestAt: Date;
  
    @Column({ type: 'uuid', nullable: true })
    tokenPassword: string;
  
    @Column({ type: 'text', nullable: true, default: null })
    imageProfile: string;
  
    @Column({ type: 'timestamptz', default: null, nullable: true })
    emailCheckYourEmailAt: Date;
  
    @Column({ type: 'uuid', nullable: true })
    tokenCheckYourEmail;
  
    @Column({ type: 'boolean', default: false })
    emailConfirm: boolean;
  
    @Column({ type: 'varchar', length: 100, nullable: true })
    firstName: string;
  
    @Column({ type: 'varchar', length: 100, nullable: true })
    lastName: string;

    @OneToMany(type => ListEntity, list=> list.owner)
    lists: ListEntity[];
}