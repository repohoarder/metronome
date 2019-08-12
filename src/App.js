import React, { useReducer, useEffect, useRef, } from 'react';
import { pause as pauseTimer, setup as setupTimer, start as startTimer, } from './timebase';
import { setup as setupAudio, playTick, } from './audio';
import './fonts/icons/css/settings.css';
import './App.css';

const MIN_BPM = 40;
const MAX_BPM = 200;

const { SET_BPM, TOGGLE_PLAY, } = Object.freeze({
  SET_BPM: 'SET_BPM',
  TOGGLE_PLAY: 'TOGGLE_PLAY',
});

const initialState = {
  bpm: 120,
  counter: 0,
  isRunning: false,
  secondsPerBeat: 0,
};

function appReducer(state, action) {
  switch (action.type) {
    case SET_BPM: {
      const bpm = Math.max(MIN_BPM, Math.min(action.payload, MAX_BPM))
      return {
        ...state,
        bpm,
        secondsPerBeat: 60 / bpm,
      };
    }
    case TOGGLE_PLAY:
      console.log(action.payload);
      return {
        ...state,
        isRunning: action.payload,
      };
    default:
      return state;
  }
}

function useEffectOnce(callback) {
  const didRun = useRef(false);
  useEffect(() => {
    if (!didRun.current) {
      callback();
      didRun.current = true;
    }
  });
}

function scheduleEvents(now, scanStart, scanEnd) {
  const firstBeat = Math.ceil(scanStart / secondsPerBeat);
  const lastBeat = Math.floor(scanEnd / secondsPerBeat);
  
  if (firstBeat <= lastBeat) {
    for (let i = firstBeat; i <= lastBeat; i++) {
      performEvent(i, now);
    }
  }
}

function performEvent(index, now) {
  const delay = Math.max(0, (index * secondsPerBeat) - now);
  const accented = index % 4 === 0;
  playTick(delay, accented);
  setTimeout(
    () => {
      counterEl.textContent = index;
    }, delay * 1000);
}

export default function MetronomeApp() {
  const [ state, dispatch, ] = useReducer(appReducer, initialState);
  const { bpm, counter, } = state;

  useEffectOnce(() => {
    setupTimer(scheduleEvents);
    setupAudio();
  });

  useEffect(() => {});

  return (
    <div className="app">
      <div className="row">
        <div className="counter">{counter}</div>
      </div>
      <div className="row">
        <input
          className="bpm"
          onChange={e => dispatch({ type: SET_BPM, payload: e.target.value })}
          type="number" 
          value={bpm}
          />
        <span className="bpm-label">BPM</span>
        <input
          className="run-toggle"
          onChange={e => dispatch({ type: TOGGLE_PLAY, payload: e.target.value })}
          type="checkbox"
          />
        <label htmlFor="run-toggle"><i className="icon-play"></i></label>
      </div>
      <div className="row">
        <button
          className="small-btn icon-minus decrease"
          onClick={e => dispatch({ type: SET_BPM, payload: bpm - 1, })}
          type="button"
          />
        <input
          className="slider"
          value={bpm}
          max={MAX_BPM}
          min={MIN_BPM}
          onChange={e => dispatch({ type: SET_BPM, payload: e.target.value })}
          type="range"
          />
        <button
          className="small-btn icon-plus increase"
          onClick={e => dispatch({ type: SET_BPM, payload: bpm + 1, })}
          type="button"
          />
      </div>
    </div>
  );
}
