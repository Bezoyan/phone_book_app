import { SET_ALL_CONTACTS, ADD_CONTACT, UPDATED_CONTACT, DELETED_CONTACT }
  from './../actions/types';

const initialState = {
  contacts: []
};

/**
 * Contact Reducer
 *
 * @description Returns each action by its type
 *
 * @param {array} state - The state passed to the contactReducer
 * @param {object} action - The action passed to the contactReducer
 *
 * @returns {object} array of contacts - Returns contact(s)
 */
const contactReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_CONTACTS: {
      return { ...state, contacts: action.contacts };
    }
    case ADD_CONTACT: {
      const newContacts = [...state.contacts, action.contact];
      return { ...state, contacts: newContacts };
    }
    case DELETED_CONTACT: {
      const contactsAfterDeletion =
        state.contacts.filter(item => item.id !== action.contactId);
      return { ...state, contacts: contactsAfterDeletion };
    }
    case UPDATED_CONTACT: {
      const contactsAfterUpdating = state.contacts.map((contact) => {
        if (contact.id === action.contact.id) return action.contact;
        return contact;
      });
      return { ...state, contacts: contactsAfterUpdating };
    }
    default: return state;
  }
};

export default contactReducer;
