// Web Audio API Synthesizer for Mario Kart Style Gamified Sound Effects & Melodies

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a single note with retro Mario-style synth options
 */
function playSynthNote(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  type: OscillatorType = "square",
  gainVal: number = 0.05,
  endFreq?: number
) {
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    if (endFreq && endFreq !== freq) {
      osc.frequency.linearRampToValueAtTime(endFreq, startTime + duration);
    }

    // Warm retro lowpass filter
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2800, startTime);

    // Envelope
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(gainVal, startTime + Math.min(0.02, duration * 0.2));
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  } catch (e) {
    console.warn("Audio note play error:", e);
  }
}

/**
 * Play a chord with retro synth feel
 */
function playSynthChord(
  ctx: AudioContext,
  freqs: number[],
  startTime: number,
  duration: number,
  type: OscillatorType = "square",
  gainVal: number = 0.04
) {
  freqs.forEach(freq => {
    playSynthNote(ctx, freq, startTime, duration, type, gainVal / freqs.length);
  });
}

// 1. BUTTON / SELECTION CLICK
export function playClickSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    // Quick Mario menu double-blip
    playSynthNote(ctx, 659.25, now, 0.06, "square", 0.04); // E5
    playSynthNote(ctx, 987.77, now + 0.06, 0.08, "square", 0.05); // B5
  } catch (e) {
    console.warn(e);
  }
}

// 2. LOCK / CONFIRM SELECTION
export function playLockSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    // Mario Kart Course confirm chime
    playSynthNote(ctx, 783.99, now, 0.08, "triangle", 0.05); // G5
    playSynthNote(ctx, 1174.66, now + 0.07, 0.12, "square", 0.05); // D6
    playSynthNote(ctx, 1567.98, now + 0.14, 0.18, "square", 0.06); // G6
  } catch (e) {
    console.warn(e);
  }
}

// 3. SUCCESS / CORRECT ANSWER (Mario Kart Item Box Roulette Finish)
export function playSuccessSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    // Catchy upbeat Mario Kart item box speed boost jingle
    const notes = [
      { f: 523.25, d: 0.07 }, // C5
      { f: 659.25, d: 0.07 }, // E5
      { f: 783.99, d: 0.07 }, // G5
      { f: 1046.50, d: 0.09 }, // C6
      { f: 1318.51, d: 0.09 }, // E6
      { f: 1567.98, d: 0.25 }, // G6
    ];

    let t = now;
    notes.forEach((n) => {
      playSynthNote(ctx, n.f, t, n.d, "square", 0.05);
      t += n.d;
    });

    // High sparkling chime on top
    playSynthNote(ctx, 2093.00, now + 0.35, 0.3, "triangle", 0.04);
  } catch (e) {
    console.warn(e);
  }
}

// 4. QUESTION TRANSITION (Mario Kart Turbo Drift / Speed Pad)
export function playTransitionSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    // Ascending pentatonic boost run (~0.8s)
    const run = [349.23, 440.00, 523.25, 587.33, 698.46, 880.00, 1046.50, 1396.91];
    run.forEach((f, idx) => {
      playSynthNote(ctx, f, now + idx * 0.06, 0.12, "triangle", 0.04);
    });
  } catch (e) {
    console.warn(e);
  }
}

// 5. SUSPENSE (Mario Kart Blue Shell / Danger Warning)
export function playSuspenseSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Pulsing bass thuds + warning sirens (~1.6s)
    const pulses = [0, 0.2, 0.4, 0.6];
    pulses.forEach((pDelay) => {
      playSynthNote(ctx, 110, now + pDelay, 0.12, "sawtooth", 0.06, 55); // Bass drop
      playSynthNote(ctx, 622.25, now + pDelay + 0.05, 0.08, "square", 0.04); // Eb5 warning chime
    });

    // Climax warning pitch rise
    playSynthNote(ctx, 440.00, now + 0.8, 0.12, "square", 0.05);
    playSynthNote(ctx, 523.25, now + 0.95, 0.12, "square", 0.05);
    playSynthNote(ctx, 622.25, now + 1.1, 0.12, "square", 0.05);
    playSynthNote(ctx, 739.99, now + 1.25, 0.35, "square", 0.06, 880);
  } catch (e) {
    console.warn(e);
  }
}

