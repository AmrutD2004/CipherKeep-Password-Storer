import pkg from 'pg'
import { config } from 'dotenv';
const {Client} = pkg


config()
const client = new Client({
    host : process.env.HOST || "",
    user : process.env.USER || "",
    password : process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE || "",
    port : 5432,
    ssl: {
    rejectUnauthorized: false
  }
});

export const connectDB = async()=>{
    try{
        await client.connect();
        console.log(`✅ Database Connected`)
    }catch(err){
        console.log(`❌ Database Connection failed : ${err.message}`)
        process.exit(1);
    }
}

export default client;