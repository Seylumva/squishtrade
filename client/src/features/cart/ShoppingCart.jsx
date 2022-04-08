import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { FaCartArrowDown } from "react-icons/fa";
import ShoppingCartTable from "./ShoppingCartTable";

const ShoppingCart = () => {
  const { cart } = useSelector((state) => state);
  return (
    <>
      <Helmet>
        <title>Shopping Cart | Squishtrade</title>
      </Helmet>
      <div className="min-h-screen bg-base-200 w-full py-12">
        <h1 className="text-center text-2xl">
          Shopping Cart <FaCartArrowDown className="ml-3 inline-block" />
        </h1>
        {cart.length === 0 ? (
          <h2 className="text-center text-md mt-5">
            You have no items in your shopping cart.
          </h2>
        ) : (
          <ShoppingCartTable cart={cart} />
        )}
      </div>
      <div />
    </>
  );
};

export default ShoppingCart;
