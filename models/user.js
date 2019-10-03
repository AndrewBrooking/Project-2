const usersUtil = require("../misc/usersUtil.js");

module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('User', {
        uName: {
            type: DataTypes.STRING,
            notNull: true,
            notEmpty: true,
            unique: true,
            validation: {
                len: [usersUtil.nameMinLength, usersUtil.nameMaxLength],
                equals: usersUtil.nameRegex
            }
        },
        pass: {
            type: DataTypes.STRING.BINARY,
            notNull: true,
            notEmpty: true,
            validation: {
                len: [userUtils.passMinLength, userUtils.passMaxLength],
                equals: userUtils.passRegex
            }
        },
        email: {
            type: DataTypes.STRING,
            notNull: true,
            notEmpty: true,
            unique: true,
            validation: {
                len: [userUtils.emailMinLength, userUtils.emailMaxLength],
                isEmail: true
            }
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Project, {
            onDelete: "cascade"
        });

        User.hasMany(models.Following, {
            onDelete: "cascade"
        });
    };

    return User;
};