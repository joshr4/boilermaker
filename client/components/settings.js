import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Settings = props => {
  const {} = props;
  console.log('Tstat', props);
  return (
    <div>
      <h3>Settings</h3>
      <p>adfasfasdfasdf</p>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    tstat: state,
  };
};

export default connect(mapState)(Settings);

/**
 * PROP TYPES
 */
Settings.propTypes = {
  //email: PropTypes.string
};
