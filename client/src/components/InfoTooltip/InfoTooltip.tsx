import Popup from "../Main/Popup/Popup";

type InfoTooltipProps = {
  isOpen: boolean;
  isSuccess: boolean;
  onClose: () => void;
  message?: string;
};

function InfoTooltip({
  isOpen,
  isSuccess,
  onClose,
  message,
}: InfoTooltipProps) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      type="info"
    >
      <div className="info-tooltip">
        <div
          className={`info-tooltip__icon ${
            isSuccess
              ? "info-tooltip__icon_success"
              : "info-tooltip__icon_error"
          }`}
        >
          {isSuccess ? "✓" : "×"}
        </div>

        <p className="info-tooltip__message">
          {message ||
            (isSuccess
              ? "¡Correcto! Ya estás registrado."
              : "Uy, algo salió mal. Por favor, inténtalo de nuevo.")}
        </p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;