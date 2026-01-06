import React, { useState } from "react";
export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const plans = {
    monthly: [
      {
        name: "Basic Plan",
        description:
          "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
        price: "9.99",
      },
      {
        name: "Standard Plan",
        description:
          "Access to a wider selection of movies and shows, including most new releases and exclusive content",
        price: "12.99",
      },
      {
        name: "Premium Plan",
        description:
          "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
        price: "14.99",
      },
    ],
    yearly: [
      {
        name: "Basic Plan",
        description:
          "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
        price: "99.99",
      },
      {
        name: "Standard Plan",
        description:
          "Access to a wider selection of movies and shows, including most new releases and exclusive content",
        price: "129.99",
      },
      {
        name: "Premium Plan",
        description:
          "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
        price: "149.99",
      },
    ],
  };
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white px-4 sm:px-6 md:px-8 pt-20 sm:pt-32 md:pt-40 pb-16">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-[700px] leading-tight">
            Choose the plan that's right for you
          </h1>
          <div className="relative flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg h-[57px] w-[160px] p-1.5">
            <span
              className={`absolute top-2.3 left-1.5 h-[40px] w-[77px] rounded-md bg-red-600 transition-transform duration-300 ${
                billingCycle === "yearly" ? "translate-x-[70px]" : ""
              }`}
            />
            <button
              onClick={() => setBillingCycle("monthly")}
              className="relative z-10 flex-1 text-base font-semibold text-white cursor-pointer"
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className="relative z-10 flex-1 text-base font-semibold text-white cursor-pointer"
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans[billingCycle].map((plan, index) => (
            <div
              key={index}
              className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6 sm:p-8 flex flex-col transition hover:border-red-600 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(220,38,38,0.2)]"
            >
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                  {plan.name}
                </h2>
                <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
                  {plan.description}
                </p>
              </div>
              <div className="flex items-end gap-1 mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl font-bold">
                  ${plan.price}
                </span>
                <span className="text-gray-500 text-base sm:text-lg">
                  /{billingCycle === "monthly" ? "month" : "year"}
                </span>
              </div>
              <div className="mt-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="flex-1 py-2 sm:py-3 rounded-lg border-2 border-[#333] text-sm sm:text-base font-semibold hover:bg-[#1a1a1a] transition cursor-pointer">
                  Start Free Trial
                </button>
                <button className="flex-1 py-2 sm:py-3 rounded-lg bg-red-600 text-sm sm:text-base font-semibold hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(220,38,38,0.4)] transition cursor-pointer">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}