import { Contact, Group } from "../models";
// TODO: add vAlidation;

const addContact = (req, res) => {
  return Contact.create(req.body)
    .then((contact) => {
      const groupId = parseInt(contact.groupId, 10) || null;
      return Group.findAll({ where: groupId }).then((group) => {
        return res
          .status(201)
          .send({ message: "Contact created!", contact, group });
      });
    })
    .catch((error) => {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).send({ message: "Phone Number already used!" });
      }
      return res.status(500).send({
        message: "Internal Server Error",
        error,
      });
    });
};

const updateContact = (req, res) => {
  const { contactId } = req.params;

  return Contact.findAll({ where: { id: contactId } })
    .then((foundContact) => {
      if (foundContact) {
        return Contact.update(req.body, {
          where: { id: contactId },
          plain: true,
          returning: true,
        })
          .then((updatedContact) => {
            const contact = updatedContact[1].dataValues;
            const groupId = !Number.isNaN(parseInt(contact.groupId, 10))
              ? contact.groupId
              : null;
            return Group.findAll({ where: groupId }).then((group) => {
              return res
                .status(200)
                .send({ message: "Contact updated", contact, group });
            });
          })
          .catch((error) => {
            return res.status(500).send({
              message: "Internal Server Error",
              error: error.message,
            });
          });
      }
      return res.status(404).send({ message: "Contact does not exist" });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    });
};

const listAllContacts = (req, res) => {
  return Contact.findAll({
    include: [{ model: Group, as: "group", required: false }],
  })
    .then((contacts) => {
      return res.status(200).send({ contacts });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    });
};

const deleteContact = (req, res) => {
  const { contactId } = req.params;
  return Contact.findAll({ where: { id: contactId } })
    .then((foundContact) => {
      if (foundContact) {
        return Contact.destroy({
          where: { id: contactId },
        })
          .then(() => {
            return res.status(200).send({
              message: "Contact deleted",
              contact: foundContact,
            });
          })
          .catch((error) => {
            return res.status(500).send({
              message: "Internal Server Error",
              error,
            });
          });
      }
      return res.status(404).send({ message: "Contact does not exist" });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    });
};

const searchContact = (req, res) => {
  const { ...phone } = req.body;
  const { ...firstName } = req.body;
  const { ...lastName } = req.body;
  return Contact.findAll({
    where: phone ? firstName : lastName,
    include: [{ model: Group, as: "group", required: false }],
  })
    .then((contacts) => {
      return res.status(200).send({ contacts });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    });
};

const bulkDelete = (req, res) => {
  const ids = req.body.id;
  let promise = [];

  for (let item of ids) {
    let find = Contact.findOne({ where: { id: item } }).then((data) => {
      if (data) {
        const deleted = Contact.destroy({
          where: { id: item },
        });
        return promise.push(deleted);
      } else {
        res.status(404).json({ errors: "Contact not found" });
        return;
      }
    });
  }
  return Promise.all(promise);
};

module.exports = {
  addContact,
  updateContact,
  listAllContacts,
  deleteContact,
  searchContact,
  bulkDelete,
};
