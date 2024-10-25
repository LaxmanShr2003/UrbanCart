import * as crypto  from 'crypto'


export const Unique =() =>{
    return crypto.randomBytes(16).toString("hex");
}