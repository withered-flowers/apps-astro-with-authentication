const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;
const app = express();

// consider to save the secret to environment variables on production
const cookieSecret = "this-is-a-very-not-secure-secret";
const jwtSecret = "this-is-also-not-a-very-secure-secret";

const { user } = require("./models/index");

app.use(
  cors({
    origin: [
      "http://localhost:1234",
      "http://localhost:3000",
      "http://localhost:8000",
      "http://localhost:8080",
    ],
    credentials: true,
  })
);
app.use(cookieParser(cookieSecret));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// consider to save this in other folder - routes
// for production
app.post(
  "/register",
  // consider to save this in other files - handler.js
  // for production
  async (req, res, next) => {
    const { username, password, message } = req.body;

    try {
      const createdUser = await user.create({
        username,
        // Password should be hashed for production !
        password,
        message,
      });

      res.status(200).json({
        statusCode: 200,
        data: {
          message: `User ${createdUser.username} created successfully`,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// consider to save this in other folder - routes
// for production
app.post(
  "/login", // consider to save this in other files - handler.js
  // for production
  async (req, res, next) => {
    const { username, password } = req.body;

    try {
      const foundUser = await user.findOne({
        where: {
          username,
          password,
        },
      });

      if (!foundUser) {
        throw new Error("USER_NOT_FOUND");
      }

      const token = jwt.sign(
        {
          id: foundUser.id,
          username: foundUser.username,
        },
        jwtSecret
      );

      res
        .status(200)
        .cookie("custom-token", token, {
          // secure: true,
          sameSite: "strict",
          httpOnly: true,
          maxAge: 100 * 60 * 60,
        })
        .json({
          statusCode: 200,
          data: {
            message: "User logged in successfully",
          },
        });
    } catch (err) {
      next(err);
    }
  }
);

// error handler
app.use((err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  res.status(statusCode).json({
    statusCode,
    error: {
      message,
    },
  });
});

app.listen(port, (_) => console.log(`apps is working at port ${port}`));
