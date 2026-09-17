import Orbs from "./components/ui/Orbs.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Countdown from "./components/Countdown.jsx";
import Flyer from "./components/Flyer.jsx";
import EventInfo from "./components/EventInfo.jsx";
import Organizers from "./components/Organizers.jsx";
import Performers from "./components/Performers.jsx";
import Timetable from "./components/Timetable.jsx";
import FleaMarket from "./components/FleaMarket.jsx";
import Bar from "./components/Bar.jsx";
import TicketForm from "./components/TicketForm.jsx";
import Access from "./components/Access.jsx";
import Footer from "./components/Footer.jsx";
import { getPreviewParam } from "./lib/reveal.js";

function PreviewBadge() {
  const preview = getPreviewParam();
  if (!preview) return null;
  return <div className="preview-badge">PREVIEW {preview}</div>;
}

export default function App() {
  return (
    <>
      <Orbs />
      <Nav />

      <Hero />
      <Countdown />
      <Flyer />
      <EventInfo />
      <Organizers />
      <Performers />
      <Timetable />
      <FleaMarket />
      <Bar />
      <TicketForm />
      <Access />
      <Footer />

      <PreviewBadge />
    </>
  );
}
