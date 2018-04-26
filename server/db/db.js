const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

var db

try {
  db = new Sequelize(
    process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
    {
      logging: false,
    }
  )
} catch (e) {
    db = new Sequelize()
    console.log('Sequelize error ', e)
}

module.exports = db;
