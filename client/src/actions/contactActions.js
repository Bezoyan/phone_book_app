import axios from 'axios';
import { SET_ALL_CONTACTS, ADD_CONTACT, UPDATED_CONTACT, DELETED_CONTACT }
  from './types';
import { notify } from './../helpers/utils';

const setContacts = (contacts) => {
  return {
    type: SET_ALL_CONTACTS,
    contacts
  };
};

const addContact = (contact) => {
  return {
    type: ADD_CONTACT,
    contact
  };
};

const updatedContact = (contact) => {
  return {
    type: UPDATED_CONTACT,
    contact
  };
};

const deletedContact = (contactId) => {
  return {
    type: DELETED_CONTACT,
    contactId
  };
};

const getAllContacts = () => {
  return dispatch => {
    return axios.get('/api/v1/contacts')
      .then((res) => {
        dispatch(setContacts(res.data.contacts));
      }).catch((err) => {
        notify(err.response.statusText, 'green', 2000);
      });
  };
};

const saveContact = (contact) => {
  return dispatch => {
    return axios.post('/api/v1/contacts', contact)
      .then((res) => {
        const newContact = {
          ...res.data.contact,
          group: res.data.group
        };
        dispatch(addContact(newContact));
        notify(res.data.message, 'green', 2000);
        $('#contact-form').modal('hide');
        return true;
      }).catch((err) => {
        notify(err.response.data.message, 'red', 2000);
        return err.response.data;
      });
  };
};

const updateContact = ({ id, firstName, lastName, phone, groupId }) => {
  const contactToUpdate = { firstName, lastName, phone, groupId };
  return dispatch => {
    return axios.put(`/api/v1/contacts/${id}`, contactToUpdate)
      .then((res) => {
        const contactUpdated = {
          ...res.data.contact,
          group: res.data.group
        };
        dispatch(updatedContact(contactUpdated));
        notify(res.data.message, 'green', 2000);
        $('#contact-form').modal('hide');
        return true;
      }).catch((err) => {
        notify(err.response.statusText, 'red', 2000);
        return err.response.data;
      });
  };
};

const deleteContact = (contactId) => {
  return dispatch => {
    return axios.delete(`/api/v1/contacts/${contactId}`)
      .then((res) => {
        dispatch(deletedContact(res.data.contact.id));
        notify(res.data.message, 'green', 2000);
      }).catch((err) => {
        notify(err.response.statusText, 'red', 2000);
        return err.response.data;
      });
  };
};

export {
  getAllContacts,
  saveContact,
  updateContact,
  deleteContact,
  setContacts,
  addContact,
  updatedContact,
  deletedContact,
};
