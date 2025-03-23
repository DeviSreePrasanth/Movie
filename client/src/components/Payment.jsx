import React, { useState, useEffect } from "react";

const GlobalStyle = () => (
  <style>
    {`
      .popup-scale {
        transform: scale(${(props) => (props.processing ? 1.05 : 1)});
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
    <div className="fixed inset-0 bg-black/60 blur-background flex justify-center items-center z-50">
      <div
        className="bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 rounded-xl w-[90%] sm:w-[400px] text-center relative shadow-xl popup-scale border border-cyan-500/30 max-h-[90vh] sm:max-h-none overflow-y-auto sm:overflow-y-visible"
        data-processing={paymentProcessing}
      >
        <GlobalStyle />
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-cyan-700 text-white text-lg sm:text-xl font-bold rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-cyan-600 transition-colors"
        >
          ×
        </button>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-200">Payment</h2>
        <p className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
          Please enter your payment details below:
        </p>
        <form className="flex flex-col gap-3 sm:gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 sm:p-3 border border-gray-600 rounded-lg text-xs sm:text-sm outline-none bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-cyan-500 focus:shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all"
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            className="p-2 sm:p-3 border border-gray-600 rounded-lg text-xs sm:text-sm outline-none bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-cyan-500 focus:shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all"
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="p-2 sm:p-3 border border-gray-600 rounded-lg text-xs sm:text-sm outline-none bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-cyan-500 focus:shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            required
            className="p-2 sm:p-3 border border-gray-600 rounded-lg text-xs sm:text-sm outline-none bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-cyan-500 focus:shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all"
          />
          <input
            type="text"
            name="nameOnCard"
            placeholder="Name on Card"
            value={formData.nameOnCard}
            onChange={handleChange}
            required
            className="p-2 sm:p-3 border border-gray-600 rounded-lg text-xs sm:text-sm outline-none bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-cyan-500 focus:shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all"
          />
        </form>
        <button
          onClick={handlePayment}
          disabled={!isFormComplete || paymentProcessing}
          className="bg-cyan-500 text-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold mt-4 sm:mt-6 transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-cyan-600 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {paymentProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Payment;