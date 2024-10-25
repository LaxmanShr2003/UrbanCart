import * as dotenv from 'dotenv'
dotenv.config();


export const environment ={
    //server
    SERVER_PORT: +process.env.SERVER_PORT!,


    //Database
    DB_HOST:process.env.DB_HOST,
    DB_PORT:+process.env.DB_PORT!,
    DB_NAME:process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD : process.env.DB_PASSWORD,


    //secret key 
    SECRET_KEY:process.env.SECRET_KEY

}