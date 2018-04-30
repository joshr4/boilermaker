import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getThermostat } from '../store';

/**
 * COMPONENT
 */
class Thermostat extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.log('props', this.props)
    return (
      <div>
        <h2>{this.props}70°</h2>
        <button onClick={() => this.props.updateClick()} className="ui button">
          Update
        </button>
        <p>Setpoint is 74°</p>
        <div className="ui action input">
          <input type="text" placeholder="Enter new setpoint" />
          <button className="ui button">Save</button>
        </div>
        <p>Heat On</p>
        <p>Occupied</p>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('mapstate', state)
  return {
    stat: state.stat
  }
}

const mapDispatch = dispatch => {
  return {
    updateClick() {
      console.log('CLICKL')
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Thermostat);

