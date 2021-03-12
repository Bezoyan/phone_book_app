import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllContacts, saveContact, updateContact, deleteContact }
  from './../actions/contactActions';
import { getAllGroups } from './../actions/groupActions';
import ContactFormModal from './ContactFormModal';
import DashBoard from './DashBoard';
import ContactCard from './ContactCard';

const propTypes = {
  getAllContacts: PropTypes.func.isRequired,
  getAllGroups: PropTypes.func.isRequired,
  saveContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired
};
class ContactContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      contactToEdit: {
        firstName: '',
        lastName: '',
        phone: '',
        groupId: 0,
        group: {
          title: ''
        }
      },
      errors: {}
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getAllContacts();
    this.props.getAllGroups();
  }

  handleEdit(contact) {
    this.setState({
      isEditing: true,
      contactToEdit: contact,
    }, () => {
      $('#contact-form').modal('show');
    });
  }

  handleChange(e) {
    let { value } = e.target;
    if (e.target.name === 'groupId') value = parseInt(value, 10);
    this.setState({
      contactToEdit: { ...this.state.contactToEdit, [e.target.name]: value }
    });
  }

  handleDelete(id) {
    this.props.deleteContact(id);
  }

  handleSubmit(event, contactToSave) {
    event.preventDefault();
    if (this.state.isEditing) {
      return this.props.updateContact(contactToSave)
        .then((res) => {
          if (res.errors) return this.setState({ errors: res.errors });
          return this.setState({ errors: {} });
        });
    }
    return this.props.saveContact(contactToSave)
      .then((res) => {
        if (res.errors) return this.setState({ errors: res.errors });
        return this.setState({ errors: {} });
      });
  }

  render() {
    return (
      <div>
        <DashBoard
          addNewContact={() => {
            const initialContact = {
              firstName: '',
              lastName: '',
              phone: '',
              groupId: 0,
              group: {
                title: ''
              }
            };
            this.setState({
              isEditing: false,
              contactToEdit: initialContact
            });
          }}
        />
        <main className="container">
          <br />
          <div className="row contact-wrapper">
            {this.props.contacts.map((contact) => {
              return (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  editContact={this.handleEdit}
                  deleteContact={this.handleDelete}
                />
              );
            })}
          </div>
          <br />
        </main>
        {<ContactFormModal
          submitContact={(event) => this.handleSubmit(event, this.state.contactToEdit)}
          contact={this.state.contactToEdit}
          groups={this.props.groups}
          formChange={this.handleChange}
          formErrors={this.state.errors}
        />}
      </div>
    );
  }
}

ContactContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    contacts: state.contactReducer.contacts,
    groups: state.groupReducer.groups
  };
};

export default connect(mapStateToProps, {
  getAllContacts,
  saveContact,
  updateContact,
  deleteContact,
  getAllGroups
})(ContactContainer);
