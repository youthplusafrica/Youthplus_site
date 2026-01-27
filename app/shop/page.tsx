"use client";

import { useState } from "react";
import Image from "next/image";
import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";
import SectionWithBg from "../components/SectionWithBg";
import PurchaseRequestModal from "../components/PurchaseRequestModal";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    id: "water-bottle",
    name: "Water Bottle",
    price: 1000,
    image: "/images/water_bottles.jpeg",
  },
  {
    id: "hoodie",
    name: "Hoodie",
    price: 3500,
    image: "/images/hoodies.jpeg",
  },
];

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePurchaseClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <HeaderNav />

      <SectionWithBg
        src="/images/shop.jpg"
        alt="Youth+ Shop background"
        overlay={55}
        className="py-12 md:py-16"
      >
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Youth+ Shop
          </h1>
          <p className="mt-3 text-white/85 text-lg">
            Show your support with Youth+ merchandise
          </p>
          <div
            className="mx-auto mt-8 h-1 w-40 rounded-full"
            style={{ background: "var(--yplus-primary,#d0a328)" }}
            aria-hidden="true"
          />
        </div>
      </SectionWithBg>

      <SectionWithBg
        src="/images/events-bg.jpg"
        alt="Products background"
        overlay={60}
        className="py-6 md:py-8"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl overflow-hidden border bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/15 hover:border-white/30 transition card-glow"
              >
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-[var(--yplus-primary,#d0a328)] mb-4">
                    {product.price.toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      minimumFractionDigits: 0,
                    })}
                  </p>

                  <button
                    onClick={() => handlePurchaseClick(product)}
                    className="w-full px-6 py-3 rounded-full border-2 border-[var(--yplus-primary,#d0a328)] text-[var(--yplus-primary,#d0a328)] font-semibold hover:bg-[var(--yplus-primary,#d0a328)] hover:text-black transition-colors"
                  >
                    Make a purchase request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWithBg>

      <PurchaseRequestModal
        open={modalOpen}
        onClose={handleModalClose}
        product={selectedProduct}
      />

      <FooterMain />
    </>
  );
}
