const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressErr.js");
const {userSchema} = require("../schema.js");
const User = require("../models/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const isLoggedIn = require("../middleware/isLoggedIn.js");


router.get("/login", (req, res) =>{
    res.render("users/newlogin.ejs");
})

router.get('/userdata',(req, res) =>{
    res.send("<h1>This function will implemented later</h1>");
    // if (req.session.user) {
    // console.log(req.session.userCurr);
    //     res.render('users/userdata.ejs', { user: req.session.userCurr }); // Render dashboard with user data
    //   } else {
        // res.redirect('new/login'); // Redirect to login if not logged in
    //   }
    // res.render("users/userdata.ejs");
})

router.post("/login",
     passport.authenticate("local", {failureFlash: true, 
        failureRedirect: "/new/login"}), 
        async(req, res) =>{
            req.flash("success", "Welcome back to our RoomKhoji Platform!");
            res.redirect("/listings");
});


router.get("/signup", (req, res) =>{
    res.render("users/newsignup.ejs");
});

// router.post("/signup", async (req, res, next) =>{
//     try{
//     const {username, email, password} = req.body;
//     const newUser = new User({username, email});
//     const registeredUser =await User.register(newUser, password);
//     res.redirect("/listings");
// }catch(e){
//     req.flash("error", e.message);
//     res.redirect("/signup");
// }
// });

router.post("/signup", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Create new user instance
        const newUser = new User({ username, email });

        // Register the user using Passport Local Mongoose
        const registeredUser = await User.register(newUser, password);

        // Automatically log in the user after registration
        req.login(registeredUser, (err) => {
            if (err) return next(err); // Pass any error to the next middleware
            res.redirect("/listings"); // Redirect to listings after login
        });
        
    } catch (e) {
        req.flash("error", e.message); // Flash error if something goes wrong
        res.redirect("/signup");
    }
});



// router.get("/logout", (req, res) =>{
//     req.logout();
//     req.flash("success", "Goodbye!");
//     res.redirect("/listings");
// });

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);  // If there's an error, pass it to the next middleware
        }
        req.flash("success", "Goodbye!");  // Flash success message
        res.redirect("/listings");  // Redirect to listings page after logout
    });
});

module.exports = router;