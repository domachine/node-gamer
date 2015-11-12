'use strict';

import _ from 'highland';
import {EventEmitter} from 'events';
import xtend from 'xtend';
import ReactDOM from 'react-dom';
import React from 'react';
import R from 'ramda';
import vm from 'vm-browserify';

import Game from 'components/game.jsx';
import reduce from 'reducers';
import {moveUp, moveDown, moveLeft, moveRight} from 'actions';

const actionEmitter = new EventEmitter();
const actions = _('action', actionEmitter);

const game = {
  moveUp() {
    actionEmitter.emit('action', moveUp());
  },

  moveDown() {
    actionEmitter.emit('action', moveDown());
  },

  moveLeft() {
    actionEmitter.emit('action', moveLeft());
  },

  moveRight() {
    actionEmitter.emit('action', moveRight());
  },

  whenKeyUp() {
  },

  whenKeyDown() {
  },

  whenKeyLeft() {
  },

  whenKeyRight() {
  }
};

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

vm.runInNewContext(`
  function whenKeyUp() {
    moveUp();
  }

  function whenKeyDown() {
    moveDown();
  }

  function whenKeyLeft() {
    moveLeft();
  }

  function whenKeyRight() {
    moveRight();
  }
`, game);

const initialState = reduce({}, {type: '@@INIT'});
const appActions = _([[{}], actions]).concat()
  .flatten()
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
      <Game {... props}/>,
      // jshint ignore:end
      document.getElementById('app')
    );
  });
