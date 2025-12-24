import Link from "next/link";
import React from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  categoryName?: string;
}

export default function ProductCard({ id, name, price, imageUrl, categoryName }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="group block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="h-48 w-full object-cover object-center group-hover:opacity-75"
            />
          ) : (
            <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="mt-1 text-lg font-medium text-gray-900 truncate">{name}</h3>
          {categoryName && <p className="mt-1 text-sm text-gray-500">{categoryName}</p>}
          <p className="mt-1 text-lg font-bold text-primary">${price}</p>
        </div>
      </div>
    </Link>
  );
}
