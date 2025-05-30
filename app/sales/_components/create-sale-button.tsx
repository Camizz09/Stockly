"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import UpsertSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { ProductDto } from "@/app/_data-acess/product/get-product";

interface UpsertSaleButtonProps {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

const UpsertSaleButton = (props: UpsertSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Nova Venda
        </Button>
      </SheetTrigger>
      <UpsertSheetContent
        isOpen={sheetIsOpen}
        setSheetIsOpen={setSheetIsOpen}
        {...props}
      />
    </Sheet>
  );
};

export default UpsertSaleButton;
