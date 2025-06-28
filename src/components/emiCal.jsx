"use client";
import { useState, useEffect } from "react";

export default function EMICalculator() {
  const [packageCost, setPackageCost] = useState(1000000);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  // Simple EMI formula (can be replaced with actual logic)
  useEffect(() => {
    const interestRate = 0.14 / 12;
    const emiCalculated =
      (packageCost * interestRate * Math.pow(1 + interestRate, tenure)) /
      (Math.pow(1 + interestRate, tenure) - 1);
    setEmi(Math.round(emiCalculated));
  }, [packageCost, tenure, emi]);

  const format = (val) =>
    val.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Package Cost */}
      <div className="mb-6">
        <p className="text-sm text-gray-700">Package Cost (₹)</p>
        <h2 className="text-2xl font-bold">{format(packageCost)}</h2>
        <input
          type="range"
          min={10000}
          max={2000000}
          step={10000}
          value={packageCost}
          onChange={(e) => setPackageCost(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>

      {/* Tenure */}
      <div className="mb-6">
        <p className="text-sm text-gray-700">Tenure (Months)</p>
        <h2 className="text-2xl font-bold">{tenure}</h2>
        <input
          type="range"
          min={3}
          max={36}
          step={1}
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>

      {/* Estimated EMI */}
      <div className="mb-2">
        <p className="text-sm text-gray-700">Your Estimated Monthly EMI</p>
        <h2 className="text-2xl font-bold">{format(emi)}</h2>
        <input
          type="range"
          min={0}
          max={100000} // max EMI you expect
          value={emi}
        
          className="w-full accent-blue-600 cursor-not-allowed opacity-70"
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">
        *Final amount may vary. This is an estimate based on a 14% p.a. interest
        rate.
      </p>
    </div>
  );
}
