import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Users } from 'src/models/users.model';
import { verificationCodesStatusses } from 'src/core/static/enums';

@Entity({name:'verification_codes'})
export class VerificationCodes {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Generated("uuid")
    code: string;

    @Column({
        type: "enum",
        enum: verificationCodesStatusses,
        default: verificationCodesStatusses.ACTIVE
    })
    status: verificationCodesStatusses;

    @ManyToOne(() => Users, users => users.codes)
    @JoinColumn({name:'user_id'})
    user: Users;
}