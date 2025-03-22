import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GlobalStyle = () => (
  <style>
    {`
      .popup-scale {
        transform: scale(${(props) => (props.processing ? 1.1 : 1)});
        transition: transform 0.3s ease-in-out;
      }
      .blur-background {
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }
    `}
  </style>
);

const Payment = ({ onClose, onPaymentSuccess }) => {
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsFormComplete(allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    setPaymentProcessing(true);

    setTimeout(() => {
      setPaymentProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 blur-background flex justify-center items-center z-50">
      <div
        className="bg-black p-6 rounded-xl w-[400px] text-center relative shadow-xl popup-scale"
        data-processing={paymentProcessing}
      >
        <button
          onClick={onClose}
          className="absolute top-3.75 right-3.75 bg-red-700 text-white text-2xl font-bold rounded-full w-7.5 h-7.5 flex items-center justify-center hover:bg-red-900 transition-colors"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-3.75 text-white">Payment</h2>
        <p className="text-sm text-gray-400 mb-5">
          Please enter your payment details below:
        </p>
        <form className="flex flex-col gap-3.75">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border border-gray-600 rounded-lg text-sm outline-none bg-gray-800 text-white placeholder-gray-400 focus:border-red-700 focus:shadow-[0_0_5px_rgba(211,47,47,0.5)] transition-all"
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            className="p-3 border border-gray-600 rounded-lg text-sm outline-none bg-gray-800 text-white placeholder-gray-400 focus:border-red-700 focus:shadow-[0_0_5px_rgba(211,47,47,0.5)] transition-all"
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="p-3 border border-gray-600 rounded-lg text-sm outline-none bg-gray-800 text-white placeholder-gray-400 focus:border-red-700 focus:shadow-[0_0_5px_rgba(211,47,47,0.5)] transition-all"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            required
            className="p-3 border border-gray-600 rounded-lg text-sm outline-none bg-gray-800 text-white placeholder-gray-400 focus:border-red-700 focus:shadow-[0_0_5px_rgba(211,47,47,0.5)] transition-all"
          />
          <input
            type="text"
            name="nameOnCard"
            placeholder="Name on Card"
            value={formData.nameOnCard}
            onChange={handleChange}
            required
            className="p-3 border border-gray-600 rounded-lg text-sm outline-none bg-gray-800 text-white placeholder-gray-400 focus:border-red-700 focus:shadow-[0_0_5px_rgba(211,47,47,0.5)] transition-all"
          />
        </form>
        <button
          onClick={handlePayment}
          disabled={!isFormComplete || paymentProcessing}
          className="bg-red-700 text-white px-5 py-3 rounded-lg text-base font-medium mt-5 transition-all hover:bg-red-900 hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {paymentProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Payment;