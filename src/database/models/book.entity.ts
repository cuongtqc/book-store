import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Book {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  categoryId: string;

  @Column()
  price: number;
}
