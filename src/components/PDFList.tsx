import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import PreviewDrawer from "./PreviewDrawer";
import SearchBar from "./pdf/SearchBar";
import PDFGrid from "./pdf/PDFGrid";
import SearchResult from "./pdf/SearchResult";

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
        <PDFGrid pdfs={pdfs} formatFileSize={formatFileSize} />
      </div>

      {pdfs.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
              isSearching={isSearching}
            />
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
                  <SearchResult
                    key={result.pdfId}
                    pdfName={result.pdfName}
                    pageMatches={result.pageMatches}
                    onPreviewClick={handlePreviewClick}
                    searchTerm={searchTerm}
                    highlightSearchTerm={highlightSearchTerm}
                  />
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
