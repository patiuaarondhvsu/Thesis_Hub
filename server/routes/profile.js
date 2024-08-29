const userRoute = require('../routes/user');

const { Router } = require('express');

const router = Router();

router.use(userRoute);

const bcrypt = require('bcrypt'); // Add bcrypt for hashing passwords

// database
var userCollection = require("../src/userdb");

// requirements
function requireLogin(req, res, next) {
    if (req.session && req.session.email) {
        return next();
    } else {
        res.redirect("/login");
    }
}

// for profile
router.get("/profile", requireLogin, (req, res) => {
    const { email } = req.session;
    
    userCollection.findOne({ email }).then(user => {
        if (user) {
            // Render profile page with user details
            res.render("profile", { user });
        } else {
            // Handle case where user is not found (though this should be rare if session is valid)
            res.render("login", { alertMessage: "User not found.", alertType: "danger" });
        }
    }).catch(err => {
        console.error("Error fetching user:", err);
        res.render("login", { alertMessage: "An error occurred.", alertType: "danger" });
    });
});

// Edit Profile Form
router.get("/profile/edit", requireLogin, (req, res) => {
    const { email } = req.session;
    
    userCollection.findOne({ email }).then(user => {
        if (user) {
            res.render("editProfile", { user });
        } else {
            res.render("login", { alertMessage: "User not found.", alertType: "danger" });
        }
    }).catch(err => {
        console.error("Error fetching user:", err);
        res.render("login", { alertMessage: "An error occurred.", alertType: "danger" });
    });
});

// Handle Edit Profile Form Submission
router.post("/profile/edit", requireLogin, async (req, res) => {
    const { email } = req.session;
    const { name, dateOfBirth, password, confirmPassword } = req.body;

    try {
        const updateFields = { name, dateOfBirth };

        // Handle password change if both password fields are provided
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match.");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }

        await userCollection.findOneAndUpdate({ email }, { $set: updateFields });
        res.redirect("/profile");
    } catch (err) {
        console.error("Error updating user:", err);
        res.render("editProfile", { user: req.body, alertMessage: err.message || "Failed to update profile.", alertType: "danger" });
    }
});

module.exports = router;
