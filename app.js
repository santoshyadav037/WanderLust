
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressErr.js");
const {listingSchema} = require("./schema.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const session = require("express-session");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

main()
.then(()=>{ 
    console.log("Connected to data_base");
})
.catch((err) => {
    console.log(err);
}); 

async function main(){
    await mongoose.connect(MONGO_URL);
}
app.use(express.urlencoded({extended:true})); 
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


const sessonOptions = {
    secret:"mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
    }
}
app.use(session(sessonOptions));

app.get('/',(req, res)=>{
    res.render("login.ejs");
});

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!!!"));
});
app.use((err, req ,res, next) =>{
    let {statusCode=406, message="Something went wrong!!!"} = err;
     res.render("listings/error.ejs",{statusCode,message});
     
});

app.listen(8080,() =>{
    console.log("Hi I am testing server connection confirmation");
});

