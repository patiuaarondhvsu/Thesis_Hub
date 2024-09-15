const { Router } = require('express');
const passport = require('passport');
const path = require('path');

// for security/authentication and session
const requireLogin = require('../middleware/requireLogin');

// for logs
const Logs = require('../src/logdb');

// for routers
const router = Router();

// for envs
require('dotenv').config();

// for hashing
const bcrypt = require('bcrypt');

// for logs

// email handler (for sending mails)
const nodemailer = require('nodemailer');

//nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
});

//unique string (installation = npm add nodemailer uuid)
const {v4: uuidv4} = require("uuid");

// login page
router.get("/login",(req,res)=>{
    res.render("login")
})

// signup page
router.get("/signup",(req,res)=>{
    res.render("signup")
})

// main page
router.get("/mainPage", requireLogin, (req, res) => {
    res.render("mainPage", {
        title: 'Main Page',
    });
});

// chatbot
router.get("/chatbot", requireLogin, (req, res) => {
    res.render("chatbot");
});

// database
var userCollection = require("../src/userdb");
var admincollection = require("../src/admindb");
var userVerification = require("../src/userVerification");

// SignUp for User
router.post("/signup", async(req,res)=>{

    let {name, email, password, dateOfBirth} = req.body;
        name = name.trim();
        email = email.trim();
        password = password.trim();
        dateOfBirth = dateOfBirth.trim();
    
        if (name == "" || email == "" || password == "" || dateOfBirth == "") {
            res.json({
                status: "FAILED",
                message: "Empty input fields"
            });
        } else if (!/^[a-zA-Z ]*$/.test(name)){
            res.json({
                status: "FAILED",
                message: "Invalid name entered"
            })
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            res.json({
                status: "FAILED",
                message: "Invalid email entered"
            })
        } else if (!new Date(dateOfBirth).getTime()) {
            res.json({
                status: "FAILED",
                message: "Invalid date of birth entered"
            })
        } else if (password.length < 8) {
            res.json({
                status: "FAILED",
                message: "Password is too short!"
            })
        } else {
            // Checking if user already exists
            userCollection.find({email}).then(result => {
                if (result.length){
                    // a user already exists
                    res.json({
                        status: "FAILED",
                        message: "User with the provided email already exists"
                    })
                } else {
                    //try to create new user
    
                    //password handling
                    const saltRounds = 10;
                    bcrypt.hash(password, saltRounds).then(hashedPassword => {
                        const newUser = new userCollection({
                            name,
                            email,
                            password: hashedPassword,
                            dateOfBirth,
                            verified: false,
                        });
    
                        newUser
                        .save()
                        .then((result) =>{
                            // handle account verification
                            sendVerificationEmail(result,res);
                        })
                        .catch(err => {
                            res.json({
                                status: "FAILED",
                                message: "An error occured while saving user account"
                            })
                        })
                    })
                    .catch(err=>{
                        res.json({
                            status: "FAILED",
                            message: "An error occured while hashing password!"
                        })
                    })
                }
            }).catch(err=>{
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "An error occured while checking for existing user!"
                })
            })
        }
    
    })
    
    // send verification email
    const sendVerificationEmail = ({_id, email}, res) => {
        // url to be used in the email
        const currentUrl = "http://localhost:5000/";
    
        const uniqueString = uuidv4() + _id;
    
        //mail options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify your Email",
            html: `<p>Verify your email address to continue the signup and login into your account.</p><p><b>This link expires in 1 hour</b>.</p><p>Press <a href=${currentUrl + "verify/" + _id + "/" + uniqueString}>here</a> to proceed.</p>`,
        };
    
        //hash the uniqueString
        const saltRounds = 10;
        bcrypt
        .hash(uniqueString, saltRounds)
        .then((hashedUniqueString) => {
            // set values in userVerification collection
            const newVerification = new userVerification({
                userId: _id,
                uniqueString: hashedUniqueString,
                createdAt: Date.now(),
                expiredAt: Date.now() + 3600000,
            });
    
            newVerification
            .save()
            .then(() => {
                transporter
                .sendMail(mailOptions)
                .then(() => {
                    // email sent and verification record saved
                    res.render("login", { alertMessage: "Verification Email Sent", alertType: "success" });
                })
                .catch((error) => {
                    console.log(error);
                    res.json({
                        status: "FAILED",
                        message: "Verification email failed"
                    }); 
                })
            })
            .catch((error) => {
                console.log(error);
                res.json({
                    status: "FAILED",
                    message: "Couln't save verification email data"
                }); 
            })
    
        })
        .catch( ()=> {
            res.json({
                status: "FAILED",
                message: "an error occured while hashing email data!"
            }); 
        })
    };
    
    //verify email
    router.get("/verify/:userId/:uniqueString", (req, res) => {
        let { userId, uniqueString } = req.params;
    
        userVerification
        .find({userId})
        .then((result) => {
            if (result.length > 0) {
                //user verification record exists so we proceed
    
                const {expiresAt} = result[0];
                const hashedUniqueString = result[0].uniqueString;
    
                if (expiresAt < Date.now()) {
                    // record has expired so we delete it
                    userVerification
                    .deleteOne({ userId })
                    .then(result => {
                        User.deleteOne({_id: userId})
                        .then(() => {
                            res.render("signup", { alertMessage: "Link has expired please sign up again", alertType: "success" });
                        })
                        .catch(error => {
                            let message = "Clearing user with unique string failed";
                            res.redirect(`/user/verified/error=true&message=${message}`);
                        })
                    })
                    .catch(error => {
                        let message = "An error occured while clearing expired user verification record";
                        res.redirect(`/user/verified/error=true&message=${message}`);
                    })
                } else {
                    //valid record exist so we validate the user string
                    //First compare the hashed unique string
    
                    bcrypt
                    .compare(uniqueString, hashedUniqueString)
                    .then(result => {
                        if (result) {
                            //string match
    
                            userCollection
                            .updateOne({_id: userId}, {verified: true})
                            .then(() => {
                                userVerification
                                .deleteOne({userId})
                                .then(() => {
                                    res.sendFile(path.join(__dirname, "./../templates/verified.html"));
                                })
                                .catch(error => {
                                    console.log(error);
                                    let message = "An error occured while finalizing successful verification";
                                    res.redirect(`/user/verified/error=true&message=${message}`);
                                })
                            })
                            .catch(error => {
                                console.log(error);
                                let message = "An error occured while updating user record to show verified";
                                res.redirect(`/user/verified/error=true&message=${message}`);
                            })
    
                        } else {
                            //existing record but incorrect verification details passed.
                            let message = "Invalid verification details passed. Check your inbox";
                            res.redirect(`/user/verified/error=true&message=${message}`);
                        }
                    })
                    .catch((error) => {
                        let message = "An error occured while comparing unique string";
                        res.redirect(`/user/verified/error=true&message=${message}`);
                    })
                }
            } else {
                //user verification record doesn't exist
                let message = "Account record doesn't exists or has been verified already. Please sign up or log    in.";
                res.redirect(`/user/verified/error=true&message=${message}`);
            }
        })
        .catch((error) => {
            console.log(error);
            let message = "An error occured while checking for existing user verification record";
            res.redirect(`/user/verified/error=true&message=${message}`);
        })
    
    });
    
    //verified page route
    router.get("verified", (req, res) => {
        res.sendFile(path.join(__dirname, "/templates/verified.html"));
    })

    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            let user = await userCollection.findOne({ email });
            let role = 'user';
    
            if (!user) {
                const admin = await admincollection.findOne({ email });
                if (admin && await bcrypt.compare(password, admin.password)) {
                    req.session.authenticated = true;
                    req.session.email = email;
                    req.session.role = 'admin';
    
                    // Log the admin login
                    await new Logs({ message: `Admin ${email} logged in` }).save();
    
                    return res.json({ 
                        success: true, 
                        message: "Admin login successful", 
                        user: { email: admin.email, role: 'admin' } 
                    });
                } else {
                    return res.json({ success: false, message: "Wrong password or user not found." });
                }
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                if (user.verified) {
                    req.session.authenticated = true;
                    req.session.email = email;
                    req.session.role = 'user';
    
                    // Log the user login
                    await new Logs({ message: `User ${email} logged in` }).save();
    
                    return res.json({ 
                        success: true, 
                        message: "Login successful", 
                        user: { email: user.email, name: user.name, role: 'user' } 
                    });
                } else {
                    return res.json({ success: false, message: "Email hasn't been verified yet. Check your inbox." });
                }
            } else {
                return res.json({ success: false, message: "Wrong password." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "An error occurred during login." });
        }
    });
    


    // For log out
    router.get('/logout', requireLogin, (req, res) => {
        const email = req.session.email || 'unknown'; // Default to 'unknown' if email is not set
    
        // Log the logout event
        new Logs({ message: `User ${email} logged out` }).save()
            .then(() => {
                req.session.destroy((err) => {
                    if (err) {
                        console.error('Error destroying session:', err);
                        return res.status(500).send('Logout failed');
                    }
                    console.log('Session destroyed successfully');
                    res.redirect('/login');
                });
            })
            .catch(err => {
                console.error('Error logging out:', err);
                res.status(500).send('Error logging out');
            });
    });
    
// for profile
router.get('/profile', requireLogin, (req, res) => {
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