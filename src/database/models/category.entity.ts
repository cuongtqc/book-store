import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;
}
