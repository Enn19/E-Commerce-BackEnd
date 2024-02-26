import mongoose from "mongoose";
export const connection =async()=>{
    return await mongoose.connect(process.env.URI)
    .then(
        ()=>{
            console.log('Connected to MongoDB');
        }
    )
    .catch ((error)=> {
        console.log(error)
        console.log('Error connecting to MongoDB:', error.message);
      } )
} 