"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import { motion } from "@/lib/motion";
import { Card, CardHeader } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const ProductForm = dynamic(() => import("@/components/coach/ProductForm"), {
  loading: () => <div className="p-6 text-center">Loading form...</div>,
  ssr: false
});

export default function CoachCreateProductPage() {
  return (
    <div className="space-y-5 pt-4 md:pt-6">
      <motion.section
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.28 }}
      >
        <Card className="overflow-hidden border-indigo-100/70 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 text-white mb-5">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-lg font-bold tracking-tight text-white sm:text-3xl">
                Add Product
              </h1>
              <Link
                href="/coach/products"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-medium h-10 px-4 py-2 shadow-sm transition-all duration-200"
                style={{ backgroundColor: "white", color: "#4f46e5" }}
              >
                <ArrowLeft style={{ width: 16, height: 16 }} />
                Back
              </Link>
            </div>
          </CardHeader>
        </Card>
      </motion.section>

      <div style={{ marginBottom: "1rem" }}>
        <Link
          href="/coach/products/templates"
          className="btn btn--primary"
          style={{ 
            display: "inline-flex", 
            width: "100%", 
            justifyContent: "center",
            alignItems: "center",
            height: "3rem"
          }}
        >
          Choose from Templates
        </Link>
      </div>

      <div className="admin-card">
        <ProductForm />
      </div>
    </div>
  );
}
