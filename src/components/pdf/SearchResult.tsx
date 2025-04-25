
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";

interface SearchResultProps {
  pdfName: string;
  pageMatches: { page: number; excerpt: string }[];
  onPreviewClick: (pdfName: string, pageNumber: number, excerpt: string) => void;
  searchTerm: string;
  highlightSearchTerm: (text: string, term: string) => JSX.Element;
}

const SearchResult = ({ 
  pdfName, 
  pageMatches, 
  onPreviewClick, 
  searchTerm,
  highlightSearchTerm 
}: SearchResultProps) => {
  // Extract total pages from the PDF name (assuming format: filename (X pages))
  const getTotalPages = () => {
    // First try to extract from the PDF name format: filename (X/Y)
    if (pdfName.includes('(') && pdfName.includes('/')) {
      const totalPages = pdfName.split('(')[1].split('/')[1].replace(')', '');
      return totalPages;
    }
    
    // Then try to extract from PDF name format: filename (X pages)
    if (pdfName.includes('(') && pdfName.includes('pages')) {
      const regex = /\((\d+) pages\)/;
      const match = pdfName.match(regex);
      if (match && match[1]) {
        return match[1];
      }
    }

    // Fallback to extracting just the number from parentheses
    if (pdfName.includes('(') && pdfName.includes(')')) {
      const regex = /\((\d+)\)/;
      const match = pdfName.match(regex);
      if (match && match[1]) {
        return match[1];
      }
    }
    return '?';
  };

  // Clean PDF name by removing page count from the name
  const cleanPdfName = () => {
    if (pdfName.includes('(')) {
      return pdfName.split('(')[0].trim();
    }
    return pdfName;
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <h4 className="font-medium flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-pdf-primary" />
        <span className="flex-1">{cleanPdfName()}</span>
        <Badge variant="outline" className="text-pdf-primary">
          {pageMatches.length} {pageMatches.length === 1 ? 'match' : 'matches'} in {getTotalPages()} pages
        </Badge>
      </h4>
      <div className="space-y-3">
        {pageMatches.map((match, idx) => (
          <div key={idx} className="bg-gray-50 p-3 rounded-md text-sm relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-gray-700">
                  <span className="font-medium">{cleanPdfName()}</span>
                  <span className="mx-2">/</span>
                  <span className="text-pdf-primary">{searchTerm}</span>
                  <span className="mx-2">/</span>
                  <span>exist on page {match.page} of {getTotalPages()}</span>
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 ml-2"
                onClick={() => onPreviewClick(pdfName, match.page, match.excerpt)}
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
  );
};

export default SearchResult;
