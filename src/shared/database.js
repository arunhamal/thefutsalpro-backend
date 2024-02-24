import express from 'express';
import mongoose from 'mongoose';

const mongoDB = 'mongodb://localhost:27017/futsalbooking'

export const mongodbConnection = mongoose.connect(mongoDB, (err) => {
    if (err) {
        console.log(`unable to connect database: ${err}`)
    } else {
        console.log('mongoDB connected sucessfully')
    }
})