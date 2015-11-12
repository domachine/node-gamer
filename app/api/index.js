'use strict';

import R from 'ramda';

import {moveUp, moveDown, moveLeft, moveRight} from 'actions';

export default R.once(function(dispatch) {
  return {
    moveUp() {
      dispatch(moveUp());
    },

    moveDown() {
      dispatch(moveDown());
    },

    moveLeft() {
      dispatch(moveLeft());
    },

    moveRight() {
      dispatch(moveRight());
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
});
