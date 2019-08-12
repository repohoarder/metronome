let ctx, gain;

export function setup() {
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  gain = ctx.createGain();
  gain.connect(ctx.destination);
}

export function playTick(delay, accented) {
  const when = ctx.currentTime + delay;

  gain.gain.setValueAtTime(0.5, when);
  gain.gain.exponentialRampToValueAtTime(0.00001, when + 0.15);

  const osc = ctx.createOscillator();
  osc.frequency.setValueAtTime(accented ? 880 : 440, when);
  osc.connect(gain);
  osc.start(when);
  osc.stop(when + 0.05);
}
