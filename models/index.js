"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);

db.Stack = require("./stack")(sequelize, Sequelize);

db.Country = require("./country")(sequelize, Sequelize);

db.Region = require("./region")(sequelize, Sequelize);

db.Company = require("./company")(sequelize, Sequelize);

db.Recruitment = require("./recruitment")(sequelize, Sequelize);

db.Application = require("./application")(sequelize, Sequelize);

db.User.hasMany(db.Application, {
  foreignKey: "user_id",
  allowNull: false,
  constraints: true,
  onDelete: "cascade",
});
db.Application.belongsTo(db.User, {
  foreignKey: "user_id",
});

db.Stack.hasMany(db.Recruitment, {
  foreignKey: "stack_id",
  allowNull: false,
  constraints: true,
  onDelete: "cascade",
});
db.Recruitment.belongsTo(db.Stack, {
  foreignKey: "stack_id",
});

db.Country.hasMany(db.Region, {
  foreignKey: "country_id",
  allowNull: false,
  constraints: true,
  onDelete: "cascade",
});
db.Region.belongsTo(db.Country, {
  foreignKey: "country_id",
});

db.Region.hasMany(db.Company, {
  foreignKey: "region_id",
  allowNull: false,
  constraints: true,
  onDelete: "cascade",
});
db.Company.belongsTo(db.Region, {
  foreignKey: "region_id",
});

db.Company.hasMany(db.Recruitment, {
  foreignKey: "company_id",
  allowNull: false,
  constraints: true,
  onDelete: "cascade",
});
db.Recruitment.belongsTo(db.Company, {
  foreignKey: "company_id",
});

db.Recruitment.hasMany(db.Application, {
  foreignKey: "recruitment_id",
  allowNull: false,
  constraints: true,
  onDelete: "cascade",
});
db.Application.belongsTo(db.Recruitment, {
  foreignKey: "recruitment_id",
});

sequelize.sync({ alter: true });

module.exports = db;
