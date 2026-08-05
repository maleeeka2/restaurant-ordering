"use client";

const STEPS = ["RECEIVED", "PREPARING", "READY", "COMPLETED"] as const;

export default function OrderStatus({ status }: { status: string }) {
  const currentIndex = STEPS.indexOf(status as (typeof STEPS)[number]);

  return (
    <div className="flex items-center justify-between" data-testid="order-status">
      {STEPS.map((step, idx) => (
        <div key={step} className="flex-1 flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              idx <= currentIndex ? "bg-cafe-500 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {idx + 1}
          </div>
          <span className="text-xs mt-1 text-center">{step}</span>
        </div>
      ))}
    </div>
  );
}
