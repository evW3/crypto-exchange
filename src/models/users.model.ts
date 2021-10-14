import { userAccountStatusses } from 'src/core/static/enums';
import { createDefaultLogin } from 'src/utils/functions.utils';
import { 
    Column, 
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn 
} from 'typeorm';
import { VerificationCodes } from './verificationCodes.model';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    password_salt: string;

    @Column({ default: createDefaultLogin() })
    login: string;

    @Column({nullable: true})
    first_name: string;

    @Column({nullable: true})
    last_name: string;

    @Column({nullable: true})
    country_of_residence: string;

    @Column({nullable: true})
    home_country: string;

    @Column({nullable: true})
    phone_number: string;

    @Column({type: 'date', nullable: true})
    birth_date: string;

    @Column({
        type: "enum",
        enum: userAccountStatusses,
        default: userAccountStatusses.CREATE_ACCOUNT
    })
    status: userAccountStatusses;

    @OneToMany(() => VerificationCodes, verificationCodes => verificationCodes.user)
    @JoinColumn()
    codes: VerificationCodes[]
}