// 6. REWARD UNLOCKED (Mario Kart Grand Prix Trophy / Item Unlocked Fanfare)
export function playRewardSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Rich multi-bar Mario Kart reward fanfare (~2.5s duration)
    // Phrase 1: C major arpeggio run
    const arpeggio1 = [261.63, 329.63, 392.00, 523.25];
    arpeggio1.forEach((f, i) => {
      playSynthNote(ctx, f, now + i * 0.06, 0.1, "square", 0.05);
    });

    // Phrase 2: F major arpeggio run
    const arpeggio2 = [349.23, 440.00, 523.25, 698.46];
    arpeggio2.forEach((f, i) => {
      playSynthNote(ctx, f, now + 0.3 + i * 0.06, 0.1, "square", 0.05);
    });

    // Phrase 3: G major arpeggio run
    const arpeggio3 = [392.00, 493.88, 587.33, 783.99];
    arpeggio3.forEach((f, i) => {
      playSynthNote(ctx, f, now + 0.6 + i * 0.06, 0.1, "square", 0.05);
    });

    // Triumphant Fanfare ending melody
    const melody = [
      { f: 1046.50, t: now + 0.9, d: 0.15 }, // C6
      { f: 1318.51, t: now + 1.05, d: 0.15 }, // E6
      { f: 1567.98, t: now + 1.2, d: 0.2 }, // G6
      { f: 2093.00, t: now + 1.4, d: 0.8 }, // C7 held
    ];

    melody.forEach((m) => {
      playSynthNote(ctx, m.f, m.t, m.d, "square", 0.06);
    });

    // Underlying celebratory brass chord
    playSynthChord(ctx, [523.25, 659.25, 783.99, 1046.50], now + 1.4, 0.8, "triangle", 0.08);
  } catch (e) {
    console.warn(e);
  }
}

// 7. STAGE/GAME COMPLETION (Classic Mario Kart Stage Theme Intro Motif)
export function playCompletionSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Classic Mario stage melody theme! (~2.2s)
    const theme = [
      { f: 659.25, t: now + 0.0, d: 0.12 },  // E5
      { f: 659.25, t: now + 0.15, d: 0.12 }, // E5
      { f: 659.25, t: now + 0.35, d: 0.12 }, // E5
      { f: 523.25, t: now + 0.50, d: 0.12 }, // C5
      { f: 659.25, t: now + 0.65, d: 0.15 }, // E5
      { f: 783.99, t: now + 0.85, d: 0.35 }, // G5
      { f: 392.00, t: now + 1.30, d: 0.40 }, // G4
    ];

    theme.forEach((n) => {
      playSynthNote(ctx, n.f, n.t, n.d, "square", 0.05);
    });

    // Harmony line
    playSynthNote(ctx, 329.63, now + 0.85, 0.35, "triangle", 0.04);
    playSynthNote(ctx, 196.00, now + 1.30, 0.40, "triangle", 0.04);
  } catch (e) {
    console.warn(e);
  }
}

