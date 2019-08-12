import React, { useReducer, useContext, useEffect, useRef, } from 'react';
import './fonts/icons/css/settings.css';
import './App.css';

const MIN_BPM = 40;
const MAX_BPM = 200;

const initialState = {
  bpm: 120,
  counter: 0,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'bpm':
      return {
        ...state,
        bpm: Math.max(MIN_BPM, Math.min(action.payload, MAX_BPM)),
      };
    default:
      return state;
  }
}

export default function MetronomeApp() {
  const [ state, dispatch, ] = useReducer(appReducer, initialState);
  const { bpm, counter, } = state;

  return (
    <div className="app">
      <div className="row">
        <div className="counter">{counter}</div>
      </div>
      <div className="row">
        <input
          className="bpm"
          onChange={e => dispatch({ type: 'bpm', payload: e.target.value })}
          type="number" 
          value={bpm}  />
        <span className="bpm-label">BPM</span>
        <input type="checkbox" className="run-toggle" />
        <label htmlFor="run-toggle"><i className="icon-play"></i></label>
      </div>
      <div className="row">
        <button
          className="small-btn icon-minus decrease"
          onClick={e => dispatch({ type: 'bpm', payload: bpm - 1, })}
          type="button"
          />
        <input
          className="slider"
          value={bpm}
          max={MAX_BPM}
          min={MIN_BPM}
          onChange={e => dispatch({ type: 'bpm', payload: e.target.value })}
          type="range"
          />
        <button
          className="small-btn icon-plus increase"
          onClick={e => dispatch({ type: 'bpm', payload: bpm + 1, })}
          type="button"
          />
      </div>
    </div>
  );
}
