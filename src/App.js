import React, { useReducer, useContext, useEffect, useRef, } from 'react';
import './fonts/icons/css/settings.css';
import './App.css';

export default function MetronomeApp() {
  return (
    <div className="app">
      <div className="row">
        <div className="counter">0</div>
      </div>
      <div className="row">
        <input type="number" defaultValue="" className="bpm" />
        <span className="bpm-label">BPM</span>
        <input type="checkbox" className="run-toggle" />
        <label htmlFor="run-toggle"><i className="icon-play"></i></label>
      </div>
      <div className="row">
        <button type="button" className="small-btn icon-minus decrease"></button>
        <input type="range" min="40" max="208" defaultValue="" className="slider" />
        <button type="button" className="small-btn icon-plus increase"></button>
      </div>
    </div>
  );
}
