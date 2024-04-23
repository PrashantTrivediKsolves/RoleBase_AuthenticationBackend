import { DataTypes, ENUM } from "sequelize";

import bcrypt from 'bcrypt';

export const cpendingblogModel = async (sequelize) => {
    const CheckUser = sequelize.define('pendingBlog', {
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