const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-am-dark mb-4">404</h1>
        <p className="text-am-gray-dark mb-6">Page not found</p>
        <a 
          href="/" 
          className="inline-flex items-center px-4 py-2 bg-am-red text-white rounded-lg hover:bg-am-red/90 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;