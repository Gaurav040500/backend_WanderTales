import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;  // Use UUID for unique photo identifiers

  @Column({ type: 'varchar', length: 255 })
  url: string;  // The URL of the uploaded photo

  @Column({ type: 'varchar', length: 255 })
  name: string;  // The original name of the uploaded file

  @Column({ type: 'varchar', length: 500, nullable: true })
  caption: string;  // Caption of the photo (optional)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
