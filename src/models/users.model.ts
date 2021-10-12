import { userAccountStatusses } from 'src/core/enums';
import { createDefaultLogin } from 'src/utils/functions.utils';
import { 
    Column, 
    Entity,
    PrimaryGeneratedColumn 
} from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    password_salt: string

    @Column({ default: createDefaultLogin() })
    login: string

    @Column({nullable: true})
    firstName: string

    @Column({nullable: true})
    lastName: string

    @Column({nullable: true})
    country_of_residence: string

    @Column({nullable: true})
    home_country: string

    @Column({nullable: true})
    phone_number: string

    @Column({type: 'date', nullable: true})
    birth_date: string

    @Column({
        type: "enum",
        enum: userAccountStatusses,
        default: userAccountStatusses.CREATE_ACCOUNT,
        nullable: true
    })
    status: userAccountStatusses;
}