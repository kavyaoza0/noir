/**
 * Minimalist Web Audio Engine for NOIR / FORM
 * Generates an ambient sub-frequency drone and subtle micro-clicks.
 * 100% self-contained, no external audio files required.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.0001, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.06, now + 2); // Soft volume

      // Low frequency warm drone
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(55, now); // A1 note

      // Gentle harmonic overtone
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(110, now); // A2 note

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);

      this.osc1.connect(filter);
      this.osc2.connect(filter);
      filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc1.start(now);
      this.osc2.start(now);

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.ctx || !this.gainNode) {
      this.isPlaying = false;
      return;
    }
    try {
      const now = this.ctx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
        } catch {
          // ignore cleanup errors
        }
      }, 900);
      this.isPlaying = false;
    } catch {
      this.isPlaying = false;
    }
  }

  public playClick(freq = 800) {
    if (!this.isPlaying || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.05);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }
}

export const soundEngine = new SoundEngine();
