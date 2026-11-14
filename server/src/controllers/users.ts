import type { Request, Response } from "express";
import { validateCredentials } from "../utils/validators.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//User routes
const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find({});

  res.send(users);
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw Object.assign(new Error("ID de usuario no encontrado"), { statusCode: 404 });
  }

  res.json(user);
};

const createUser = async (req: Request, res: Response) => {
  const { email, name, about, avatar, password } = req.body;

  validateCredentials(email, password);

  if (password.length < 8) {
    throw Object.assign(
      new Error("La contraseña debe tener al menos 8 caracteres"),
      { statusCode: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    name,
    about,
    avatar,
    password: hashedPassword,
  });

  const { password: _password, ...userData } = newUser.toObject();

  res.status(201).send(userData);
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  validateCredentials(email, password);

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw Object.assign(
      new Error("Email o contraseña incorrectos"),
      { statusCode: 401 }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw Object.assign(
      new Error("Email o contraseña incorrectos"),
      { statusCode: 401 }
    );
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw Object.assign(
      new Error("JWT_SECRET no está configurado"),
      { statusCode: 500 }
    );
  }

  const token = jwt.sign(
    { _id: user._id.toString() }, 
    jwtSecret, 
    { expiresIn: "7d" }
  );
  res.send({ token });
};

const getCurrentUser = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw Object.assign(
      new Error("No autorizado"),
      { statusCode: 401 }
    );
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    throw Object.assign(
      new Error("ID de usuario no encontrado"),
      { statusCode: 404 }
    );
  }

  res.json(user);
};

//Profile route
const updateProfile = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw Object.assign(
      new Error("No autorizado"),
      { statusCode: 401 }
    );
  }

  const { name, about } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw Object.assign(
      new Error("ID de usuario no encontrado"),
      { statusCode: 404 }
    );
  }

  res.send(user);
};

//Avatar route
const updateAvatar = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw Object.assign(
      new Error("No autorizado"),
      { statusCode: 401 }
    );
  }

  const { avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw Object.assign(
      new Error("ID de usuario no encontrado"),
      { statusCode: 404 }
    );
  }

  res.send(user);
};

export { 
  getUsers, 
  getUserById, 
  createUser, 
  login,
  getCurrentUser, 
  updateProfile, 
  updateAvatar
};