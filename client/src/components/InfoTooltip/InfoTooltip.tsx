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
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="info-tooltip">
        <p className="info-tooltip__message">
          {message ||
            (isSuccess
            ? "Te has registrado correctamente!"
            : "Algo salió mal! Por favor, inténtalo de nuevo.")}
        </p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;