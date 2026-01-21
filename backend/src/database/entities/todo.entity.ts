import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export default class Todo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  status: 'created' | 'completed' | 'on_going' | 'problem';

  @Column({ nullable: true })
  problem_desc?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
