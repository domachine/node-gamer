'use strict';

import xtend from 'xtend';

import {MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT} from 'actions';

const initialCharacters = [{
  type: 'bear',
  x: 3,
  y: 4,
  height: 20,
  width: 15
}];

const initialCode = `
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
`;

export default function(state, action) {
  return {
    characters: characters(state.characters || initialCharacters, action),
    code: code(state.code || initialCode, action)
  };
}

function characters(state, action) {
  switch (action.type) {
    case MOVE_UP:
      return state.map(c =>
        xtend(c, {y: c.y - 2})
      );
    case MOVE_DOWN:
      return state.map(c =>
        xtend(c, {y: c.y + 2})
      );
    case MOVE_LEFT:
      return state.map(c =>
        xtend(c, {x: c.x - 2})
      );
    case MOVE_RIGHT:
      return state.map(c =>
        xtend(c, {x: c.x + 2})
      );
    default:
      return state;
  }
}

function code(state, action) {
  return state;
}
