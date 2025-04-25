
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
  return (
    <div className="bg-white rounded-lg border p-4">
      <h4 className="font-medium flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-pdf-primary" />
        <span className="flex-1">{pdfName}</span>
        <Badge variant="outline" className="text-pdf-primary">
          {pageMatches.length} {pageMatches.length === 1 ? 'match' : 'matches'}
        </Badge>
      </h4>
      <div className="space-y-3">
        {pageMatches.map((match, idx) => (
          <div key={idx} className="bg-gray-50 p-3 rounded-md text-sm relative">
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-pdf-primary hover:bg-pdf-primary/90 text-base">
                Page {match.page}/{pdfName.includes('(') ? pdfName.split('(')[1].split('/')[1].replace(')', '') : '?'}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2"
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
