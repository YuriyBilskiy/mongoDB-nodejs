import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    

    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user.toObject();

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалось зареєструватись",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "користувач не найдений",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.toObject().passwordHash
    );
    if (!isValidPass) {
      return res.status(400).json({
        message: "неправильний логін або пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user.toObject();

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалось зареєструватись",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "користувача не знайдено",
      });
    }
    const { passwordHash, ...userData } = user.toObject();

    res.json({
      ...userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "немає доступу",
    });
  }
};