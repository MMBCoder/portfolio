"use client";

import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";

const Scene00 = lazy(() => import("./scenes/Scene00Background"));
const Scene01 = lazy(() => import("./scenes/Scene01Customer"));
const Scene02 = lazy(() => import("./scenes/Scene02Channels"));
const SceneAbandoned = lazy(() => import("./scenes/Scene03Abandoned"));
const Scene03 = lazy(() => import("./scenes/Scene03DataSources"));
const Scene04 = lazy(() => import("./scenes/Scene04CDP"));
const Scene05 = lazy(() => import("./scenes/Scene05Profile"));
const Scene06 = lazy(() => import("./scenes/Scene06AIAgents"));
const Scene07 = lazy(() => import("./scenes/Scene07Decision"));
const Scene08 = lazy(() => import("./scenes/Scene08Activation"));
const Scene09 = lazy(() => import("./scenes/Scene09Response"));
const Scene10 = lazy(() => import("./scenes/Scene10Outcomes"));

/* Order mirrors the boardroom script:
   Opportunity → Meet Mirza → Many Signals → Lost Opportunity → Consent →
   Identity → Customer 360 → AI Recommends → Humans Decide → Win-back →
   Beyond Acquisition → The Promise */
const SCENES = [
  Scene00, Scene01, Scene02, SceneAbandoned, Scene03,
  Scene04, Scene05, Scene06, Scene07, Scene08,
  Scene09, Scene10,
];

interface SceneManagerProps {
  scene: number;
  isPlaying: boolean;
  isTransitioning: boolean;
}

function SceneFallback() {
  return (
    <div
      style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      aria-label="Loading scene"
    >
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        border: "2px solid #E5E5E5",
        borderTopColor: "#2563EB",
        animation: "spin 0.7s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function SceneManager({ scene, isPlaying, isTransitioning }: SceneManagerProps) {
  const ActiveScene = SCENES[scene];

  return (
    <div
      style={{ position: "absolute", inset: 0, paddingTop: "68px" }}
      aria-live="off"
    >
      <AnimatePresence mode="wait" initial={false}>
        <Suspense fallback={<SceneFallback />} key={scene}>
          <ActiveScene isPlaying={isPlaying} isTransitioning={isTransitioning} />
        </Suspense>
      </AnimatePresence>
    </div>
  );
}
