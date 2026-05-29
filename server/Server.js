
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());


// ================= MYSQL CONNECTION =================

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rama@1998",
    database: "auth_db",
});

db.connect((err) => {

    if (err) {
        console.log("❌ MYSQL ERROR:", err);
    } else {
        console.log("✅ MYSQL CONNECTED");
    }

});


// ================= EMAIL CONFIG =================

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: "YOUR_GMAIL@gmail.com",
        pass: "YOUR_16_DIGIT_APP_PASSWORD",
    },
});


// ================= SIGNUP =================

app.post("/signup", async (req, res) => {

    const {
        username,
        email,
        password
    } = req.body;

    const hashedPassword =
        await bcrypt.hash(password, 10);

    const checkSql =
        "SELECT * FROM users WHERE email=?";

    db.query(checkSql, [email], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length > 0) {

            return res.status(400).json({
                message: "Email already exists",
            });

        }

        const sql =
            "INSERT INTO users(username,email,password) VALUES(?,?,?)";

        db.query(
            sql,
            [
                username,
                email,
                hashedPassword
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: "Signup Successful",
                });

            }
        );
    });
});


// ================= LOGIN =================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql =
        "SELECT * FROM users WHERE email=?";

    db.query(sql, [email], async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {

            return res.status(404).json({
                message: "User not found",
            });

        }

        const user = result[0];

        const match =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!match) {

            return res.status(401).json({
                message: "Wrong Password",
            });

        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            "secretkey",
            {
                expiresIn: "1d",
            }
        );

        res.json({
            token,
            user,
        });

    });
});


// ================= FORGOT PASSWORD =================

app.post("/forgot-password", (req, res) => {

    const { email } = req.body;

    console.log("📧 EMAIL:", email);

    const sql =
        "SELECT * FROM users WHERE email=?";

    db.query(sql, [email], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Database Error",
            });
        }

        if (result.length === 0) {

            return res.status(404).json({
                message: "Email Not Found",
            });

        }

        try {

            const token = jwt.sign(
                { email },
                "resetSecretKey",
                { expiresIn: "15m" }
            );

            const resetLink =
                `http://localhost:3000/reset-password/${token}`;

console.log("RESET LINK:", resetLink);

const mailOptions = {

    from: "YOUR_GMAIL@gmail.com",

    to: email,

    subject: "Reset Password",

    html: `
                    <h2>Password Reset</h2>

                    <p>
                        Click below link to reset password:
                    </p>

                    <a href="${resetLink}">
                        Reset Password
                    </a>
                `,
};

transporter.sendMail(
    mailOptions,
    (error, info) => {

        if (error) {

            console.log(
                "MAIL ERROR:",
                error
            );

            return res.status(500).json({
                message:
                    "Email Send Failed",
            });
        }

        console.log(
            "✅ EMAIL SENT"
        );

        res.json({
            message:
                "Reset password link sent successfully",
        });
    }
);

        } catch (error) {

    console.log(error);

    res.status(500).json({
        message: "Server Error",
    });
}
    });
});


// ================= RESET PASSWORD =================

app.post(
    "/reset-password/:token",
    async (req, res) => {

        const { token } = req.params;

        const { password } = req.body;

        jwt.verify(
            token,
            "resetSecretKey",
            async (err, decoded) => {

                if (err) {

                    return res.status(401).json({
                        message:
                            "Invalid Token",
                    });

                }

                const hashedPassword =
                    await bcrypt.hash(password, 10);

                const sql =
                    "UPDATE users SET password=? WHERE email=?";

                db.query(
                    sql,
                    [
                        hashedPassword,
                        decoded.email,
                    ],
                    (err, result) => {

                        if (err) {

                            return res.status(500).json(err);

                        }

                        res.json({
                            message:
                                "Password Reset Successful",
                        });

                    }
                );
            }
        );
    }
);


// ================= SERVER =================

app.listen(5000, () => {

    console.log(
        "✅ SERVER RUNNING ON PORT 5000"
    );

});
