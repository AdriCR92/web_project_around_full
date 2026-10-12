import type { CardData, PopupConfig } from "../../../types/types";
import ImagePopup from "../Popup/ImagePopup/ImagePopup";

type CardProps = {
  card: CardData;
  handleOpenPopup: (config: PopupConfig) => void;
  handleCardLike: (card: CardData) => Promise<void>;
  handleCardDelete: (card: CardData) => Promise<void>;
};

export default function Card({ 
  card, 
  handleOpenPopup, 
  handleCardLike, 
  handleCardDelete 
}: CardProps) {
  const { name, link } = card;

  const imageComponent: PopupConfig = {
    children: <ImagePopup card={card} />,
  };

  const cardLikeButtonClassName = `card__like-button ${card.isLiked ? "card__like-button_is-active" : ""}`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imageComponent)}
      />
      <button
        className="card__delete-button"
        type="button"
        onClick={() => handleCardDelete(card)}
      ></button>
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={() => handleCardLike(card)}
        ></button>
      </div>
    </li>
  );
}