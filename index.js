import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/validations.js";
import { UserControler, PostControler } from "./controlers/index.js";

mongoose
  .connect(
    "mongodb+srv://yuriybilskiy:IXY1Dpe28yGWRyM3@cluster0.7rg5s.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => console.log("Db error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserControler.login
);
app.get("/auth/me", checkAuth, UserControler.getMe);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserControler.register
);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostControler.getAll);
app.get("/posts/:id", PostControler.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostControler.create
);
app.delete("/posts/:id", checkAuth, PostControler.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostControler.update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server ok");
});
