"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
//import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { FilterForm } from "@/components/filter-form";
import { DataTable } from "@/components/data-table";


export const ProductsClient = ({
  data,
  startDate,
  endDate,
  search
}) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`items (${data.length})`} description="Manage Flexy for your store" />
        <Button onClick={() => router.push(`/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <FilterForm 
        startDate={startDate} 
        endDate={endDate} 
        query={search}
        url="products"  
      />
      <DataTable data={data} />
    </>
  );
};