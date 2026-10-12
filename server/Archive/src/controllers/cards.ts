import type { Request, Response } from "express";

import mongoose from "mongoose";
import Card from "../models/card.js";

// Routes
const getCards = async (req: Request, res: Response) => {
  const cards = await Card.find({});
  const userId = req.user?._id;

  const cardsWithIsLiked = cards.map((card) => ({
    ...card.toObject(),
    isLiked: card.likes.some(
      (id) => id.toString() === userId
    ),
  }));

  res.send(cardsWithIsLiked);
};

const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;

  if (!req.user?._id) {
    throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
  }

  const newCard = await Card.create({
    name,
    link,
    owner: new mongoose.Types.ObjectId(req.user._id),
  });

  res.status(201).send(newCard);
};

const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedCard = await Card.findByIdAndDelete(id);

  if (!deletedCard) {
    throw Object.assign(new Error("Card ID not found"), { statusCode: 404 });
  }

  res.send(deletedCard);
};

const likeCard = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw Object.assign(
      new Error("Unauthorized"),
      { statusCode: 401 }
    );
  }

  const card = await Card.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    }
  );

  if (!card) {
    throw Object.assign(
      new Error("Card ID not found"),
      { statusCode: 404 }
    );
  }

  const userId = req.user._id;

  res.send({
    ...card.toObject(),
    isLiked: card.likes.some(
      (id) => id.toString() === userId
    ),
  });
};

const dislikeCard = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw Object.assign(
      new Error("Unauthorized"),
      { statusCode: 401 }
    );
  }

  const card = await Card.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    }
  );

  if (!card) {
    throw Object.assign(
      new Error("Card ID not found"),
      { statusCode: 404 }
    );
  }

  const userId = req.user._id;

  res.send({
    ...card.toObject(),
    isLiked: card.likes.some(
      (id) => id.toString() === userId
    ),
  });
};


export { 
  getCards, 
  createCard, 
  deleteCard, 
  likeCard, 
  dislikeCard,
};