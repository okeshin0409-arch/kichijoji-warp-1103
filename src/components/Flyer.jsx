import { motion } from "framer-motion";
import { EVENT, PERFORMERS } from "../data/eventData.js";
import { isRevealed, getNow } from "../lib/reveal.js";
import SectionTitle from "./ui/SectionTitle.jsx";
import NoWrapPhrase from "./ui/NoWrapPhrase.jsx";
import Tape from "./ui/Tape.jsx";
import { tiltDeg } from "../lib/wobble.js";

const EASE_OUT = [0.16, 1, 0.3, 1];

function LineupRow({ performer, now }) {
  const revealed = isRevealed(performer.revealDate, now);
  return (
    <div className="performer-row">
      {performer.time} {revealed ? `${performer.name}（${performer.unit}）` : (
        <span className="coming-soon">coming soon</span>
      )}
    </div>
  );
}

export default function Flyer() {
  const now = getNow();
  const rotate = tiltDeg(1, 1.8);

  return (
    <section id="flyer" className="pad-normal">
      <div className="container container--narrow">
        <SectionTitle title="フライヤー" align="center" seed={0} />

        <div className="flyer-wrap">
          <motion.div
            className="flyer-poster"
            initial={{ opacity: 0, y: 46, rotate: -3, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, rotate, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
          >
            {EVENT.flyerImage ? (
              <img className="flyer-photo" src={EVENT.flyerImage} alt={EVENT.name} />
            ) : (
              <>
                <div className="flyer-poster-surface" />
                <Tape rotate={-5} top={-12} left={"calc(50% - 32px)"} width={64} />
                <div className="flyer-poster-inner">
                  <div>
                    <div className="flyer-name">
                      <span className="flyer-name-line">
                        {EVENT.nameLines[0]}
                      </span>
                      <span className="flyer-name-line">
                        <NoWrapPhrase tokens={EVENT.nameLine2Tokens} />
                      </span>
                    </div>
                    <div className="flyer-date">{EVENT.dateLabel}</div>
                    <div className="flyer-venue">KICHIJOJI WARP</div>
                    <div className="flyer-schedule">
                      OPEN {EVENT.open} &nbsp;/&nbsp; START {EVENT.start}
                    </div>
                  </div>

                  <div className="flyer-lineup">
                    {PERFORMERS.map((p) => (
                      <LineupRow performer={p} now={now} key={p.order} />
                    ))}
                  </div>

                  <div className="flyer-price">
                    <NoWrapPhrase
                      tokens={[
                        `ADV ${EVENT.price.advance}`,
                        "/",
                        `DOOR ${EVENT.price.door}`,
                        "/",
                        `U23 ${EVENT.price.u23}`,
                      ]}
                    />
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
