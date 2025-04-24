
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  isSearching: boolean;
}

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch, isSearching }: SearchBarProps) => {
  return (
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
    </div>
  );
};

export default SearchBar;
