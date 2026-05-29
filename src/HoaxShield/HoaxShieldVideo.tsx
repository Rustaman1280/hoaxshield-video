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
 * HoaxShield Motion Graphic — Dynamic Version
 *
 * Scene timing (at 30fps):
 * Scene 1 - Opening (7s)       = 210 frames
 * Scene 2 - Shield Reveal (7s) = 210 frames
 * Scene 3 - Input (9s)         = 270 frames
 * Scene 4 - AI Process (10s)   = 300 frames
 * Scene 5 - Results (12s)      = 360 frames
 * Scene 6 - Closing (15s)      = 450 frames
 *
 * Transitions: mix of fade, slide, wipe with spring timing
 * Total ≈ 57.5 seconds
 */

const FAST_TRANSITION = 20;  // ~0.67s
const MED_TRANSITION = 24;   // ~0.8s

export const HoaxShieldVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Opening — chaos of hoaxes */}
      <TransitionSeries.Sequence durationInFrames={210}>
        <Scene1Opening />
      </TransitionSeries.Sequence>

      {/* Flash cut to shield reveal */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: FAST_TRANSITION })}
      />

      {/* Scene 2: Shield reveal */}
      <TransitionSeries.Sequence durationInFrames={210}>
        <Scene2ShieldReveal />
      </TransitionSeries.Sequence>

      {/* Slide transition into the app */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: MED_TRANSITION })}
      />

      {/* Scene 3: Input information */}
      <TransitionSeries.Sequence durationInFrames={270}>
        <Scene3Input />
      </TransitionSeries.Sequence>

      {/* Wipe transition for processing */}
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: MED_TRANSITION })}
      />

      {/* Scene 4: AI Processing */}
      <TransitionSeries.Sequence durationInFrames={300}>
        <Scene4AIProcess />
      </TransitionSeries.Sequence>

      {/* Slide up for results */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: MED_TRANSITION })}
      />

      {/* Scene 5: Results */}
      <TransitionSeries.Sequence durationInFrames={360}>
        <Scene5Results />
      </TransitionSeries.Sequence>

      {/* Fade for closing */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: FAST_TRANSITION })}
      />

      {/* Scene 6: Closing */}
      <TransitionSeries.Sequence durationInFrames={450}>
        <Scene6Closing />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
