module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('User', {
        uName: {
            type: DataTypes.STRING,
            notNull: true,
            notEmpty: true,
            unique: true,
            validation: {
                len: [4, 16],
                equals: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,16}[a-zA-Z0-9]$/
            }
        },
        pass: {
            type: DataTypes.STRING.BINARY,
            notNull: true,
            notEmpty: true,
            validation: {
                len: [8, 32],
                equals: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,16}[a-zA-Z0-9]$/
            }
        },
        email: {
            type: DataTypes.STRING,
            notNull: true,
            notEmpty: true,
            unique: true,
            validation: {
                len: [8, 100],
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