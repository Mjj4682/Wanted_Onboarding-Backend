module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "country",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "country",
      timestamps: false,
    }
  );
};
