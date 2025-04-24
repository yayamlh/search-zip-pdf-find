
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import UserTable from "@/components/UserTable";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCog, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <span className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-medium">
            Admin Access
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total Users</CardTitle>
              <CardDescription>Active accounts on platform</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold">24</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">User Activity</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <UserCog className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold">12</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Storage Used</CardTitle>
              <CardDescription>Total PDF storage</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <Info className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold">2.4 GB</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">User Management</CardTitle>
                <CardDescription>
                  Manage user accounts, permissions, and access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription>
                    Changes made to user accounts take effect immediately. 
                    Deactivated users will lose access until reactivated.
                  </AlertDescription>
                </Alert>
                <UserTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
