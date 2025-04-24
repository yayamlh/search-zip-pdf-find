
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import PDFUploader from "@/components/PDFUploader";
import PDFList from "@/components/PDFList";
import { Card, CardContent } from "@/components/ui/card";

interface PDF {
  id: number;
  name: string;
  size: number;
  pages: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [pdfs, setPdfs] = useState<PDF[]>([]);

  const handleUploadComplete = (newPdfs: PDF[]) => {
    setPdfs(prev => [...prev, ...newPdfs]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Upload PDFs</h2>
              <PDFUploader onUploadComplete={handleUploadComplete} />
            </CardContent>
          </Card>
          
          <div className="bg-white rounded-lg border p-6">
            <PDFList pdfs={pdfs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
