const { DataTypes } = require('sequelize')
const { sequelize } = require('../database/postgres')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    profile_image: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
    },
    balance: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'users',
}
)

module.exports = User