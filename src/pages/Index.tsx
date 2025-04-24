
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileSearch, Upload, Search, Download, Shield } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find what you need in your PDF documents
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Upload multiple PDFs, search for content across all documents, and download matching files in a ZIP archive.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-pdf-primary hover:bg-blue-600 text-lg py-6"
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
              </Button>
              {!isAuthenticated && (
                <Button 
                  variant="outline" 
                  className="text-lg py-6"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
              )}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-64 bg-pdf-primary rounded-full flex items-center justify-center">
              <FileSearch className="w-32 h-32 text-white" />
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-pdf-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Upload PDFs</h3>
              <p className="text-gray-600">
                Upload multiple PDF files at once to our secure platform.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-pdf-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Search Content</h3>
              <p className="text-gray-600">
                Enter keywords or phrases to find across all your PDF documents.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-pdf-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Download Results</h3>
              <p className="text-gray-600">
                Get all matching files in a convenient ZIP archive.
              </p>
            </div>
          </div>
        </div>
        
        {/* Admin Features */}
        <div className="bg-gray-100 rounded-lg p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-pdf-accent flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Admin Features</h3>
              <p className="text-gray-600">
                Manage users, monitor usage, and maintain control with our comprehensive admin tools.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center text-gray-500 pt-8 border-t border-gray-200">
          <p>&copy; 2025 PDFfinder. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
