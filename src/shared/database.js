import express from 'express';
import mongoose from 'mongoose';

const mongoDB = 'mongodb+srv://thefutsalpro:PfjbS6IalZTpfo4O@cluster0.voo7tlv.mongodb.net/?retryWrites=true&w=majority'

export const mongodbConnection = mongoose.connect(mongoDB, (err) => {
    if (err) {
        console.log(`unable to connect database: ${err}`)
    } else {
        console.log('mongoDB connected sucessfully')
    }
})