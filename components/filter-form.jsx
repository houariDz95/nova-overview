"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { Input } from "./ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  start: z.date().optional(),
  end: z.date().optional(),
  name: z.string().optional(),
})

export function FilterForm({startDate, endDate, url}) {

    const [loading, setLoading] = useState(false)
    const router = useRouter()
  const form = useForm({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data) {
    const st = data.start ? format(data.start, 'yyyy-MM-dd') : startDate;
    const en = data.end ? format(data.end, 'yyyy-MM-dd') : endDate;
    if(data.name){
      router.push(`/${url}?start_date=${st}&end_date=${en}&search=${data.name}`)
    }else{
      router.push(`/${url}?start_date=${st}&end_date=${en}`)
    }
  }
  console.log(startDate)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-4">
        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>{startDate ? format(startDate, "PPP") : "Start Date"}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>{endDate ? format(endDate, "PPP") : "End Date"}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
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
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
