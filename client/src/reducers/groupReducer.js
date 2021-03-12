import { SET_ALL_GROUPS, ADD_GROUP, UPDATED_GROUP, DELETED_GROUP }
  from './../actions/types';

const initialState = {
  groups: []
};

/**
 * Contact Reducer
 *
 * @description Returns each action by its type
 *
 * @param {array} state - The state passed to the groupReducer
 * @param {object} action - The action passed to the groupReducer
 *
 * @returns {object} array of groups - Returns group(s)
 */
const groupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_GROUPS: {
      return { ...state, groups: action.groups };
    }
    case ADD_GROUP: {
      const newContacts = [...state.groups, action.group];
      return { ...state, groups: newContacts };
    }
    case DELETED_GROUP: {
      const groupsAfterDeletion =
        state.groups.filter(item => item.id !== action.groupId);
      return { ...state, groups: groupsAfterDeletion };
    }
    case UPDATED_GROUP: {
      const groupsAfterUpdating = state.groups.map((group) => {
        if (group.id === action.group.id) return action.group;
        return group;
      });
      return { ...state, groups: groupsAfterUpdating };
    }
    default: return state;
  }
};

export default groupReducer;
