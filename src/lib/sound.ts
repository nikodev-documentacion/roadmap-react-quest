/**
 * 8-bit retro sound effects via Web Audio API.
 * Lazily initialises AudioContext on first user interaction (browser policy).
 */
class RetroSoundEngine {
  private ctx: AudioContext | null = null;
  public muted = false;

  init() {
    if (this.ctx) return;
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    try {
      this.ctx = new Ctx();
    } catch {
      // ignore - audio not critical
    }
  }

  private beep(opts: {
    freq?: number;
    duration?: number;
    type?: OscillatorType;
    volume?: number;
    slide?: number;
  }) {
    if (this.muted || !this.ctx) return;
    const { freq = 440, duration = 0.1, type = "square", volume = 0.15, slide = 0 } = opts;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    if (slide) {
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(20, freq + slide),
        this.ctx.currentTime + duration,
      );
    }
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  next() {
    this.init();
    this.beep({ freq: 660, duration: 0.06, slide: 220 });
    setTimeout(() => this.beep({ freq: 880, duration: 0.08, slide: 220 }), 60);
  }

  prev() {
    this.init();
    this.beep({ freq: 440, duration: 0.06, slide: -120 });
    setTimeout(() => this.beep({ freq: 330, duration: 0.08, slide: -100 }), 60);
  }

  arrive() {
    this.init();
    this.beep({ freq: 523, duration: 0.08 });
    setTimeout(() => this.beep({ freq: 659, duration: 0.08 }), 90);
    setTimeout(() => this.beep({ freq: 784, duration: 0.08 }), 180);
    setTimeout(() => this.beep({ freq: 1046, duration: 0.18 }), 270);
  }

  victory() {
    this.init();
    // Triumphant fanfare - C major arpeggio cascade
    const seq = [
      { freq: 523, t: 0, d: 0.1 },     // C5
      { freq: 659, t: 90, d: 0.1 },    // E5
      { freq: 784, t: 180, d: 0.1 },   // G5
      { freq: 1046, t: 270, d: 0.1 },  // C6
      { freq: 784, t: 380, d: 0.08 },  // G5
      { freq: 1046, t: 460, d: 0.08 }, // C6
      { freq: 1318, t: 540, d: 0.4, vol: 0.18 }, // E6 hold
    ];
    seq.forEach(({ freq, t, d, vol }) => {
      setTimeout(() => this.beep({ freq, duration: d, volume: vol ?? 0.15 }), t);
    });
  }

  click() {
    this.init();
    this.beep({ freq: 880, duration: 0.04, volume: 0.08 });
  }
}

export const retroSound = new RetroSoundEngine();
