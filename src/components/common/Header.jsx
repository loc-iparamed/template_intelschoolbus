const Header = ({title}) => {
  return (
    <header className="bg-gray-800 bg-opacity-60 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="  mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-gray-100">{title}</h1>
      </div>
    </header>
  );
};
export default Header;
