
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import PDFUploader from "@/components/PDFUploader";
import PDFList from "@/components/PDFList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSearch, Upload } from "lucide-react";

interface PDF {
  id: number;
  name: string;
  size: number;
  pages: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [activeTab, setActiveTab] = useState<string>("upload");

  const handleUploadComplete = (newPdfs: PDF[]) => {
    setPdfs(prev => [...prev, ...newPdfs]);
    // Switch to the documents tab after uploading
    setActiveTab("documents");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.email}</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 w-full sm:w-auto">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload PDFs
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileSearch className="h-4 w-4" />
              My Documents
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Upload PDFs</CardTitle>
              </CardHeader>
              <CardContent>
                <PDFUploader onUploadComplete={handleUploadComplete} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">My Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <PDFList pdfs={pdfs} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
