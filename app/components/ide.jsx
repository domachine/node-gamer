'use strict';

import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import Game from './game.jsx';

require('brace/mode/javascript');
require('brace/theme/github');

export default function Ide(props) {
  return (
    // jshint ignore:start
    <div className='ide'>
      <div className='ide__preview'>
        <Game {... props}/>
      </div>
      <div className='ide__editor'>
        <AceEditor mode='javascript' theme='github' name='ace-editor'/>
      </div>
    </div>
    // jshint ignore:end
  );
}
