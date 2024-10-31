const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const { Sequelize } = require('sequelize')

// get environment
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
    }
)

// connect database
const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('database connected')
    } catch (e) {
        console.error('error connecting database: ', e)
    }
}

module.exports = {
    sequelize,
    connectDB,
}