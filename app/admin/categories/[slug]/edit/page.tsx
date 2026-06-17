"use client";

import React, { useEffect, useState } from "react";
import CategoryForm from "@/components/admin/CategoryForm";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, setCategory] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/categories/${slug}`).then((r) => r.json()).then((data) => setCategory(data)).catch(() => { toast.error("Failed to load"); router.back(); });
  }, [slug]);

  if (!category) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
