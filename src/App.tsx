import { Route, Routes } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Seo } from "@/components/layout/Seo";

import Home from "@/pages/Home";
import Technology from "@/pages/Technology";
import Devices from "@/pages/Devices";
import DeviceDetail from "@/pages/DeviceDetail";
import Filters from "@/pages/Filters";
import Industries from "@/pages/Industries";
import IndustryDetail from "@/pages/IndustryDetail";
import Results from "@/pages/Results";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <Seo />
      <Header />

      <main id="main" className="flex-1" style={{ paddingTop: "var(--header-h)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/devices/:slug" element={<DeviceDetail />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/results" element={<Results />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
