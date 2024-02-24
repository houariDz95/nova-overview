"use client"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import {  Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export const PeopleClient = ({length}) => {
    const router = useRouter();

    return(
        <div>
            <div className="flex items-center justify-between">
                <Heading title={`items (${length})`} description="Manage People for your store" />
                <Button onClick={() => router.push(`/people/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
        </div>
    )
}