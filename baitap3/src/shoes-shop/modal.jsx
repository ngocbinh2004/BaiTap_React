export default function Modal(props) {
  const { carts, getShoeUpdateQty, shoeDetail } = props;

  const renderCart = () => {
    const newCarts = carts.map((shoe) => {
      return (
        <tr
          key={shoe.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {shoe.id}
          </th>
          <td className="px-6 py-4">{shoe.name}</td>
          <td className="px-6 py-4">
            <img src={shoe.image} alt="hinh" className="w-24" />
          </td>
          <td className="px-10 py-6 flex items-center space-x-2 justify-center">
            <button
              onClick={() => getShoeUpdateQty(shoe.id, false)}
              type="button"
              className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm w-8 h-8 flex items-center justify-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              -
            </button>
            <span className="font-semibold text-lg">{shoe.soLuong}</span>
            <button
              onClick={() => getShoeUpdateQty(shoe.id, true)}
              type="button"
              className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm w-8 h-8 flex items-center justify-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              +
            </button>
          </td>
          <td className="px-6 py-4">$ {shoe.price}</td>
          <td className="px-6 py-4">$ {shoe.soLuong * shoe.price}</td>
        </tr>
      );
    });
    return newCarts;
  };

  const totalQty = () => {
    return carts.reduce((totalQty, phone) => (totalQty += phone.soLuong), 0);
  };

  return (
    <div>
      <div>
        <button
          data-modal-target="default-modal"
          data-modal-toggle="default-modal"
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Giỏ hàng ({totalQty()})
        </button>

        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="flex justify-between items-center pb-4 border-b dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Giỏ hàng của bạn
              </h3>
              <button
                type="button"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                ✕
              </button>
            </div>

            <div className="py-6 space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-4">Mã sản phẩm</th>
                      <th className="px-6 py-4">Tên sản phẩm</th>
                      <th className="px-6 py-4">Hình ảnh</th>
                      <th className="px-6 py-4">Số lượng</th>
                      <th className="px-6 py-4">Đơn giá</th>
                      <th className="px-6 py-4">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>{renderCart()}</tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end space-x-2 border-t pt-4">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-5">
        <div>
          <h1 className="text-center font-bold">{shoeDetail.name}</h1>
          <img src={shoeDetail.image} alt="" />
        </div>
        <div>
          <h1 className="text-center font-bold">Thông tin sản phẩm</h1>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td>Tên giày</td>
                <td>{shoeDetail.name}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td>Alias</td>
                <td>{shoeDetail.alias}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td>price</td>
                <td>{shoeDetail.price}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td>description</td>
                <td>{shoeDetail.description}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td>shortDescription</td>
                <td>{shoeDetail.shortDescription}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td>quantity</td>
                <td>{shoeDetail.quantity}</td>
              </tr>
            </tbody>
          </table>
          <p></p>
        </div>
      </div>
    </div>
  );
}
