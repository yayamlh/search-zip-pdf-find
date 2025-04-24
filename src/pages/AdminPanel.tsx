
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import UserTable from "@/components/UserTable";
import { Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const AdminPanel = () => {
  const { isAdmin } = useAuth();

  // Redirect if not an admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <UserTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
