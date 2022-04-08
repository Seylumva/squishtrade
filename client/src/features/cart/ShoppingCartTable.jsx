import { AdvancedImage } from "@cloudinary/react";
import { getListingImage } from "../../utils/cloudinaryConfig";
import { FaTrash } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { removeItem } from "./cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ShoppingCartTable = ({ cart }) => {
  const subtotal = cart.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.price;
  }, 0);
  const taxes = cart.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.price * 0.0875;
  }, 0);
  const total = subtotal + taxes;

  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast.success("Successfully removed item.");
  };

  const handleCheckout = () => {
    toast.info("This is only a prototype.");
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-3">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="hover">
              <td>
                <AdvancedImage
                  cldImg={getListingImage(item.images[0])}
                  className="mask mask-squircle w-20 h-w-20"
                />
              </td>
              <td>
                <Link to={`/listing/${item.id}`}>{item.title}</Link>
              </td>
              <td>${item.price}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-error btn-sm"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className="text-right space-y-1">
              <p className="text-sm text-slate-400">
                Subtotal: ${subtotal.toFixed(2)}
              </p>
              <p className="text-sm text-slate-400">Tax: ${taxes.toFixed(2)}</p>
              <p className="text-xl">Total: ${total.toFixed(2)}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={handleCheckout}
        className="btn btn-primary gap-2 ml-auto flex mt-3"
        type="button"
      >
        <BsFillBagCheckFill /> Checkout
      </button>
    </div>
  );
};

export default ShoppingCartTable;
