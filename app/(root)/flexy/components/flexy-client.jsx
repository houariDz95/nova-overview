"use client";

import { DataTable } from "@/components/data-table";
import { FilterForm } from "@/components/filter-form";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";



//import { columns, CategoryColumn } from "./columns";
//import { ApiList } from "@/components/ui/api-list";

export const FlexyClient = ({
  data,
  startDate,
  endDate,
  search
}) => {
  const params = useParams();
  console.log(params)
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`items (${data.length})`} description="Manage Flexy for your store" />
        <Button onClick={() => router.push(`/flexy/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <FilterForm
        url="flexy" 
        startDate={startDate} 
        endDate={endDate} 
        query={search}  
      />
      <DataTable data={data} />
    </>
  );
};