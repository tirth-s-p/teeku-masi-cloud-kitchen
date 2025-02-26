"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useCart } from "../context/cartContext"; // Import CartContext hook

export default function MenuCheckout() {
  const { cart } = useCart(); // Use cart from context
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.05; // 5% GST
    const total = subtotal + tax; // No delivery fee
    return { subtotal, tax, total };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted!");
    router.push("/payment"); // Placeholder route
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Checkout Section */}
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

        <div className="flex max-h-full">
          {/* Left Side: Personal Info */}
          <div className="flex-1 space-y-6 max-h-full overflow-y-auto">
            <h3 className="text-lg font-semibold">Name</h3>
            <div className="flex space-x-6 mb-2">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/3 p-2 border rounded-md text-md"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/3 p-2 border rounded-md text-md"
                required
              />
            </div>

            {/* Address Section */}
            <h3 className="text-lg font-semibold">Address</h3>
            <div className="flex space-x-6 mb-2">
              <input
                type="text"
                placeholder="Address Line 1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="w-1/2 p-2 border rounded-md text-md"
                required
              />
              <input
                type="text"
                placeholder="Address Line 2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="w-1/2 p-2 border rounded-md text-md"
              />
            </div>
            <div className="flex space-x-6 mb-6">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-1/2 p-2 border rounded-md text-md"
                required
              />
              <input
                type="text"
                placeholder="Zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                className="w-1/2 p-2 border rounded-md text-md"
                required
              />
            </div>

            {/* Contact Section */}
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="flex space-x-6 mb-6">
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-1/3 p-2 border rounded-md text-md"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-1/3 p-2 border rounded-md text-md"
                required
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-1/3 ml-6">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-lg">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <span className="font-semibold">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-xl mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-lg w-full max-w-xs transition"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
