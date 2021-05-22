import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn

} from 'typeorm'

@Entity('votations')
class Votation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_votations_id: string;

    @Column()
    movie_votations_id: string;

    @Column()
    value_voting: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Votation
