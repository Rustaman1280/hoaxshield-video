import React from "react";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Scene1Opening } from "./Scene1Opening";
import { Scene2ShieldReveal } from "./Scene2ShieldReveal";
import { Scene3Input } from "./Scene3Input";
import { Scene4AIProcess } from "./Scene4AIProcess";
import { Scene5Results } from "./Scene5Results";
import { Scene6Closing } from "./Scene6Closing";

/*
 * HoaxShield Motion Graphic — 2K 60fps
 *
 * Scene timing (at 60fps):
 * Scene 1 - Opening (7s)       = 420 frames
 * Scene 2 - Shield Reveal (7s) = 420 frames
 * Scene 3 - Input (9s)         = 540 frames
 * Scene 4 - AI Process (10s)   = 600 frames
 * Scene 5 - Results (12s)      = 720 frames
 * Scene 6 - Closing (15s)      = 900 frames
 *
 * Transitions: 40+48+48+48+40 = 224 frames subtracted
 * Total: 3600 - 224 = 3376 frames ≈ 56.3s
 */

const FAST_TRANSITION = 40;  // ~0.67s at 60fps
const MED_TRANSITION = 48;   // ~0.8s at 60fps

export const HoaxShieldVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Opening — chaos of hoaxes */}
      <TransitionSeries.Sequence durationInFrames={420}>
        <Scene1Opening />
      </TransitionSeries.Sequence>

      {/* Flash cut to shield reveal */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: FAST_TRANSITION })}
      />

      {/* Scene 2: Shield reveal */}
      <TransitionSeries.Sequence durationInFrames={420}>
        <Scene2ShieldReveal />
      </TransitionSeries.Sequence>

      {/* Slide transition into the app */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: MED_TRANSITION })}
      />

      {/* Scene 3: Input information */}
      <TransitionSeries.Sequence durationInFrames={540}>
        <Scene3Input />
      </TransitionSeries.Sequence>

      {/* Wipe transition for processing */}
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: MED_TRANSITION })}
      />

      {/* Scene 4: AI Processing */}
      <TransitionSeries.Sequence durationInFrames={600}>
        <Scene4AIProcess />
      </TransitionSeries.Sequence>

      {/* Slide up for results */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: MED_TRANSITION })}
      />

      {/* Scene 5: Results */}
      <TransitionSeries.Sequence durationInFrames={720}>
        <Scene5Results />
      </TransitionSeries.Sequence>

      {/* Fade for closing */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: FAST_TRANSITION })}
      />

      {/* Scene 6: Closing */}
      <TransitionSeries.Sequence durationInFrames={900}>
        <Scene6Closing />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
