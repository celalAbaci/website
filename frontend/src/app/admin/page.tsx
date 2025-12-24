"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  // Product Form State
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);

  // Category Form State
  const [categoryName, setCategoryName] = useState("");
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
       router.push("/login");
       return;
    }
    fetchCategories();
  }, [isAuthenticated, router]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingCategory(true);
    try {
      await api.post("/categories", { name: categoryName });
      toast.success("Category created!");
      setCategoryName("");
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create category");
    } finally {
      setIsSubmittingCategory(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingProduct(true);
    try {
      const payload = {
        name: productName,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        imageUrl,
        categoryId: parseInt(categoryId),
      };
      await api.post("/products", payload);
      toast.success("Product created!");
      // Reset form
      setProductName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
      setCategoryId("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Create Category Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Create Category</h2>
        <form onSubmit={handleCreateCategory} className="flex gap-4 items-end">
          <div className="flex-grow">
            <Input
              id="categoryName"
              label="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
             <Button type="submit" isLoading={isSubmittingCategory} className="w-auto px-6">
              Add
            </Button>
          </div>
        </form>
      </section>

      {/* Create Product Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Create Product</h2>
        <form onSubmit={handleCreateProduct} className="space-y-4">
          <Input
            id="productName"
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="price"
              type="number"
              step="0.01"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <Input
              id="stock"
              type="number"
              label="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <Input
            id="imageUrl"
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" isLoading={isSubmittingProduct} className="mt-4">
            Create Product
          </Button>
        </form>
      </section>
    </div>
  );
}
