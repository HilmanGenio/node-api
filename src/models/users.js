module.exports = (sequelize, DataType) => {

    const Users = sequelize.define('Users', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        googleId: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
        ,
        name: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Tasks);
    };

    return Users;

};