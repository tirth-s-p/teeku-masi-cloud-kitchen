"use client"; // Ensure this is client-side code

import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";

export default function Navbar({ cart, setCart }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false); // Cart dropdown state
  const router = useRouter();

  // Fetch admin or user information based on authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // Check if the user is an admin by querying Firestore
        const adminQuery = query(
          collection(db, "admins"),
          where("email", "==", authUser.email) // Match admin by email
        );
        const adminSnapshot = await getDocs(adminQuery);

        if (!adminSnapshot.empty) {
          const adminData = adminSnapshot.docs[0].data();
          setAdmin({
            ...authUser,
            adminCode: adminData.code,
            name: adminData.firstName + " " + adminData.lastName,
          });
          setUser(null); // Ensure user state is cleared
        } else {
          // If not an admin, treat as a normal user
          setUser(authUser);
          setAdmin(null); // Ensure admin state is cleared
        }
      } else {
        setUser(null);
        setAdmin(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setAdmin(null);
      router.push("/"); // Redirect to home
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
    const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || "";
    return firstInitial + lastInitial;
  };

  return (
    <header className="px-5 flex justify-between bg-gray-100 items-center">
      <div>
        <Image
          src="/teeku-masi-logo.png"
          alt="Teeku Masi Logo"
          width={100}
          height={20}
          className="object-contain hover:cursor-pointer"
          onClick={() => (window.location.href = "/")}
        />
      </div>
      <div className="flex items-center space-x-4">
        {/* Cart Button */}
        <div className="relative bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 rounded-full">
          {cart.length > 0 && (
            <button
              onClick={() => setCartDropdownOpen(!cartDropdownOpen)}
              className="flex items-center space-x-2"
            >
              <span className="">Cart</span>
              {Array.isArray(cart) && cart.length > 0 && (
                <span className="bg-white text-black rounded-full px-2 text-sm">
                  {cart.length}
                </span>
              )}
            </button>
          )}

          {cartDropdownOpen && cart.length > 0 && (
            <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded-md w-48 max-w-xs p-2">
              <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
              <ul>
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center mt-2"
                  >
                    {item.name} - ${item.price}
                    <button
                      onClick={() =>
                        setCart(cart.filter((i) => i.id !== item.id))
                      }
                      className="text-red-500 ml-4"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push("/checkout")}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
        {admin ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-600 text-white flex items-center justify-center text-lg">
                {getInitials(admin.name)}
              </div>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48 max-w-xs p-2">
                <p className="text-gray-800 text-sm font-medium">
                  {admin.name}
                  {" (Admin)"}
                </p>
                <p className="text-gray-600 text-xs">
                  Admin Code: {admin.adminCode}
                </p>
                <button
                  onClick={handleLogout}
                  className="mt-2 w-full bg-red-600 text-white py-2 rounded-full text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-600 text-white flex items-center justify-center text-lg">
                {getInitials(user.displayName || user.email)}
              </div>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48 max-w-xs p-2">
                <p className="text-gray-800 text-sm font-medium">
                  {user.displayName || "User"}
                </p>
                <p className="text-gray-600 text-xs">{user.email}</p>
                <Link
                  href="/my-subscriptions"
                  className="block mt-2 text-center bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-full text-sm"
                >
                  My Subscriptions
                </Link>
                <button
                  onClick={handleLogout}
                  className="mt-2 w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded-full text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link
              href="/admin-login"
              className="bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 rounded-full"
            >
              Admin
            </Link>
            <Link
              href="/signin"
              className="bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 rounded-full"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
