module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "recruitment",
    {
      position: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      compensation: {
        type: DataTypes.DECIMAL(8, 0),
        allowNull: true,
      },
      contents: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      stack_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updated_at: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        allowNull: false,
      },
    },
    {
      tableName: "recruitment",
      timestamps: false,
    }
  );
};
