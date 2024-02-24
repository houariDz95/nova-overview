"use client"

import { AlertModal } from "@/components/models/alert-model"
import { Button } from "@/components/ui/button";
import { deleteItemFromPerson, deletePerson } from "@/lib/actions";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const DeleteItem = ({personId, flexyId, producId, person}) => {
        const [open, setOpen] = useState(false)
        const [loading, setLoading] = useState(false);
        const router = useRouter()
        const onConfirm = async () => {
            try {
              setLoading(true);
              if(flexyId) {
                await deleteItemFromPerson(personId, producId = null, flexyId);
                toast.success('Flexy deleted.');
              }else if(producId){
                
                await  deleteItemFromPerson(personId, producId);;
                toast.success('Product deleted.');  
              }
              if(person && personId && !flexyId && !producId){
                await deletePerson(personId);
              }
              router.refresh();
            } catch (error) {
              toast.error('Make sure you removed all products using this category first.');
            } finally {
              setOpen(false);
              setLoading(false);
            }
          };
        
    return (
    <>
        <AlertModal 
            isOpen={open} 
            onClose={() => setOpen(false)}
            onConfirm={onConfirm}
            loading={loading}
        />
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Trash className="cursor-pointer w-4 h-4" />
        </Button>
    </>
    )

}