import { Sequelize } from "sequelize";
import {cuserModelFile } from "../models/userFile.js";
const sequelize = new Sequelize('newDb', 'postgres', '123456', {
    host: 'localhost',
    dialect:'postgres'
  });
  let newuserModelFile=null;
  const connectionUserFile=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newuserModelFile=await cuserModelFile(sequelize);
        await sequelize.sync();
        console.log("Database created file");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {
    connectionUserFile,
    newuserModelFile,
  }