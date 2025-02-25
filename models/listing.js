const { ref } = require("joi");
const mongoose = require("mongoose");
const {Schema} = mongoose;
const Review = require("./review.js");
const review = require("./review.js");


const ListingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image: {
        filename: String,
        // required: true, // Ensures an image URL is provided
        url: {
          type: String,
          set(value) {
            // Default image URL when no image URL is provided
            return value === '' ? "https://www.istockphoto.com/photo/young-woman-checking-her-train-in-time-board-gm628109306-111405847?searchscope=image%2Cfilm" : value;
          }
        }
      },
    price:Number,
    location:String, 
    country: String,

reviews:[{
    type:Schema.Types.ObjectId,
    ref: "Review",
}]
    });

    ListingSchema.post("findOneAndDelete", async(listing) => {
        if(listing){
            await Review.deleteMany({_id: { $in: listing.reviews } });
        }
    })

    const Listing = mongoose.model('Listing', ListingSchema);
    module.exports = Listing;

