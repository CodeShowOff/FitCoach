// src/app/(client)/orders/page.tsx
"use client";

import ClientOrdersTable from "@/components/client/ClientOrdersTable";
import { motion } from "@/lib/motion";
import { Card, CardHeader } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function ClientOrdersPage() {
  return (
    <div className="client-page__sections">
      <motion.section
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.28 }}
      >
        <Card className="overflow-hidden border-indigo-100/70 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 text-white">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-lg font-bold tracking-tight text-white sm:text-3xl">
                My Orders
              </h1>
            </div>
          </CardHeader>
        </Card>
      </motion.section>

      <div className="client-card">
        <ClientOrdersTable />
      </div>
    </div>
  );
}
