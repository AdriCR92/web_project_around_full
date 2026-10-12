import type { CardData } from "../../../../types/types";

type ImagePopupProps = {
  card: CardData;
};

export default function ImagePopup({ card }: ImagePopupProps) {
  return (
    <>
      <img
        className="popup__image"
        src={card.link}
        alt={card.name}
      />
      <p className="popup__caption">
        {card.name}
      </p>
    </>
  );
}