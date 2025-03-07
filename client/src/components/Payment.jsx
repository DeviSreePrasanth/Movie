import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  width: 320px;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform: scale(${(props) => props.scale});
  transition: transform 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #d32f2f;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  &:hover {
    background: #b71c1c;
  }
`;

const Title = styled.h2`
  margin-bottom: 15px;
  color: #333;
  font-family: "Arial", sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    border-color: #d32f2f;
    box-shadow: 0 0 5px rgba(211, 47, 47, 0.5);
  }
`;

const PaymentButton = styled.button`
  background-color: #d32f2f;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background-color: #b71c1c;
    transform: scale(1.05);
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

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
    <Overlay>
      <PopupContainer scale={paymentProcessing ? 1.1 : 1}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Payment</Title>
        <p>Please enter your payment details below:</p>
        <Form>
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="nameOnCard"
            placeholder="Name on Card"
            value={formData.nameOnCard}
            onChange={handleChange}
            required
          />
        </Form>
        <PaymentButton
          onClick={handlePayment}
          disabled={!isFormComplete || paymentProcessing}
        >
          {paymentProcessing ? "Processing..." : "Pay Now"}
        </PaymentButton>
      </PopupContainer>
    </Overlay>
  );
};

export default Payment;
