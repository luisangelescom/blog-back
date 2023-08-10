import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('test_tgj6', 'luis', 'p0E0zYffKGrw2NG2OW5zNKLjNeMqIbGo', {
  host: 'dpg-cip46n6nqql4qa1i7k50-a.ohio-postgres.render.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: 'true'
    }
  },
  pool: {
    acquire: 30000,
    idle: 10000
  },
  retry: {
    max: 2
  }

})

export default sequelize
