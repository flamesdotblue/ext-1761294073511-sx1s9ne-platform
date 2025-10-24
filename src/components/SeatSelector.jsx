function Seat({ label, status, onClick }) {
  const isSelected = status === 'selected';
  const isReserved = status === 'reserved';

  return (
    <button
      aria-label={`Seat ${label} ${status}`}
      onClick={onClick}
      disabled={isReserved}
      className={`relative h-8 w-8 sm:h-9 sm:w-9 rounded-md text-[10px] sm:text-xs font-medium grid place-items-center transition-colors border ${
        isReserved
          ? 'bg-white/10 border-white/10 text-white/30 cursor-not-allowed'
          : isSelected
          ? 'bg-emerald-500 text-black border-emerald-400'
          : 'bg-white/5 border-white/10 hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  );
}

export default function SeatSelector({ rows = 8, cols = 12, reservedSeats, selectedSeats, onToggleSeat }) {
  const labels = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      labels.push({
        r,
        c,
        label: String.fromCharCode(65 + r) + (c + 1),
      });
    }
  }

  return (
    <section id="booking" className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur">
      <div className="flex items-end justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold">Select Seats</h2>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-sm bg-white/10 border border-white/10" />
            <span className="text-white/70">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-sm bg-emerald-500 border border-emerald-400" />
            <span className="text-white/70">Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-sm bg-white/10 border border-white/10 opacity-40" />
            <span className="text-white/70">Reserved</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mx-auto mb-6 h-1 w-3/4 rounded-full bg-gradient-to-r from-emerald-500/80 via-cyan-400/70 to-fuchsia-500/80" />
        <div className="mx-auto mb-8 w-[92%] rounded-b-3xl border-x border-b border-white/10 bg-white/[0.04] px-4 py-2 text-center text-xs text-white/70">
          Screen
        </div>

        <div className="grid grid-cols-12 gap-2 sm:gap-2.5 place-items-center">
          {labels.map(({ r, c, label }) => {
            const reserved = reservedSeats.has(label);
            const selected = selectedSeats.includes(label);
            const isAisle = c === 5 || c === 6; // aisle between 6 and 7
            return (
              <div key={label} className={`${isAisle ? 'mr-3 sm:mr-5' : ''}`}>
                <Seat
                  label={label}
                  status={reserved ? 'reserved' : selected ? 'selected' : 'available'}
                  onClick={() => onToggleSeat(label)}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-between text-xs text-white/50">
          <span>Front</span>
          <span>Back</span>
        </div>
      </div>
    </section>
  );
}
