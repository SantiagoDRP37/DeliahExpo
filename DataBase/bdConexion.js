const Sequelize = require('sequelize');

const conf_db_host = "localhost";
const conf_db_name = "deli";
const conf_user = "root";
const conf_password = "";
const conf_port = "3306";

const sequelize = new Sequelize((`mysql://${conf_user}:${conf_password}@${conf_db_host}:${conf_port}/${conf_db_name}`));

module.exports = sequelize;