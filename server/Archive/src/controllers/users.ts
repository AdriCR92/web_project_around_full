import type { Request, Response } from "express";

import User from "../models/user.js";

//Routes
const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find({});

  res.send(users);
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw Object.assign(new Error("User ID not found"), { statusCode: 404 });
  }

  res.json(user);
};

const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  const newUser = await User.create({
    name,
    about,
    avatar,
  });

  res.status(201).send(newUser);
};


const getCurrentUser = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw Object.assign(
      new Error("Unauthorized"),
      { statusCode: 401 }
    );
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    throw Object.assign(
      new Error("User ID not found"),
      { statusCode: 404 }
    );
  }

  res.json(user);
};

//Profile route
const updateProfile = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw Object.assign(
      new Error("Unauthorized"),
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
      new Error("User ID not found"),
      { statusCode: 404 }
    );
  }

  res.send(user);
};

//Avata route
const updateAvatar = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw Object.assign(
      new Error("Unauthorized"),
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
      new Error("User ID not found"),
      { statusCode: 404 }
    );
  }

  res.send(user);
};

export { 
  getUsers, 
  getUserById, 
  createUser, 
  getCurrentUser, 
  updateProfile, 
  updateAvatar
};