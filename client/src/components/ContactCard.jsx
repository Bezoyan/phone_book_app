import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  editContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired
};

const ContactCard = ({ contact, editContact, deleteContact }) => {
  const { firstName, lastName, phone, id, group } = contact;
  return (
    <div className="col-sm-6 col-md-3 col-xs-12">
      <div className="contact-card">
        <div className="contact-details">
          <span className="lead">{firstName} {lastName}</span><br />
          <span className="lead">{phone}</span><br />
          <p><small className="lead">{group ? group.title : 'Ungrouped'}</small></p>
        </div>
        <div className="contact-action">
          <button onClick={() => editContact(contact)}>
            <i className="fa fa-edit" />
          </button>
          <button onClick={() => deleteContact(id)}>
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = propTypes;
export default ContactCard;

