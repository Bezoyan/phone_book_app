import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  addNewContact: PropTypes.func.isRequired,
};

const DashBoard = ({ addNewContact }) => {
  return (
    <div className="container">
      <div className="row dashboard">
        <div className="col-sm-12 offset-md-4 col-md-4">
          <div className="text-center">
            <button
              data-toggle="modal"
              data-target="#contact-form"
              type="button"
              onClick={addNewContact}
              className="btn btn-outline-primary"
            >New Contact
            </button>&nbsp;
            <button
              type="button"
              className="btn btn-outline-primary"
              data-toggle="modal"
              data-target="#group-form"
            >
              New Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DashBoard.propTypes = propTypes;

export default DashBoard;

