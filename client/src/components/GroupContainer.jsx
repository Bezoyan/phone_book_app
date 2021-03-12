import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GroupFormModal from './GroupFormModal';
import { getAllGroups, saveGroup, updateGroup, deleteGroup }
  from './../actions/groupActions';

const propTypes = {
  getAllGroups: PropTypes.func.isRequired,
  saveGroup: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired
};
class GroupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      willEdit: false,
      groupToEdit: {
        title: '',
      },
      errors: {}
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getAllGroups();
  }

  handleEdit(group) {
    this.setState({
      willEdit: true,
      groupToEdit: group,
    }, () => {
      $('#group-form').modal('show');
    });
  }

  handleChange(e) {
    this.setState({
      groupToEdit: {
        ...this.state.groupToEdit,
        [e.target.name]: e.target.value
      }
    });
  }

  handleDelete(id) {
    this.props.deleteGroup(id);
  }

  handleSubmit(event, groupToSave) {
    event.preventDefault();
    if (this.state.willEdit && this.state.groupToEdit.id) {
      return this.props.updateGroup(groupToSave)
        .then((res) => {
          if (res.errors) return this.setState({ errors: res.errors });
          return this.setState({ errors: {}, groupToEdit: { title: '' } }, () => {
          });
        });
    }
    return this.props.saveGroup(groupToSave)
      .then((res) => {
        if (res.errors) return this.setState({ errors: res.errors });
        return this.setState({ errors: {}, groupToEdit: { title: '' } }, () => {
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 group-card">
            <h5>Groups for your contacts. Manage here</h5>
            {this.props.groups.map((group) => {
              return (
                <div key={group.id} className="group-tile">
                  <div className="badge badge-default" >
                    {group.title}&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-xs btn-outline-success"
                      onClick={() => this.handleEdit(group)}
                    >
                      <i className="fa fa-edit" />
                    </button>&nbsp;&nbsp;
                    <button
                      className="btn btn-xs btn-outline-danger"
                      onClick={() => this.handleDelete(group.id)}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </div>
                </div>
              );
              })}
          </div>
        </div>
        {<GroupFormModal
          submitGroup={(event) => this.handleSubmit(event, this.state.groupToEdit)}
          group={this.state.groupToEdit}
          editGroup={this.handleEdit}
          formChange={this.handleChange}
          formErrors={this.state.errors}
        />}
      </div>
    );
  }
}

GroupContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    groups: state.groupReducer.groups
  };
};

export default connect(mapStateToProps, {
  getAllGroups,
  saveGroup,
  updateGroup,
  deleteGroup
})(GroupContainer);
