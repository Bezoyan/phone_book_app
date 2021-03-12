import axios from 'axios';
import { SET_ALL_GROUPS, ADD_GROUP, UPDATED_GROUP, DELETED_GROUP }
  from './types';
import { notify } from './../helpers/utils';
import { getAllContacts } from './contactActions';

const setGroups = (groups) => {
  return {
    type: SET_ALL_GROUPS,
    groups
  };
};

const addGroup = (group) => {
  return {
    type: ADD_GROUP,
    group
  };
};

const updatedGroup = (group) => {
  return {
    type: UPDATED_GROUP,
    group
  };
};

const deletedGroup = (groupId) => {
  return {
    type: DELETED_GROUP,
    groupId
  };
};

const getAllGroups = () => {
  return dispatch => {
    return axios.get('/api/v1/groups')
      .then((res) => {
        dispatch(setGroups(res.data.groups));
      }).catch((err) => {
        notify(err.response.statusText, 'green', 2000);
      });
  };
};

const saveGroup = (group) => {
  return dispatch => {
    return axios.post('/api/v1/groups', group)
      .then((res) => {
        dispatch(addGroup(res.data.group));
        notify(res.data.message, 'green', 2000);
        $('#group-form').modal('hide');
        return true;
      }).catch((err) => {
        notify(err.response.data.message, 'red', 2000);
        return err.response.data;
      });
  };
};

const updateGroup = ({ id, title }) => {
  const groupToUpdate = { title };
  return dispatch => {
    return axios.put(`/api/v1/groups/${id}`, groupToUpdate)
      .then((res) => {
        dispatch(updatedGroup(res.data.group));
        dispatch(getAllContacts());
        notify(res.data.message, 'green', 2000);
        $('#group-form').modal('hide');
        return true;
      }).catch((err) => {
        notify(err.response.statusText, 'red', 2000);
        return err.response.data;
      });
  };
};

const deleteGroup = (groupId) => {
  return dispatch => {
    return axios.delete(`/api/v1/groups/${groupId}`)
      .then((res) => {
        dispatch(deletedGroup(res.data.group.id));
        dispatch(getAllContacts());
        notify(res.data.message, 'green', 2000);
      }).catch((err) => {
        notify(err.response.statusText, 'red', 2000);
        return err.response.data;
      });
  };
};

export {
  getAllGroups,
  saveGroup,
  updateGroup,
  deleteGroup,
  setGroups,
  addGroup,
  updatedGroup,
  deletedGroup,
};
