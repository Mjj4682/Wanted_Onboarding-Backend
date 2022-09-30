module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "region",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "region",
      timestamps: false,
    }
  );
};
