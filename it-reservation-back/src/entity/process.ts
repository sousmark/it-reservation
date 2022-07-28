import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Status } from "./status";

@Entity({name:"process"})
export class Process {
  
  @PrimaryGeneratedColumn()
  id!: number;

  // @Column()
  // @OneToOne(() => Status, {cascade: true})
  // @JoinColumn({name: "status_id"})
  // statu!: Status;

  @Column()
  status_id!: number;

  @Column()
  bl_number!: string;

  @Column()
  transport_identifier!: string;

  @Column()
  reference_count!: number;

  @Column()
  package_count!: number;

  @Column()
  gross_weight!: number;

  @Column()
  seller_info!: string;

  @Column()
  create_date!: Date;

  @Column()
  update_date!: Date;

  @Column()
  update_user!: string;

  @Column()
  unloading_time!: Date;

  @Column()
  unloading_user!: string;

  @Column()
  loading_time!: Date;

  @Column()
  loading_user!: string;

  @Column()
  vehicle_plate!: string;

  @Column()
  is_damaged!: number;

}