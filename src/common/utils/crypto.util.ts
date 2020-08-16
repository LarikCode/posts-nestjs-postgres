import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { clone } from '@babel/types';

@Injectable()
export class CryptoUtil {

    /**
     * encryptPassword
     *
     * @param password 
     */
    encryptPassword(password: string): string {
        console.log("1212"+password)
        return createHash('sha256').update(password).digest('hex');
    }

    /**
     * checkPassword
     *
     * @param password 
     * @param encryptedPassword 
     */
    checkPassword(password: string, encryptedPassword): boolean {
        console.log(password);
        const currentPass = this.encryptPassword(password);
     
        if (currentPass === encryptedPassword) {
            return true;
        }
        return false;
    }
}