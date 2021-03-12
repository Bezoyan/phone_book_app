import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  group: {
    title: ''
  },
  formErrors: {}
};

const propTypes = {
  submitGroup: PropTypes.func.isRequired,
  formChange: PropTypes.func.isRequired,
  group: PropTypes.shape({
    title: PropTypes.string
  }),
  formErrors: PropTypes.shape({})
};

const GroupFormModal = ({ formChange, formErrors, submitGroup, group }) => {
  const { title } = group;
  return (
    <div className="row">
      <div className="col-md-offset-12 modal fade" id="group-form">
        <div className="modal-dialog">
          <form id="multi-form" onSubmit={submitGroup}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Enter Group Name"
                    value={title}
                    onChange={formChange}
                  />
                  {formErrors &&
                    <span className="text-danger">{formErrors.title}</span>}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >Save changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

GroupFormModal.defaultProps = defaultProps;
GroupFormModal.propTypes = propTypes;

export default GroupFormModal;
