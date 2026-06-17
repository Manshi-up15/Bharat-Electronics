"use client";

import React, { useEffect, useState } from "react";
import CategoryForm from "@/components/admin/CategoryForm";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/types";

export default function EditCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/categories/${slug}`)
      .then((r) => r.json())
      .then((data) => setCategory(data))
      .catch(() => {
        toast.error("Failed to load");
        router.back();
      });
  }, [slug, router]);

  if (!category) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
