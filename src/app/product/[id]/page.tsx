import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetailClient from "@/components/ProductDetailClient";
import { products } from "@/data";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((item) => item.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <Header />
      <ProductDetailClient product={product} />
    </div>
  );
}
