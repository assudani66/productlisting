module.exports = (sequelize, DataTypes) => {
  const ProductInfo = sequelize.define(
    "ProductInfo",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        default: 0,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      tableName: "Product_info",
    }
  );

  return ProductInfo;
};
