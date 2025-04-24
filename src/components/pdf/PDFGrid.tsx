
import { FileText } from "lucide-react";

interface PDF {
  id: number;
  name: string;
  size: number;
  pages: number;
}

interface PDFGridProps {
  pdfs: PDF[];
  formatFileSize: (bytes: number) => string;
}

const PDFGrid = ({ pdfs, formatFileSize }: PDFGridProps) => {
  if (pdfs.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed rounded-lg">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-gray-500">No PDFs uploaded yet</p>
      </div>
    );
  }

  return (
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
  );
};

export default PDFGrid;
