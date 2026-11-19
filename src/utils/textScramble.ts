// Matrix-style character descrambler effect

const CHARS = '!<>-_\\/[]{}—=+*^?#@0123456789ABCDEF';

export function runTextScramble(
  targetText: string,
  onUpdate: (current: string) => void,
  onTick?: () => void,
  onComplete?: () => void,
  durationMs: number = 800
) {
  let frame = 0;
  const totalFrames = Math.max(15, Math.floor(durationMs / 30));
  let isCancelled = false;

  const step = () => {
    if (isCancelled) return;
    frame++;

    const progress = frame / totalFrames;
    const revealedLength = Math.floor(progress * targetText.length);

    let output = '';
    for (let i = 0; i < targetText.length; i++) {
      if (targetText[i] === ' ') {
        output += ' ';
      } else if (i < revealedLength) {
        output += targetText[i];
      } else {
        output += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }

    onUpdate(output);
    if (onTick && frame % 2 === 0) {
      onTick();
    }

    if (frame < totalFrames) {
      setTimeout(step, 30);
    } else {
      onUpdate(targetText);
      if (onComplete) onComplete();
    }
  };

  step();

  return () => {
    isCancelled = true;
  };
}

