import * as React from "react";
import "./cartDetailsStyle.css";
import { useDispatch, useSelector } from "react-redux";
import reactIcon from "../../assets/react.svg";
import {
  addToCart,
  removeItemFromCart,
  removeTotalCart,
} from "../../redux/features/cartSlice";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";
import type { ICartItem } from "../../types";
import { store } from "../../redux/app/store";

const CartDetails: React.FC = () => {
  const { carts }: { carts: ICartItem[] } = useSelector(
    (state: any) => state.allCart
  );

  const dispatch = useDispatch();
  const [showToast, setShowToast] = React.useState(false);

  const addItem = (item: ICartItem) => {
    dispatch(addToCart(item));
  };

  const removeItem = (item: ICartItem) => {
    dispatch(removeItemFromCart(item));

    setTimeout(() => {
      const updateCart = store.getState().allCart.carts;
      console.log("updateCart", updateCart);
      const totalItems = updateCart.reduce((sum: number, i) => sum + i.qnty, 0);

      console.log("TotalItems", totalItems);
      if (totalItems === 0) {
        setShowToast(true);
      }
    }, 0);
  };
  const emptyCart = (e: React.FormEvent) => {
    dispatch(removeTotalCart(e));
    setShowToast(true);
  };

  return (
    <div className="row justify-content-center m-0">
      <ToastContainer position="top-end" className="p-3">
        {showToast && (
          <Toast
            className="d-inline-block m-1"
            onClose={() => setShowToast(false)}
            delay={3000}
            autohide
            bg="danger"
          >
            <Toast.Header>
              <i className="fa fa-shopping-cart" />
              &nbsp;
              <strong className="me-auto text-black">Cart is emptied</strong>
            </Toast.Header>
            <Toast.Body className=" text-white">
              Your cart has been cleared successfully.
            </Toast.Body>
          </Toast>
        )}
      </ToastContainer>
      <div className="col-md-8 mt-5 mb-5 cardsDetails" >
        <div className="card">
          <div className="card-header bg-dark p-3">
            <div
              className="card-header-flex"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
               
              }}
            >
              <h5 style={{ color: "lightgrey", margin: 0 }}>
                Cart Details&nbsp;(
                {carts.reduce((total, item) => total + item?.qnty, 0)})
              </h5>
              {carts.length > 0 && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(cart) => emptyCart(cart)}
                >
                  <i className="fa fa-trash-alt mr-2"></i>
                  <span>Empty Cart</span>
                </button>
              )}
            </div>
          </div>
          <div className="card-body p-0">
            {carts.length === 0 ? (
              <table className="table cart-table mb-0">
                <tbody>
                  <tr>
                    <td>
                      <div className="cart-empty">
                        <i className="fa fa-shopping-cart"></i>
                        <p>Your Cart is Empty</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="table cart-table mb-0 table-responsive-sm">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th className="text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {carts?.map((cartItem, index) => (
                    <tr key={cartItem.id}>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          <i className="fa fa-trash-alt"></i>
                        </button>
                      </td>
                      <td>
                        <div className="product-img">
                          <img
                            src={cartItem.imgdata || reactIcon}
                            alt="product"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="product-name">
                          <p>{cartItem.dish}</p>
                        </div>
                      </td>
                      <td>{cartItem.price}</td>
                      <td>
                        <div className="prdct-qty-container">
                          <button
                            className="prdct-qty-btn"
                            onClick={() => removeItem(cartItem)}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="qty-input-box"
                            disabled
                            value={cartItem?.qnty}
                          />
                          <button
                            className="prdct-qty-btn"
                            onClick={() => addItem(cartItem)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="text-right">
                        {cartItem.qnty * cartItem.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4}></td>
                    <td>
                      Items in Cart:&nbsp;
                      <span className="text-danger">
                        {carts.reduce((total, item) => total + item.qnty, 0)}
                      </span>
                    </td>
                    <td className="text-right">
                      Total Price:
                      <span className="ml-2 text-danger">
                        ₹&nbsp;
                        {carts.reduce(
                          (total, item) => total + item.qnty * item.price,
                          0
                        )}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
