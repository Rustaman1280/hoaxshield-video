import "./index.css";
import { Composition } from "remotion";
import { HoaxShieldVideo } from "./HoaxShield/HoaxShieldVideo";

/*
 * HoaxShield Motion Graphic Video — 2K 60fps
 *
 * Resolution: 2560x1440 (2K / QHD)
 * FPS: 60
 *
 * Duration calculation:
 * Scene 1: 420 frames (7s)
 * Scene 2: 420 frames (7s)
 * Scene 3: 540 frames (9s)
 * Scene 4: 600 frames (10s)
 * Scene 5: 720 frames (12s)
 * Scene 6: 900 frames (15s)
 * Transitions: 40+48+48+48+40 = 224 frames subtracted
 * Total: 3600 - 224 = 3376 frames ≈ 56.3s
 */

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HoaxShield"
        component={HoaxShieldVideo}
        durationInFrames={3376}
        fps={60}
        width={2560}
        height={1440}
      />
    </>
  );
};
