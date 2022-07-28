import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:"event"})
export class Event {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  date!: Date;

  @Column()
  start!: string;

  @Column()
  finish!: string;

  @Column()
  description!: string;

  @Column()
  creator!: string;
}