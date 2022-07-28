import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity({name:"users"})
export class Users {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ipn!: string;
  
  @Column()
  role_id!: number;

}