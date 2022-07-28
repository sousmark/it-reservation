import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity({name:"status"})
export class Status {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  statu!: string;

}