'use client'

import * as z from "zod"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading" 
import { AlertModal } from "@/components/models/alert-model" 
import { createProduct, deleteProduct, updateProduct } from '@/lib/actions';

const formSchema = z.object({
  title: z.string().min(2),
  buyPrice: z.coerce.number(),
  sellPrice: z.coerce.number(),
  isNotPayed: z.boolean().default(false),
  name: z.string().optional()
});



export const AddProductForm = ({
  initialData,
}) => {

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit blogs' : 'Create blogs';
  const description = initialData ? 'Edit a blogs.' : 'Add a new blogs';
  const toastMessage = initialData ? 'blogs updated.' : 'blogs created.';
  const action = initialData ? 'Save changes' : 'Publish';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:  {
      title: initialData ? initialData.title : '',
      buyPrice: initialData ? initialData.buyPrice : '',
      sellPrice: initialData ? initialData.sellPrice : '',
      isNotPayed: initialData ? initialData.isNotPayed : false,
      name: initialData ? initialData.name : '',
    }
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        // update post 
        await updateProduct(initialData._id, {
          title: data.title,
          sellPrice: data.sellPrice,
          buyPrice: data.buyPrice,
          isNotPayed: data.isNotPayed,
          name: data.name,
        })
      } else {
        // add post
       await createProduct({
          title: data.title,
          sellPrice: data.sellPrice,
          buyPrice: data.buyPrice,
          isNotPayed: data.isNotPayed,
          name: data.name,
        })
      }
      router.refresh();
      router.push(`/products`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      // delete post 
      await deleteProduct(initialData._id);
      router.refresh();
      router.push(`/blogs`);
      toast.success('post deleted.');
    } catch (error) {
      toast.error('Make sure you removed all categories using this billboard first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
    <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-xl mx-auto mt-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={loading}
                    placeholder="Title" {...field} 
                     />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyPrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={loading}
                    placeholder="buy Price" {...field} 
                     />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sellPrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={loading}
                    placeholder="sell price" {...field} 
                     />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isNotPayed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-fit">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
             {form.watch('isNotPayed') && <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={loading}
                    placeholder="name" {...field} 
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />   }       
          <Button disabled={loading} type="submit" > 
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};