
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PDF {
  id: number;
  name: string;
  size: number;
  pages: number;
}

interface PDFUploaderProps {
  onUploadComplete: (pdfs: PDF[]) => void;
}

const PDFUploader = ({ onUploadComplete }: PDFUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Check if all files are PDFs
    const invalidFiles = Array.from(files).filter(file => file.type !== "application/pdf");
    if (invalidFiles.length > 0) {
      toast.error("Only PDF files are allowed");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);
    
    try {
      // In a real app, this would be an API call to upload the files
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response with uploaded PDFs
      const mockPDFs: PDF[] = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        pages: Math.floor(Math.random() * 20) + 1, // Mock page count
      }));
      
      setUploadProgress(100);
      setTimeout(() => {
        onUploadComplete(mockPDFs);
        toast.success(`${files.length} PDF${files.length > 1 ? 's' : ''} uploaded successfully`);
        setIsUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 500);
      
    } catch (error) {
      toast.error("Error uploading files");
      setIsUploading(false);
      setUploadProgress(0);
    } finally {
      clearInterval(interval);
    }
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <Input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf"
          onChange={handleUpload}
          disabled={isUploading}
          className="file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-pdf-primary file:text-white
          hover:file:bg-blue-600"
        />
        <Button 
          type="button"
          variant="outline"
          size="icon"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>
      
      {isUploading && (
        <div className="mt-4 space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-gray-500 text-right">{uploadProgress}%</p>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
