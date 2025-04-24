
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfName: string;
  pageNumber: number;
  previewText: string;
}

const PreviewDrawer = ({
  isOpen,
  onClose,
  pdfName,
  pageNumber,
  previewText,
}: PreviewDrawerProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-pdf-primary" />
            {pdfName} - Page {pageNumber}
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4 min-h-[200px] max-h-[60vh] overflow-y-auto">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="whitespace-pre-wrap font-mono text-sm">{previewText}</p>
          </div>
        </div>
        <DrawerFooter>
          <Button variant="outline" onClick={onClose}>
            Close Preview
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PreviewDrawer;
