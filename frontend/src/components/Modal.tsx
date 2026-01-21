interface ModalProps {
  children: React.ReactNode;
  title: string;
}
const Modal = ({ children, title }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md w-80 flex flex-col gap-2">
        <h2 className="font-semibold text-lg">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
