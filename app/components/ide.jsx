'use strict';

import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import Game from './game.jsx';
import IdeError from './ide_error.jsx';
import {runCode} from 'actions';

require('brace/mode/javascript');
require('brace/theme/github');

function clickRun(props) {
  return e => {
    e.preventDefault();
    props.dispatch(runCode(props.code));
  };
}

function changeCode(props) {
  return code => {
    props.dispatch({code});
  };
}

export default function Ide(props) {
  return (
    // jshint ignore:start
    <div className='ide'>
      <div className='ide__preview'>
        <Game {... props}/>
      </div>
      <div className='ide__editor'>
        <AceEditor onChange={changeCode(props)} value={props.code} editorProps={{$blockScrolling: Infinity}} mode='javascript' theme='github' name='ace-editor'/>
        <button onClick={clickRun(props)}>Run</button>
        {props.error != null
          ? <IdeError error={props.error}/>
          : null}
      </div>
    </div>
    // jshint ignore:end
  );
}
