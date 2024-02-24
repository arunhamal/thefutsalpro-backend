import express from "express";
import axios from 'axios';

export const create = async (req, res, next) => {
  try {
    const txnResponse = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', req, {headers: {
      Authorization: `Key ff91fdeffbc74a10a75d1f958d61405e`
      }})
      if (txnResponse) {
        return { success: true, data: txnResponse?.data}
      } else {
        res.status(403).json({ success: false, message: 'Your Transaction Has Been Terminated.' });
      }

  } catch (error) {
    console.log("🚀 ~ create ~ error:", error)
    throw error;
  }
};