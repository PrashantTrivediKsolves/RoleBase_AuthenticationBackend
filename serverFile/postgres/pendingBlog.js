import { Sequelize } from "sequelize";
import { cpendingblogModel} from "../models/pendingBlog.js";
const sequelize = new Sequelize('newDb', 'postgres', '123456', {
    host: 'localhost',
    dialect:'postgres'
  });
  let newpendingblogModel=null;
  const connectionpendingblog=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newpendingblogModel=await cpendingblogModel(sequelize);
        await sequelize.sync();
        console.log("Database created pending blog");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {
    connectionpendingblog,
    newpendingblogModel,
  }