import React from "react";

function Seat({ seat, isSelected, onSelect, isRowLabel }) {
  if (isRowLabel) {
    return <div className="row-label">{seat.soGhe}</div>;
  }

  const seatClass = seat.daDat
    ? "seat booked"
    : isSelected
    ? "seat selected"
    : "seat available";

  return (
    <div
      className={seatClass}
      onClick={!seat.daDat ? onSelect : undefined}
      title={`Ghế ${seat.soGhe}`}
    >
      {seat.soGhe}
    </div>
  );
}

export default Seat;
