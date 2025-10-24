import { Calendar, Clock } from 'lucide-react';

export default function MovieShowtimes({ movies, dates, times, selection, onChange }) {
  return (
    <section id="showtimes" className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur">
      <h2 className="text-xl font-semibold mb-4">Choose Movie & Showtime</h2>
      <div className="grid gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {movies.map((m) => (
            <button
              key={m.id}
              onClick={() => onChange({ movieId: m.id })}
              className={`text-left rounded-xl border p-4 transition-colors ${
                selection.movieId === m.id
                  ? 'border-emerald-400/60 bg-emerald-400/10'
                  : 'border-white/10 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{m.title}</div>
                  <div className="text-xs text-white/60 mt-1">{m.genres.join(' • ')}</div>
                </div>
                <span className="text-xs text-white/60 border border-white/10 rounded px-2 py-0.5">{m.rating}</span>
              </div>
              <div className="text-xs text-white/60 mt-2">{m.duration} min</div>
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Calendar className="h-4 w-4" />
            Select a date
          </div>
          <div className="flex flex-wrap gap-2">
            {dates.map((d) => (
              <button
                key={d.key}
                onClick={() => onChange({ date: d.key })}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  selection.date === d.key
                    ? 'bg-emerald-500 text-black'
                    : 'border border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Clock className="h-4 w-4" />
            Pick a time
          </div>
          <div className="flex flex-wrap gap-2">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => onChange({ time: t })}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  selection.time === t
                    ? 'bg-emerald-500 text-black'
                    : 'border border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
