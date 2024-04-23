// import { Sequelize } from "sequelize";
// import {nblogModel } from "../models/newBlogModels.js";
// import {nuserModel} from "../models/newBlogModels.js";
// const sequelize = new Sequelize('newDb', 'postgres', '123456', {
//     host: 'localhost',
//     dialect:'postgres'
//   });

//   let bModel=null;

//   let uModel=null;

//   const connectionNewBlog=async()=>
//   {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//         bModel=await nblogModel(sequelize);
//         uModel=await nuserModel(sequelize);
//         await sequelize.sync();
//         console.log("Database created");
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
//   }
//   export {
//     connectionNewBlog,
//     bModel,
//     uModel
//   }