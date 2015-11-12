'use strict';

import React from 'react';

export default function IdeError(props) {
  return (
    // jshint ignore:start
    <div className='ide__error'>
      <strong>Error</strong>
      <p>
        {props.error.name + ': ' + props.error.message}
      </p>
    </div>
    // jshint ignore:end
  );
}
