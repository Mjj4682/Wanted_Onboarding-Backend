module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "stack",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "stack",
      timestamps: false,
    }
  );
};
