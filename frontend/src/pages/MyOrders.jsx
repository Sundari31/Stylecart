import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { FiPackage } from "react-icons/fi";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/myorders", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (

    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-light mb-10">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-12 text-center border">
            <FiPackage className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500 text-sm">
              You haven’t placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-8">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border"
              >

                {/* ORDER HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Order ID
                    </p>
                    <p className="text-sm font-medium mt-1 break-all">
                      {order._id}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        Total
                      </p>
                      <p className="text-sm font-medium mt-1">
                        ₹{order.totalPrice}
                      </p>
                    </div>

                    <span className="px-3 py-1 text-xs border rounded-full text-green-700 border-green-300 bg-green-50">
                      Placed
                    </span>
                  </div>
                </div>

                {/* ORDER ITEMS */}
                <div className="px-6 py-4 space-y-3">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-700">
                        {item.name} × {item.qty}
                      </span>
                      <span className="text-gray-700">
                        ₹{item.price * item.qty}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ORDER FOOTER */}
                <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500">
                  Ordered on{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>

  );
}

export default MyOrders;
