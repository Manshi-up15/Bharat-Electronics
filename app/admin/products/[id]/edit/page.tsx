"use client";
import React, { useEffect, useState } from "react";
import ProductForm from "../../../../components/admin/ProductForm";
import Loading from "../../../../components/Loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/products/${id}`).then((r) => r.json()).then((data) => setProduct(data)).catch(() => { toast.error("Failed to load"); router.back(); });
  }, [id]);

  if (!product) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
