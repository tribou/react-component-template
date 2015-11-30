/* @flow */


import React from 'react';
import Component from '..';



const App:ReactElement<any, any, any> = React.createClass({
  render() {
    return (
      <div>
        <Component name={name} />
      </div>
    );
  }
});


//
//const App = ({name} : PropTypes) => (
//  <div>
//    <Component name={name} />
//  </div>
//);
//
//
export default App;
