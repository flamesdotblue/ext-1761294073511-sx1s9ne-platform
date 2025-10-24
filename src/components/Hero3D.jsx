import Spline from '@splinetool/react-spline';
import { Ticket } from 'lucide-react';

export default function Hero3D() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zks9uYILDPSX-UX6/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />

      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur">
              <span className="text-xs text-white/70">Immersive 3D</span>
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              <span className="text-xs text-white/70">Holographic Ticket</span>
            </div>
            <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight">
              Book Your Next Movie in Holographic Style
            </h1>
            <p className="mt-4 text-white/70 max-w-xl">
              Experience a futuristic way to reserve seats. Secure your spot, choose your view, and enjoy the show.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 font-medium text-black hover:bg-emerald-400 transition-colors"
              >
                <Ticket className="h-5 w-5" />
                Book Tickets
              </a>
              <a
                href="#showtimes"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 font-medium hover:bg-white/10 transition-colors"
              >
                View Showtimes
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
