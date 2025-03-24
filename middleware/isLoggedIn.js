module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {  // Check if user is logged in
        //req.flash("error", "You must be signed in first!");
        return res.redirect("/login"); // Redirect to login if not authenticated
    }
    next(); // Proceed to next middleware or route
};