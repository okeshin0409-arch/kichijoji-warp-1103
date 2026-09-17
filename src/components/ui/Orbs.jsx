import { useMemo } from "react";

// 画面全体に固定表示される、発光オーブと水中の粒子。
// サイト全体の「ふわふわ」の正体になるパーツ。
// 位置・周期は毎回わずかに変えつつ、シード値で固定して
// 再レンダリング時にちらつかないようにしている。

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const ORB_COUNT = 5;
const PARTICLE_COUNT = 40;

export default function Orbs() {
  const orbs = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: ORB_COUNT }, (_, i) => {
      const size = 340 + rand() * 260; // 340〜600px
      return {
        id: i,
        size,
        top: rand() * 90,
        left: rand() * 90,
        duration: 24 + rand() * 22, // 24〜46s
        delay: -rand() * 30,
        opacity: 0.18 + rand() * 0.14, // .18〜.32
        dx1: `${(rand() * 14 - 7).toFixed(1)}%`,
        dy1: `${(rand() * 14 - 10).toFixed(1)}%`,
        dx2: `${(rand() * 14 - 10).toFixed(1)}%`,
        dy2: `${(rand() * 14 - 7).toFixed(1)}%`,
        color: i % 2 === 0 ? "var(--glow-1)" : "var(--glow-2)",
      };
    });
  }, []);

  const particles = useMemo(() => {
    const rand = seededRandom(7);
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const size = 1 + rand() * 2; // 1〜3px
      return {
        id: i,
        size,
        left: rand() * 100,
        duration: 18 + rand() * 22, // 18〜40s
        delay: -rand() * 30,
        drift: `${(rand() * 60 - 30).toFixed(0)}px`,
      };
    });
  }, []);

  return (
    <div className="orbs-field" aria-hidden="true">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="orb"
          style={{
            width: orb.size,
            height: orb.size,
            top: `${orb.top}%`,
            left: `${orb.left}%`,
            opacity: orb.opacity,
            background: `radial-gradient(circle, ${orb.color} 0%, rgba(111,108,240,0) 70%)`,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
            "--dx1": orb.dx1,
            "--dy1": orb.dy1,
            "--dx2": orb.dx2,
            "--dy2": orb.dy2,
            animationName: "orb-float",
          }}
        />
      ))}

      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            "--dur": `${p.duration}s`,
            "--delay": `${p.delay}s`,
            "--drift": p.drift,
          }}
        >
          <div className="particle-dot" />
        </div>
      ))}
    </div>
  );
}
