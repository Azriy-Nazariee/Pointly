import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // To access the passed state

function RewardDetails() {
  const location = useLocation();
  const rewardId = location.state?.reward; // Retrieve the reward ID passed via state

  // Sample data with multiple terms and conditions
  const rewardDetails = {
    1: {
      name: "Free Coffee",
      description: "Enjoy a freshly brewed cup of coffee.",
      cost: 300,
      img: "./Coffee.png",
      expiration: "Expires on: 31st January 2025",
      terms: [
        "This offer is available at participating coffee shops only.",
        "The coffee must be claimed in-store and cannot be redeemed online.",
        "Offer valid once per customer."
      ]
    },
    2: {
      name: "Gift Voucher",
      description: "Redeem your points for a gift voucher.",
      cost: 500,
      img: "./Voucher.png",
      expiration: "Expires on: 15th February 2025",
      terms: [
        "Voucher can be used in participating stores only.",
        "This voucher cannot be exchanged for cash.",
        "Voucher expires after 6 months from the date of issuance."
      ]
    },
    3: {
      name: "Exclusive Discount",
      description: "Unlock exclusive discounts on your next purchase.",
      cost: 1000,
      img: "./Discount.png",
      expiration: "Expires on: 28th February 2025",
      terms: [
        "Discount can only be applied to selected items.",
        "Cannot be used in conjunction with any other offer.",
        "Valid for in-store purchases only."
      ]
    },
  };

  // Retrieve reward details based on passed reward ID
  const rewardInfo = rewardDetails[rewardId];

  const [isRedeemed, setIsRedeemed] = useState(false); // Track redemption status

  // Handle reward redemption
  const handleRedemption = () => {
    // Simulate the redemption process (e.g., API call)
    setIsRedeemed(true); // Update the state to reflect successful redemption
  };

  if (!rewardInfo) {
    return <div>No reward details found.</div>; // In case the reward info is invalid
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 mt-10">{rewardInfo.name}</h2>
      
      <img
        src={rewardInfo.img}
        alt={rewardInfo.name}
        className="w-full max-w-[300px] mb-4 rounded-lg"
      />

      <p className="text-gray-600 text-center mb-4">{rewardInfo.description}</p>

      <p className="mt-2 text-lg font-semibold text-gray-700">Cost: {rewardInfo.cost} points</p>

      {/* Expiration Date Section */}
      <p className="mt-4 text-gray-500">{rewardInfo.expiration}</p>

      {/* Terms & Conditions Section */}
      <div className="mt-4 p-4 w-1/2 bg-purple-100 rounded-lg shadow-sm ">
        <h3 className="text-lg font-semibold text-gray-700 text-center">Terms & Conditions</h3>
        <ul className="mt-2 text-gray-600 list-disc pl-6">
          {rewardInfo.terms.map((term, index) => (
            <li key={index} className="mb-2">{term}</li>
          ))}
        </ul>
      </div>

      {/* Redemption Button */}
      <button
        onClick={handleRedemption}
        className={`mt-6 w-1/2 py-3 rounded-lg transition-colors ${
          isRedeemed ? 'bg-purple-dark text-white' : 'bg-gold-dark text-white hover:bg-purple-dark'
        }`}
      >
        {isRedeemed ? 'Redeemed Successfully' : 'Redeem Now'}
      </button>
    </div>
  );
}

export default RewardDetails;