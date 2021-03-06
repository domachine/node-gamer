'use strict';

import _ from 'highland';
import {EventEmitter} from 'events';
import xtend from 'xtend';
import ReactDOM from 'react-dom';
import React from 'react';
import R from 'ramda';

import api from './api';
import Ide from 'components/ide.jsx';
import reduce from 'reducers';

const actionEmitter = new EventEmitter();
const actions = _('action', actionEmitter);
const game = api(actionEmitter.emit.bind(actionEmitter, 'action'));

const connectGame = R.once(() => {
  document.onkeydown = e => {
    switch (e.keyCode) {
      case 37:
        return game.whenKeyLeft();
      case 38:
        return game.whenKeyUp();
      case 39:
        return game.whenKeyRight();
      case 40:
        return game.whenKeyDown();
    }
  };
});

const initialState = reduce({}, {type: '@@INIT'});
const appActions = _([[{}], actions]).concat()
  .flatten()
  .map(a =>
    typeof a.type === 'undefined'
      ? {type: '@', data: a}
      : a
  )
  .doto(_.log)
  .scan(initialState, (state, action) =>
    action.type === '@'
      ? xtend(state, action.data)
      : xtend(state, reduce(state, action))
  )
  .each(state => {
    let props = xtend(state, {
      dispatch: actionEmitter.emit.bind(actionEmitter, 'action')
    });
    window.STATE = state;
    connectGame();

    ReactDOM.render(
      // jshint ignore:start
      <Ide {... props}/>,
      // jshint ignore:end
      document.getElementById('app')
    );
  });
