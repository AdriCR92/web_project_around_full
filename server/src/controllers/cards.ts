import type { Request, Response } from "express";
import mongoose from "mongoose";
import Card from "../models/card.js";
import { HttpError } from "../utils/HttpError.js";

// GET - Obtener las tarjetas del usuario autenticado
const getCards = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw new HttpError("No autorizado", 401);
  }

  const userId = req.user._id;

  const cards = await Card.find({
    owner: new mongoose.Types.ObjectId(userId),
  }).sort({ _id: -1 });

  const cardsWithIsLiked = cards.map((card) => ({
    ...card.toObject(),
    isLiked: card.likes.some(
      (id) => id.toString() === userId
    ),
  }));

  res.send(cardsWithIsLiked);
};

// POST - Crear una tarjeta
const createCard = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw new HttpError("No autorizado", 401);
  }

  const { name, link } = req.body;

  const newCard = await Card.create({
    name,
    link,
    owner: new mongoose.Types.ObjectId(req.user._id),
  });

  res.status(201).send(newCard);
};

// DELETE - Eliminar una tarjeta
const deleteCard = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw new HttpError("No autorizado", 401);
  }

  const { id } = req.params;

  const card = await Card.findById(id);

  if (!card) {
    throw new HttpError("Id de tarjeta no encontrado", 404);
  }

  if (card.owner.toString() !== req.user._id) {
    throw new HttpError(
      "Forbidden: Solo el propietario puede modificar la tarjeta",
      403
    );
  }

  await card.deleteOne();

  res.status(200).send(card);
};

// PUT - Agregar un like
const likeCard = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw new HttpError("No autorizado", 401);
  }

  const card = await Card.findById(req.params.id);

  if (!card) {
    throw new HttpError("Id de tarjeta no encontrado", 404);
  }

  if (card.owner.toString() !== req.user._id) {
    throw new HttpError(
      "Forbidden: Solo el propietario puede modificar la tarjeta",
      403
    );
  }

  const updatedCard = await Card.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: {
        likes: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      returnDocument: "after",
    }
  );

  if (!updatedCard) {
    throw new HttpError("Id de tarjeta no encontrado", 404);
  }

  const userId = req.user._id;

  res.send({
    ...updatedCard.toObject(),
    isLiked: updatedCard.likes.some(
      (id) => id.toString() === userId
    ),
  });
};

// DELETE - Quitar un like
const dislikeCard = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw new HttpError("No autorizado", 401);
  }

  const card = await Card.findById(req.params.id);

  if (!card) {
    throw new HttpError("Id de tarjeta no encontrado", 404);
  }

  if (card.owner.toString() !== req.user._id) {
    throw new HttpError(
      "Forbidden: Solo el propietario puede modificar la tarjeta",
      403
    );
  }

  const updatedCard = await Card.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        likes: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      returnDocument: "after",
    }
  );

  if (!updatedCard) {
    throw new HttpError("Id de tarjeta no encontrado", 404);
  }

  const userId = req.user._id;

  res.send({
    ...updatedCard.toObject(),
    isLiked: updatedCard.likes.some(
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