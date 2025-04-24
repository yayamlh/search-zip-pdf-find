import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Download, FileText, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import PreviewDrawer from "./PreviewDrawer";

interface PDF {
  id: number;
  name: string;
  size: number;
  pages: number;
}

interface SearchResult {
  pdfId: number;
  pdfName: string;
  pageMatches: { page: number; excerpt: string }[];
}

interface PDFListProps {
  pdfs: PDF[];
}

const PDFList = ({ pdfs }: PDFListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewData, setPreviewData] = useState<{
    isOpen: boolean;
    pdfName: string;
    pageNumber: number;
    previewText: string;
  }>({
    isOpen: false,
    pdfName: "",
    pageNumber: 0,
    previewText: "",
  });

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setIsSearching(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (pdfs.length === 0) {
        toast.error("No PDFs available to search");
        setSearchResults([]);
        return;
      }

      const mockResults: SearchResult[] = pdfs.map(pdf => {
        if (Math.random() > 0.3) {
          const matchCount = Math.floor(Math.random() * 5) + 1;
          const pageMatches = Array.from({ length: matchCount }, () => {
            const page = Math.floor(Math.random() * pdf.pages) + 1;
            const excerpt = `...text before ${searchTerm} and text after...`;
            return { page, excerpt };
          });
          
          return {
            pdfId: pdf.id,
            pdfName: pdf.name,
            pageMatches
          };
        }
        return {
          pdfId: pdf.id,
          pdfName: pdf.name,
          pageMatches: []
        };
      }).filter(result => result.pageMatches.length > 0);

      setSearchResults(mockResults);
      
      if (mockResults.length === 0) {
        toast.info(`No matches found for "${searchTerm}"`);
      } else {
        const totalMatches = mockResults.reduce(
          (sum, result) => sum + result.pageMatches.length, 0
        );
        toast.success(`Found ${totalMatches} matches in ${mockResults.length} files`);
      }
    } catch (error) {
      toast.error("Error searching PDFs");
    } finally {
      setIsSearching(false);
    }
  };

  const handleDownload = async () => {
    if (searchResults.length === 0) {
      toast.error("No search results to download");
      return;
    }

    setIsDownloading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("ZIP file generated and downloaded");
    } catch (error) {
      toast.error("Error generating ZIP file");
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreviewClick = (pdfName: string, pageNumber: number, excerpt: string) => {
    setPreviewData({
      isOpen: true,
      pdfName,
      pageNumber,
      previewText: excerpt,
    });
  };

  const closePreview = () => {
    setPreviewData(prev => ({ ...prev, isOpen: false }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const highlightSearchTerm = (text: string, term: string): JSX.Element => {
    if (!term) return <>{text}</>;
    
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === term.toLowerCase() ? 
            <span key={index} className="highlight">{part}</span> : 
            part
        )}
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your PDFs ({pdfs.length})</h2>
        
        {pdfs.length === 0 ? (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">No PDFs uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pdfs.map((pdf) => (
              <div key={pdf.id} className="pdf-card flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-pdf-primary mr-2" />
                    <div className="truncate font-medium" title={pdf.name}>
                      {pdf.name}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>{pdf.pages} {pdf.pages === 1 ? 'page' : 'pages'}</span>
                  <span>{formatFileSize(pdf.size)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {pdfs.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Enter search term..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                onClick={handleSearch} 
                disabled={isSearching || !searchTerm.trim()}
                className="bg-pdf-primary hover:bg-blue-600"
              >
                {isSearching ? "Searching..." : "Search"}
                <Search className="ml-2 h-4 w-4" />
              </Button>
            </div>
            {searchResults.length > 0 && (
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                variant="outline"
              >
                {isDownloading ? "Generating..." : "Download Results"}
                <Download className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Search Results</h3>
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <div key={result.pdfId} className="bg-white rounded-lg border p-4">
                    <h4 className="font-medium flex items-center">
                      <FileText className="h-4 w-4 text-pdf-primary mr-2" />
                      {result.pdfName}
                    </h4>
                    <div className="mt-2 space-y-2">
                      {result.pageMatches.map((match, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-md text-sm relative">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-pdf-primary hover:bg-pdf-primary/90">
                                Page {match.page}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => handlePreviewClick(result.pdfName, match.page, match.excerpt)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Preview
                            </Button>
                          </div>
                          <p className="text-gray-700 pl-2 border-l-2 border-pdf-primary">
                            {highlightSearchTerm(match.excerpt, searchTerm)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <PreviewDrawer
        isOpen={previewData.isOpen}
        onClose={closePreview}
        pdfName={previewData.pdfName}
        pageNumber={previewData.pageNumber}
        previewText={previewData.previewText}
      />
    </div>
  );
};

export default PDFList;
