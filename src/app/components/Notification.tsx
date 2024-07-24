const Notification = ({ message }: { message: string }) => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50">
      {message}
    </div>
  );
};

export default Notification;
