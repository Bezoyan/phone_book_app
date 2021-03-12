"use strict";
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  Group.associate = (models) => {
    Group.hasMany(models.Contact, {
      foreignKey: "groupId",
      as: "group",
    });
  };
  return Group;
};
