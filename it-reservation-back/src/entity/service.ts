import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:"service"})
export class Service {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  id_employee!: string;

  @Column()
  name!: string;
}