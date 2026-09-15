import Nav from "./components/Nav";
import Hero from "./components/Hero";
import EventOverview from "./components/EventOverview";
import Timetable from "./components/Timetable";
import Performers from "./components/Performers";
import FleaMarket from "./components/FleaMarket";
import Bar from "./components/Bar";
import Tickets from "./components/Tickets";
import Access from "./components/Access";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <EventOverview />
        <Timetable />
        <Performers />
        <FleaMarket />
        <Bar />
        <Tickets />
        <Access />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

export default App;
