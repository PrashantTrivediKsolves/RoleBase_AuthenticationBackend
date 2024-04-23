import { DataTypes, ENUM } from "sequelize";

import bcrypt from 'bcrypt';

export const cblogModel = async (sequelize) => {

    const CheckUser = sequelize.define('blogi', {
        postId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        content:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    });
    return CheckUser;
}