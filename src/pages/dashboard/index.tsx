import DashboardPage from "./DashboardPage";

const Dashboard: React.FC = () => {
  return (
    <div className="px-1 min-h-screen flex  justify-center bg-gray-200">
      <div className="max-w-7xl w-full p-4 bg-white flex  justify-center rounded-lg shadow-md">
        {/* md:container md:mx-auto  */}
        <DashboardPage />
        <div className="w-72 max-h-screen font-bold bg-gray-300 shadow-md">
          Favorites
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
