"use client";

import React, { useEffect, useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => setProduct(data))
      .catch(() => {
        toast.error("Failed to load");
        router.back();
      });
  }, [id, router]);

  if (!product) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
