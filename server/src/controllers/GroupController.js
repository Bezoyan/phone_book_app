import { Group } from "../models";

// TODO: add vAlidation;

const addGroup = (req, res) => {
  const { title } = req.body;
  return Group.create({ title: title.trim() })
    .then((group) => {
      if (group) {
        return res.status(201).send({ message: "Group created!", group });
      }
      return res.status(400).send({ message: "Oops! Please try again" });
    })
    .catch((error) => {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).send({ message: "Group already exists!" });
      }
      return res.status(500).send({
        message: "Internal Server Error",
      });
    });
};

const updateGroup = (req, res) => {
  const { title } = req.body;
  const { groupId } = req.params;
  return Group.findAll({ where: { id: groupId } })
    .then((foundGroup) => {
      if (foundGroup) {
        return Group.update(
          { title: title.trim() },
          {
            where: { id: groupId },
            returning: true,
            plain: true,
          }
        )
          .then((updatedGroup) => {
            const group = updatedGroup[1].dataValues;
            return res.status(200).send({ message: "Group updated", group });
          })
          .catch((error) => {
            return res.status(500).send({
              message: "Internal Server Error",
              error: error.message,
            });
          });
      }
      return res.status(404).send({ message: "Group does not exist" });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    });
};

const listAllGroups = (req, res) => {
  return Group.findAll()
    .then((groups) => {
      return res.status(200).send({ groups });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    });
};

const deleteGroup = (req, res) => {
  const { groupId } = req.params;
  return Group.findAll({ where: { id: groupId } })
    .then((foundGroup) => {
      if (foundGroup) {
        return Group.destroy({
          where: { id: groupId },
        })
          .then(() => {
            return res.status(200).send({
              message: "Group deleted",
              group: foundGroup,
            });
          })
          .catch((error) => {
            return res.status(500).send({
              message: "Internal Server Error",
              error,
            });
          });
      }
      return res.status(404).send({ message: "Group does not exist" });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    });
};

module.exports = {
  addGroup,
  updateGroup,
  listAllGroups,
  deleteGroup,
};
