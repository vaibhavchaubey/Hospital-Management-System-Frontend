import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react'; // ✅ using Tabler icons

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-6">
      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
      <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-500 text-lg text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 flex items-center gap-2 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-medium transition-all duration-300"
      >
        <IconArrowLeft size={22} />
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;
