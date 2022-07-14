import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Order {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  fullName: string;

  @Column()
  phoneNumber: string;

  @Column()
  book: Book[];
}
