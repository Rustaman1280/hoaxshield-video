import "./index.css";
import { Composition } from "remotion";
import { HoaxShieldVideo } from "./HoaxShield/HoaxShieldVideo";

/*
 * HoaxShield Motion Graphic Video
 *
 * Duration calculation:
 * Scene 1: 210 frames (7s)
 * Scene 2: 210 frames (7s)
 * Scene 3: 270 frames (9s)
 * Scene 4: 300 frames (10s)
 * Scene 5: 360 frames (12s)
 * Scene 6: 450 frames (15s)
 * Transitions: 20+24+24+24+20 = 112 frames subtracted
 * Total: 1800 - 112 = 1688 frames ≈ 56.3s
 */

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HoaxShield"
        component={HoaxShieldVideo}
        durationInFrames={1688}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