// 8. EPIC WIN / 100% COMPATIBILITY VICTORY (Mario Kart 1st Place Rainbow Road Podium Fanfare!)
export function playEpicWinSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Grand Mario Kart 1st Place Victory Fanfare Jingle (~4.0s duration!)
    
    // Part 1: Brass triad intro stabs
    // Stab 1
    playSynthChord(ctx, [523.25, 659.25, 783.99], now + 0.0, 0.14, "square", 0.07);
    // Stab 2
    playSynthChord(ctx, [523.25, 659.25, 783.99], now + 0.18, 0.14, "square", 0.07);
    // Stab 3
    playSynthChord(ctx, [523.25, 659.25, 783.99], now + 0.36, 0.22, "square", 0.08);

    // Stab 4
    playSynthChord(ctx, [587.33, 739.99, 880.00], now + 0.65, 0.14, "square", 0.07);
    // Stab 5
    playSynthChord(ctx, [587.33, 739.99, 880.00], now + 0.83, 0.14, "square", 0.07);
    // Stab 6
    playSynthChord(ctx, [659.25, 830.61, 987.77], now + 1.01, 0.25, "square", 0.08);

    // Part 2: Soaring Victory Lead Melody
    const leadNotes = [
      { f: 783.99, t: now + 1.35, d: 0.18 },  // G5
      { f: 1046.50, t: now + 1.55, d: 0.18 }, // C6
      { f: 1318.51, t: now + 1.75, d: 0.18 }, // E6
      { f: 1567.98, t: now + 1.95, d: 0.22 }, // G6
      { f: 1760.00, t: now + 2.20, d: 0.18 }, // A6
      { f: 1567.98, t: now + 2.40, d: 0.18 }, // G6
      { f: 1318.51, t: now + 2.60, d: 0.18 }, // E6
      { f: 1046.50, t: now + 2.80, d: 0.18 }, // C6
      { f: 1174.66, t: now + 3.00, d: 0.18 }, // D6
      { f: 1046.50, t: now + 3.20, d: 0.80 }, // C6 (Finale)
    ];

    leadNotes.forEach((n) => {
      playSynthNote(ctx, n.f, n.t, n.d, "square", 0.06);
    });

    // Grand final sustain chord [C4, G4, C5, E5, G5, C6]
    playSynthChord(
      ctx,
      [261.63, 392.00, 523.25, 659.25, 783.99, 1046.50],
      now + 3.20,
      1.2,
      "triangle",
      0.09
    );

    // High sparkling arpeggio sweep over finale chord
    const arpeggio = [1046.50, 1318.51, 1567.98, 2093.00, 2637.02];
    arpeggio.forEach((f, i) => {
      playSynthNote(ctx, f, now + 3.25 + i * 0.07, 0.25, "square", 0.03);
    });
  } catch (e) {
    console.warn(e);
  }
}

// 9. FAIL / WRONG ANSWER (Mario Kart Spin Out / Banana Slip / Sad Finish Melody)
export function playFailSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Mario Kart Spin-Out / Wha-wha-wha-waaaaah descending chromatic melody (~1.8s)
    const wahNotes = [
      { f: 622.25, endF: 587.33, t: now + 0.0, d: 0.28 },  // Eb5 -> D5 bend
      { f: 587.33, endF: 554.37, t: now + 0.32, d: 0.28 }, // D5 -> C#5 bend
      { f: 554.37, endF: 523.25, t: now + 0.64, d: 0.28 }, // C#5 -> C5 bend
      { f: 523.25, endF: 392.00, t: now + 0.96, d: 0.70 }, // C5 -> G4 low slide
    ];

    wahNotes.forEach((n) => {
      playSynthNote(ctx, n.f, n.t, n.d, "sawtooth", 0.05, n.endF);
    });

    // Wobble vibrato effect on final note
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(8, now + 0.96); // 8Hz wobble
    lfoGain.gain.setValueAtTime(15, now + 0.96);
    
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = "sawtooth";
    bassOsc.frequency.setValueAtTime(261.63, now + 0.96);
    bassOsc.frequency.linearRampToValueAtTime(196.00, now + 1.66);
    
    lfo.connect(bassOsc.frequency);
    
    bassGain.gain.setValueAtTime(0.04, now + 0.96);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.66);
    
    bassOsc.connect(bassGain);
    bassGain.connect(ctx.destination);
    
    lfo.start(now + 0.96);
    bassOsc.start(now + 0.96);
    lfo.stop(now + 1.66);
    bassOsc.stop(now + 1.66);
  } catch (e) {
    console.warn(e);
  }
}
