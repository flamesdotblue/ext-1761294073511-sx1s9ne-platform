import { useMemo, useState } from 'react';
import { Check, Mail, User } from 'lucide-react';

export default function BookingPanel({ movie, selection, times, dates, onChange }) {
  const [form, setForm] = useState({ name: '', email: '' });

  const price = 13.0; // per seat
  const fees = 1.5; // per order convenience fee

  const dateLabel = useMemo(() => dates.find((d) => d.key === selection.date)?.label ?? '', [dates, selection.date]);

  const subtotal = selection.seats.length * price;
  const total = selection.seats.length > 0 ? subtotal + fees : 0;

  const canBook = form.name.trim() && form.email.includes('@') && selection.seats.length > 0;

  const handleBook = (e) => {
    e.preventDefault();
    if (!canBook) return;
    const ref = Math.random().toString(36).slice(2, 10).toUpperCase();
    alert(
      `Booking Confirmed\n\nReference: ${ref}\nMovie: ${movie.title}\nDate: ${dateLabel}\nTime: ${selection.time}\nSeats: ${selection.seats.join(', ')}\nTotal: $${total.toFixed(2)}`
    );
    // Clear selection after booking
    onChange({});
  };

  return (
    <aside className="sticky top-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur">
      <h3 className="text-lg font-semibold">Your Booking</h3>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-white/60">Movie</span>
          <span className="font-medium">{movie.title}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60">Date</span>
          <span className="font-medium">{dateLabel}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60">Time</span>
          <span className="font-medium">{selection.time}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60">Seats</span>
          <span className="font-medium truncate max-w-[60%] text-right">
            {selection.seats.length ? selection.seats.join(', ') : 'None'}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {times.map((t) => (
          <button
            key={t}
            onClick={() => onChange({ time: t })}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              selection.time === t ? 'bg-emerald-500 text-black' : 'border border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={handleBook} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm text-white/70">Name</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Jane Doe"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-9 py-2.5 outline-none placeholder:text-white/40 focus:border-emerald-400/60"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/70">Email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="jane@example.com"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-9 py-2.5 outline-none placeholder:text-white/40 focus:border-emerald-400/60"
            />
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 text-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white/60">Tickets ({selection.seats.length})</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/60">Convenience fee</span>
            <span className="font-medium">${selection.seats.length ? fees.toFixed(2) : '0.00'}</span>
          </div>
          <div className="flex items-center justify-between text-base pt-1">
            <span className="">Total</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!canBook}
          className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${
            canBook ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
        >
          <Check className="h-5 w-5" />
          Confirm and Pay
        </button>

        <p className="text-[11px] text-white/40">
          By proceeding, you agree to our Terms and acknowledge our Privacy Policy.
        </p>
      </form>
    </aside>
  );
}
