"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import Button from "@/components/Button";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryName: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-1/2">
          {product.imageUrl ? (
             <img className="h-full w-full object-cover" src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400 min-h-[300px]">
              No Image
            </div>
          )}
        </div>
        <div className="p-8 md:w-1/2">
          <div className="uppercase tracking-wide text-sm text-primary font-semibold">
            {product.categoryName}
          </div>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-gray-600">
            {product.description}
          </p>
          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            <span className="ml-2 text-sm text-gray-500">{product.stock} in stock</span>
          </div>
          <div className="mt-8">
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
