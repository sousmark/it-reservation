import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:"mq_detail"})
export class MqDetail {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  bl_number!: string;

  @Column()
  transport_identifier!: string;

  @Column()
  gross_weight!: number;

  @Column()
  uc_packaging_type!: string;

  @Column()
  client_reference!: string;

  @Column()
  sender_info!: string;

  @Column()
  seller_info!: string;

  @Column()
  create_date!: Date;
}