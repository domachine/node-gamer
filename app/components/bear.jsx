'use strict';

import React from 'react';

export default function Bear(props) {
  const style = {
    height: props.height + 'px',
    width: props.width + 'px',
    left: props.x + 'px',
    top: props.y + 'px'
  };

  return (
    // jshint ignore:start
    <div className='game__character bear' style={style}>
    </div>
    // jshint ignore:end
  );
}
