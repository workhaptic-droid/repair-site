import {
  Header,
  Hero,
  Features,
  Services,
  Stats,
  CTA,
  Footer,
} from '@/sections';

function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
