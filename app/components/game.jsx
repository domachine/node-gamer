'use strict';

import React from 'react';
import xtend from 'xtend';

import Bear from './bear.jsx';

const characterComponents = {
  bear: Bear
};

export default function Game(props) {
  return (
    // jshint ignore:start
    <div className='game'>
      {props.characters.map(c => {
        const Component = characterComponents[c.type];
        return (
          <Component {... c}/>
        );
      })}
    </div>
    // jshint ignore:end
  );
}
