
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, File, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Check if all files are PDFs
    const invalidFiles = Array.from(files).filter(file => file.type !== "application/pdf");
    if (invalidFiles.length > 0) {
      toast.error("Only PDF files are allowed");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    
    setSelectedFiles(prev => [...prev, ...Array.from(files)]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files to upload");
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
      const mockPDFs: PDF[] = selectedFiles.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        pages: Math.floor(Math.random() * 20) + 1, // Mock page count
      }));
      
      setUploadProgress(100);
      setTimeout(() => {
        onUploadComplete(mockPDFs);
        toast.success(`${selectedFiles.length} PDF${selectedFiles.length > 1 ? 's' : ''} uploaded successfully`);
        setIsUploading(false);
        setUploadProgress(0);
        setSelectedFiles([]);
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
    <div className="w-full space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={() => fileInputRef.current?.click()}>
        <AspectRatio ratio={16/9} className="max-h-48">
          <div className="flex flex-col items-center justify-center h-full">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-lg font-medium">Drag and drop PDFs here</p>
            <p className="text-sm text-gray-500 mt-1">or click to browse</p>
          </div>
        </AspectRatio>
        <Input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-sm">Selected Files ({selectedFiles.length})</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md border">
                <div className="flex items-center gap-3">
                  <File className="h-5 w-5 text-pdf-primary" />
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeFile(index)}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-gray-500 text-right">{uploadProgress}%</p>
        </div>
      )}
      
      <Button 
        type="button"
        className={cn("w-full", selectedFiles.length === 0 && "opacity-50")}
        disabled={isUploading || selectedFiles.length === 0}
        onClick={handleUpload}
      >
        {isUploading ? "Uploading..." : "Upload Files"}
      </Button>
    </div>
  );
};

export default PDFUploader;
