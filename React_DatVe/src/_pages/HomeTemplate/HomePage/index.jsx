import React, { useState } from "react";
import Seat from "./Seat";
import "./seat.scss";
import danhSachGhe from "./danhSachGhe.json";

function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSeatSelect = (seat) => {
    if (selectedSeats.includes(seat.soGhe)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.soGhe));
      setTotalPrice(totalPrice - seat.gia);
    } else {
      setSelectedSeats([...selectedSeats, seat.soGhe]);
      setTotalPrice(totalPrice + seat.gia);
    }
  };

  return (
    <div className="app">
      <h1>ĐẶT VÉ XEM PHIM</h1>
      <div className="content">
        {/* Danh sách ghế */}
        <div className="seating-layout">
          {danhSachGhe.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {/* Kiểm tra hàng */}
              {row.danhSachGhe.map((seat, index) => (
                <Seat
                  key={index}
                  seat={seat}
                  isSelected={
                    row.hang !== "" && selectedSeats.includes(seat.soGhe)
                  }
                  onSelect={() => row.hang !== "" && handleSeatSelect(seat)}
                  isRowLabel={row.hang === ""}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Bảng tóm tắt */}
        <div className="summary">
          <h2>Danh sách ghế đã chọn</h2>
          <table>
            <thead>
              <tr>
                <th>Ghế</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {selectedSeats.map((seatCode, index) => {
                const seatInfo = danhSachGhe.flatMap((row) =>
                  row.danhSachGhe.filter((seat) => seat.soGhe === seatCode)
                )[0];
                return (
                  <tr key={index}>
                    <td>{seatInfo.soGhe}</td>
                    <td>{seatInfo.gia.toLocaleString()} VNĐ</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p>
            <strong>Tạm tính: {totalPrice.toLocaleString()} VNĐ</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
