import express from "express";
import {
  addContact,
  updateContact,
  listAllContacts,
  deleteContact,
  searchContact,
  bulkDelete,
} from "./controllers/ContactController";
import {
  listAllGroups,
  updateGroup,
  addGroup,
  deleteGroup,
} from "./controllers/GroupController";

const router = express.Router();

router.get("/", (req, res) => {
  const message =
    "Hi, Welcome to Simple PhoneBook API. We have these routes available for consumption";
  return res.status(200).send(
    JSON.stringify(
      {
        message,
        routes: {
          "Add New Contact": "POST /api/v1/contacts",
          "Modify Existing Contact": "/api/v1/contacts/:contactId",
          "List All Contacts": "/api/v1/contacts/",
          "Delete Specific Contact": "/api/v1/contacts/:contactId",
          "Add New Group": "/api/v1/groups",
          "Modify Group": "/api/v1/groups/:groupId",
          "List all Groups": "/api/v1/groups/",
          "Delete Specific Group": "/api/v1/groups/:groupId",
        },
      },
      null,
      2
    )
  );
});

router.post("/contacts", addContact);
router.put("/contacts/:contactId", updateContact);
router.get("/contacts", listAllContacts);
router.get("/contacts/find", searchContact);
router.delete("/contacts/:contactId", deleteContact);
router.delete("/contacts/contacts/bulk", bulkDelete);

router.post("/groups", addGroup);
router.put("/groups/:groupId", updateGroup);
router.get("/groups", listAllGroups);
router.delete("/groups/:groupId", deleteGroup);

export default router;
