"use client";

import CartSummary from "@/components/client/CartSummary";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useCartStore } from "@/lib/cartStore";
import { useAuthStore } from "@/lib/store";
import { motion } from "@/lib/motion";
import { Card, CardHeader } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};
type Voucher = {
  code: string;
  name: string;
  discountPercent: number;
};

export default function MyCartPage() {
  const role = useAuthStore((s) => s.user?.role);
  const { selectedVoucherCode, setVoucher } = useCartStore((s) => ({
    selectedVoucherCode: s.selectedVoucherCode,
    setVoucher: s.setVoucher,
  }));

  const vouchersQuery = useQuery<{ success: boolean; data: Voucher[] }>({
    queryKey: ["clientVouchers"],
    queryFn: async () => {
      const res = await api.get("/vouchers/available");
      return res.data;
    },
    staleTime: 60_000,
  });

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
                My Cart
              </h1>
              {role === "client" && (
                <div>
                  <select
                    className="auth-form__input text-slate-900"
                    value={selectedVoucherCode || ""}
                    onChange={(e) => {
                      const code = e.target.value || null;
                      if (!code) {
                        setVoucher(null, null);
                        return;
                      }
                      const v = vouchersQuery.data?.data?.find((x) => x.code === code) || null;
                      setVoucher(v?.code || null, v?.discountPercent ?? null);
                    }}
                  >
                    <option value="">Apply Voucher</option>
                    {vouchersQuery.data?.data?.map((v) => (
                      <option key={v.code} value={v.code}>
                        {v.name} ({v.discountPercent}% off)
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>
      </motion.section>
      <div className="client-card">
        <CartSummary />
      </div>
    </div>
  );
}
