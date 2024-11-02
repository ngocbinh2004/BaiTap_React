import Shoe from "./shoe";
import data from "./data.json";
import { useState } from "react";
import Modal from "./modal";

export default function ShoeShop() {
  const [state, setState] = useState({
    shoes: data,
    shoeDetail: data[0],
    carts: [],
  });

  const renderListShoes = () => {
    const { shoes } = state;
    const newShoes = shoes.map((item) => {
      return (
        <Shoe
          key={item.id}
          data={item}
          getShoeDetail={handleGetDetail}
          getShoeAddToCart={handleGetShoeAddToCart}
        />
      );
    });
    return newShoes;
  };

  const handleGetDetail = (data) => {
    setState({
      ...state,
      shoeDetail: data,
    });
  };

  const _findIndex = (id) => {
    const index = state.carts.findIndex((item) => item.id === id);
    return index;
  };

  const handleGetShoeAddToCart = (data) => {
    const newCarts = [...state.carts];
    const shoeAddToCart = {
      ...data,
      soLuong: 1,
    };

    const index = _findIndex(shoeAddToCart.id);
    if (index !== -1) {
      newCarts[index].soLuong += 1;
    } else {
      newCarts.push(shoeAddToCart);
    }
    setState({
      ...state,
      carts: newCarts,
    });
  };

  const handleUpdateQty = (id, type) => {
    const newCarts = [...state.carts];
    const index = _findIndex(id);
    if (index !== -1) {
      if (type) {
        newCarts[index].soLuong += 1;
      } else {
        if (newCarts[index].soLuong > 1) {
          newCarts[index].soLuong -= 1;
        } else {
          newCarts.splice(index, 1);
        }
      }
    }

    setState({
      ...state,
      carts: newCarts,
    });
  };

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-center font-bold">Shoe Shop</h1>
      </div>
      <Modal
        carts={state.carts}
        getShoeUpdateQty={handleUpdateQty}
        shoeDetail={state.shoeDetail}
      />
      <hr />
      <div className="mt-5 grid grid-cols-3 gap-5">{renderListShoes()}</div>
    </div>
  );
}
