type PopupProps = {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  type?: "default" | "info";
};

export default function Popup({
  title,
  children,
  isOpen,
  onClose,
  type = "default",
}: PopupProps) {
  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div
        className={`popup__content ${
          type === "info"
            ? "popup__content_type_info"
            : !title
            ? "popup__content_content_image"
            : ""
        }`}
      >
        <button
          aria-label="Close popup"
          className="popup__close"
          type="button"
          onClick={onClose}
        />

        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}