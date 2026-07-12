"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import type { Group } from "three";
import { useRagStore } from "./ragStore";
import { queryCoord } from "./lib/pipeline";
import { T } from "./theme";

const SCALE = 1.25;

function colorFor(p: [number, number, number], retrieved: boolean): string {
  if (retrieved) return "#34D399";
  const hue = 205 + p[0] * 55 + p[1] * 25;   // clusters drift through blue → violet
  return `hsl(${Math.round(hue)}, 82%, 64%)`;
}

function PointCloud() {
  const group = useRef<Group>(null);
  const chunks = useRagStore(s => s.chunks);
  const coords = useRagStore(s => s.coords3);
  const results = useRagStore(s => s.results);
  const candidates = useRagStore(s => s.candidates);
  const queryVec = useRagStore(s => s.queryVec);
  const setHoverChunk = useRagStore(s => s.setHoverChunk);
  const [hover, setHover] = useState<number | null>(null);  // index into coords

  const retrieved = useMemo(() => new Set(results), [results]);
  const qPos = useMemo(() => {
    if (!queryVec) return null;
    const c = queryCoord();
    return c ? ([c[0] * SCALE, c[1] * SCALE, c[2] * SCALE] as [number, number, number]) : null;
  }, [queryVec]);

  const simById = useMemo(
    () => new Map(candidates.map(c => [c.chunkId, c.semantic])),
    [candidates],
  );

  useFrame((_, dt) => {
    if (group.current && hover === null) group.current.rotation.y += dt * 0.22;
  });

  return (
    <group ref={group}>
      {coords.map((p, i) => {
        const chunk = chunks[i];
        const isHit = retrieved.has(chunk.id);
        const isHover = hover === i;
        return (
          <mesh
            key={chunk.id}
            position={[p[0] * SCALE, p[1] * SCALE, p[2] * SCALE]}
            onPointerOver={(e) => { e.stopPropagation(); setHover(i); setHoverChunk(chunk.id); }}
            onPointerOut={() => { setHover(null); setHoverChunk(null); }}
          >
            <sphereGeometry args={[isHit ? 0.075 : 0.052, 18, 18]} />
            <meshStandardMaterial
              color={colorFor(p, isHit)}
              emissive={colorFor(p, isHit)}
              emissiveIntensity={isHit ? 0.9 : isHover ? 0.8 : 0.35}
            />
            {isHover && (
              <Html distanceFactor={4.5} style={{ pointerEvents: "none" }}>
                <div style={{
                  width: 240, padding: "10px 12px", borderRadius: 10,
                  background: "rgba(17,17,17,0.94)", border: "1px solid rgba(255,255,255,0.18)",
                  fontFamily: T.mono, fontSize: 11.5, color: "#C9CFDA", lineHeight: 1.55,
                  transform: "translate(14px, -50%)",
                }}>
                  <span style={{ color: isHit ? "#34D399" : "#60A5FA" }}>
                    chunk {chunk.id} · p.{chunk.page} · {chunk.tokens} tok
                    {simById.has(chunk.id) ? ` · sim ${(simById.get(chunk.id)! * 100).toFixed(0)}%` : ""}
                  </span>
                  <br />{chunk.text.slice(0, 110)}…
                </div>
              </Html>
            )}
          </mesh>
        );
      })}

      {qPos && (
        <>
          <mesh position={qPos}>
            <octahedronGeometry args={[0.1]} />
            <meshStandardMaterial color={T.amber} emissive={T.amber} emissiveIntensity={1.1} />
          </mesh>
          {coords.map((p, i) =>
            retrieved.has(chunks[i].id) ? (
              <Line
                key={`l-${chunks[i].id}`}
                points={[qPos, [p[0] * SCALE, p[1] * SCALE, p[2] * SCALE]]}
                color="#34D399"
                lineWidth={1}
                transparent
                opacity={0.5}
              />
            ) : null,
          )}
        </>
      )}
    </group>
  );
}

export default function EmbeddingSpace({ height = 260 }: { height?: number }) {
  const n = useRagStore(s => s.coords3.length);
  if (n === 0) {
    return (
      <div style={{
        height, display: "flex", alignItems: "center", justifyContent: "center",
        border: `1.5px dashed ${T.borderStrong}`, borderRadius: 12, background: T.inset,
        fontFamily: T.mono, fontSize: 12.5, color: T.fgMuted,
      }}>
        run the pipeline to populate the semantic space
      </div>
    );
  }
  return (
    <div style={{ height, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}`, background: "radial-gradient(ellipse at center, #10141d 0%, #0A0C10 100%)" }}>
      <Canvas camera={{ position: [0, 0.6, 3.1], fov: 46 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.55} />
        <pointLight position={[4, 4, 4]} intensity={60} />
        <PointCloud />
      </Canvas>
    </div>
  );
}
