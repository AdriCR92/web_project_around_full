import Popup from "../Main/Popup/Popup";

type InfoTooltipProps = {
  isOpen: boolean;
  isSuccess: boolean;
  onClose: () => void;
};

function InfoTooltip({
  isOpen,
  isSuccess,
  onClose,
}: InfoTooltipProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="info-tooltip">
        <p className="info-tooltip__message">
          {isSuccess
            ? "You've successfully registered!"
            : "Something went wrong! Please try again."}
        </p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;