"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

// Categorized menu items (No images)
const menuCategories = {
  Starters: [
    {
      id: 1,
      name: "Spring Rolls",
      price: 120,
      image: "/images/spring-rolls.jpeg",
    },
    {
      id: 2,
      name: "Paneer Tikka",
      price: 220,
      image: "/images/paneer-tikka.jpg",
    },
  ],
  "Main Course": [
    {
      id: 3,
      name: "Paneer Butter Masala",
      price: 250,
      image: "/images/paneer-butter-masala.jpg",
    },
    {
      id: 4,
      name: "Chicken Biryani",
      price: 300,
      image: "/images/chicken-biryani.jpg",
    },
    {
      id: 5,
      name: "Dal Tadka",
      price: 180,
      image: "/images/dal-tadka.jpg",
    },
  ],
  Sides: [
    {
      id: 6,
      name: "Tandoori Roti",
      price: 40,
      image: "/images/tandoori-roti.jpg",
    },
    {
      id: 7,
      name: "Garlic Naan",
      price: 50,
      image: "/images/garlic-naan.jpg",
    },
  ],
  Beverages: [
    {
      id: 8,
      name: "Mango Lassi",
      price: 100,
      image: "/images/mango-lassi.jpg",
    },
    {
      id: 9,
      name: "Masala Chai",
      price: 60,
      image: "/images/masala-chai.jpg",
    },
  ],
  Desserts: [
    {
      id: 10,
      name: "Gulab Jamun",
      price: 90,
      image: "/images/gulaab-jamun.jpeg",
    },
    {
      id: 11,
      name: "Rasmalai",
      price: 150,
      image: "/images/ras-malai.jpeg",
    },
  ],
};

export default function MenuPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const goToCheckout = () => {
    router.push("/checkout"); // Redirect to checkout page
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar with cart */}
      <Navbar cart={cart} setCart={setCart} />

      {/* Main Content Layout */}
      <div className="flex flex-grow">
        {/* Sidebar for Categories */}
        <aside className="w-1/5  p-4 h-screen border-r-2 border-gray-400 flex flex-col justify-center items-start overflow-y-auto hidden md:flex sticky top-0">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {Object.keys(menuCategories).map((category) => (
              <li key={category}>
                <a
                  href={`#${category}`}
                  className="block text-blue-600 hover:underline"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Menu Items */}
        <main className="flex-grow p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Menu</h1>

          {/* Menu Sections */}
          {Object.entries(menuCategories).map(([category, items]) => (
            <div key={category} id={category} className="mb-8">
              <h2 className="text-2xl font-bold border-b pb-2 mb-4">
                {category}
              </h2>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border p-3 rounded-lg shadow-sm bg-white"
                  >
                    {/* Image */}
                    <div className="h-32 w-full mb-2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={300}
                        height={200}
                        className="w-48 h-32 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
