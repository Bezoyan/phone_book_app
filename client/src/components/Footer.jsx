import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  totalContacts: PropTypes.number.isRequired,
  totalGroups: PropTypes.number.isRequired
};

const Footer = ({ totalContacts, totalGroups }) => {
  return (
    <footer className="container">
      <div className="stats text-center">
        <p>
          <i className="fa fa-address-card-o" aria-hidden="true" />
            Total Contacts: {totalContacts}
        </p>
        <p>
          <i className="fa fa-users" aria-hidden="true" />
          Total Groups: {totalGroups}
        </p>
      </div>
    </footer>
  );
};

Footer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    totalContacts: state.contactReducer.contacts.length,
    totalGroups: state.groupReducer.groups.length
  };
};

export default connect(mapStateToProps, {})(Footer);

