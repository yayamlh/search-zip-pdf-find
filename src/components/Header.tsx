
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { FileSearch, User, Shield, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FileSearch className="h-6 w-6 text-pdf-primary" />
            <span className="text-xl font-semibold">PDFfinder</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-4">
                  <Link to="/dashboard" className="text-gray-600 hover:text-pdf-primary">
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="text-gray-600 hover:text-pdf-primary">
                      Admin
                    </Link>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="hidden md:block text-sm text-gray-600">
                    {user?.email}
                    {isAdmin && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pdf-accent text-white">
                        <Shield className="w-3 h-3 mr-1" />
                        Admin
                      </span>
                    )}
                  </div>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-600 hover:text-pdf-primary"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button className="bg-pdf-primary hover:bg-blue-600" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
