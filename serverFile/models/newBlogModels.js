// import { DataTypes, ENUM } from "sequelize";

// import bcrypt from 'bcrypt';

// export const nuserModel = async (sequelize) => {
//     const CheckUser = sequelize.define('newUser', {
//         id: {
//             type:DataTypes.UUID,
//             defaultValue:DataTypes.UUIDV4,
//             primaryKey:true
//         },
//         username: {
//             type: DataTypes.STRING,
//             unique: true,
//             allowNull: false
//         },
//         email:{
//             type: DataTypes.STRING,
//             unique: true,
//             allowNull: false
//         }
//     },{
//         timestamps:true,
//     });
//     return CheckUser;
// }
// export const nblogModel = async (sequelize) => {
//     const CheckBlog = sequelize.define('newblog', {
//         id:{
//             type:DataTypes.UUID,
//             defaultValue:DataTypes.UUIDV4,
//             primaryKey:true
//         },
//         title: {
//             type: DataTypes.STRING,
//             unique: true,
//             allowNull: false
//         },
//         content:{
//             type: DataTypes.STRING,
//             unique: true,
//             allowNull: false
//         },
//         user_id:{
//             type: DataTypes.UUID,
//             references:{
//                 model:"newUser",
//                 key:"id"
//             },
//             allowNull: false
//         }
//     });
//     return CheckBlog;
// }

// nuserModel.hasMany(nblogModel);
// nblogModel.belongsTo(nuserModel);
