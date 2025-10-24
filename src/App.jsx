import { useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import MovieShowtimes from './components/MovieShowtimes';
import SeatSelector from './components/SeatSelector';
import BookingPanel from './components/BookingPanel';

const moviesSeed = [
  {
    id: 'neo-odyssey',
    title: 'Neo Odyssey',
    rating: 'PG-13',
    duration: 128,
    genres: ['Sci‑Fi', 'Adventure'],
  },
  {
    id: 'quantum-heist',
    title: 'Quantum Heist',
    rating: 'PG-13',
    duration: 112,
    genres: ['Action', 'Thriller'],
  },
  {
    id: 'lunar-sonata',
    title: 'Lunar Sonata',
    rating: 'PG',
    duration: 104,
    genres: ['Drama', 'Romance'],
  },
];

function getNextDays(n = 5) {
  const days = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push({
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    });
  }
  return days;
}

const times = ['11:00', '14:15', '17:30', '20:45'];

function App() {
  const movies = moviesSeed;
  const dates = useMemo(() => getNextDays(6), []);
  const [selection, setSelection] = useState({
    movieId: movies[0].id,
    date: dates[0].key,
    time: times[2],
    seats: [],
  });

  const showKey = `${selection.movieId}|${selection.date}|${selection.time}`;

  // Deterministic simple hash for reserved seats per show
  const reservedSeats = useMemo(() => {
    const rows = 8;
    const cols = 12;
    const total = rows * cols;
    let hash = 0;
    for (let i = 0; i < showKey.length; i++) hash = (hash * 31 + showKey.charCodeAt(i)) >>> 0;
    const count = 20 + (hash % 20); // 20-39 reserved seats
    const set = new Set();
    for (let i = 0; i < count; i++) {
      hash = (hash * 1664525 + 1013904223) >>> 0;
      const idx = hash % total;
      const r = Math.floor(idx / cols);
      const c = idx % cols;
      const label = String.fromCharCode(65 + r) + (c + 1);
      set.add(label);
    }
    return set;
  }, [showKey]);

  const handleToggleSeat = (label) => {
    setSelection((prev) => {
      const exists = prev.seats.includes(label);
      const seats = exists ? prev.seats.filter((s) => s !== label) : [...prev.seats, label];
      return { ...prev, seats };
    });
  };

  const handleChangeShow = (updates) => {
    setSelection((prev) => {
      const changedMovie = updates.movieId && updates.movieId !== prev.movieId;
      const changedDate = updates.date && updates.date !== prev.date;
      const changedTime = updates.time && updates.time !== prev.time;
      const mustClearSeats = changedMovie || changedDate || changedTime;
      return { ...prev, ...updates, seats: mustClearSeats ? [] : prev.seats };
    });
  };

  const selectedMovie = movies.find((m) => m.id === selection.movieId);

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero3D />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MovieShowtimes
              movies={movies}
              dates={dates}
              times={times}
              selection={selection}
              onChange={handleChangeShow}
            />

            <SeatSelector
              rows={8}
              cols={12}
              reservedSeats={reservedSeats}
              selectedSeats={selection.seats}
              onToggleSeat={handleToggleSeat}
            />
          </div>

          <div className="lg:col-span-1">
            <BookingPanel
              movie={selectedMovie}
              selection={selection}
              times={times}
              dates={dates}
              onChange={handleChangeShow}
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-white/60 flex items-center justify-between">
          <p>© {new Date().getFullYear()} HoloCinema. All rights reserved.</p>
          <p className="hidden sm:block">A futuristic, holographic ticketing experience.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
