import { PackageIcon } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { getTotalInStock } from "@/app/_data-acess/product/dashboard/get-total-in-stock";

const TotalInStockCard = async () => {
  const totalInStock = await getTotalInStock();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <PackageIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
      <SummaryCardValue>{totalInStock}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalInStockCard;
