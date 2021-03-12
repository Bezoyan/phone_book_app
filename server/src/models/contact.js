"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contact", {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  Contact.associate = (models) => {
    Contact.belongsTo(models.Group, {
      foreignKey: "groupId",
      as: "group",
    });
  };
  return Contact;
};
