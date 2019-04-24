import React from 'react';
import PropTypes from 'prop-types';
import _values from 'lodash/fp/values';

const ValidationError = (props) => {
  let { errors } = props;

  if (typeof errors === 'object') {
    errors = _values(errors);
  }

  if (errors.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="validation--errors--label">Validation errors</h2>
      <div className="validation-errors">
        <ul>
          { errors.map((error, index) => <li key={ index }>{ error.message }</li>) }
        </ul>
      </div>
    </div>
  );
}

ValidationError.propTypes = {
  errors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.objectOf(PropTypes.object)])
};

ValidationError.defaultProps = {
  errors: []
};

export default ValidationError;
