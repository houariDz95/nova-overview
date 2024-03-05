import { Trash, Weight } from "lucide-react";
import { PeopleClient } from "./components/people-client";
import { getPeople } from "@/lib/actions";
import { Gabarito } from "next/font/google";
import { cn, formatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DeleteItem } from "./components/delete-item";

const gabarito = Gabarito({subsets: ['latin'], weight: "500"})

const People = async () => {
    const people = await getPeople()

    const buyProductSumsPerPerson = people.map((person) => {
      const personSum = person.unpaidProducts.reduce((sum, product) => sum + product.sellPrice, 0);
      return { personName: person.name, buyProductSum: personSum };
    });
    

  return (
    <div className="flex flex-col mb-10">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PeopleClient length={people.length} />
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {people.map(person => (
            <div className="border p-4 m-4 rounded-lg" key={person._id}>
              <div className="w-full flex justify-between items-center">
                <h2 className={cn("text-xl capitalize font-medium text-accentSoft dark:text-accentDark", gabarito.className)}>{person.name}</h2>
                <DeleteItem person  personId={person._id} />
              </div>
              <div className="mt-2">
                <h4 className="text-lg mb-2 text-center border-b w-full py-1 border-accentSoft dark:border-accentDark">Unpaid Products</h4>
                {person.unpaidProducts.length ? (
                  <>
                  <ul className="list-disc ml-4  p-3">
                    {person.unpaidProducts.map(product => (
                      <li key={product._id} className="flex w-full items-center justify-between text-sm">
                        {product.title}
                          <DeleteItem personId={person._id} producId={product._id} />
                      </li>
                    ))}
                  </ul>
                  <span className="text-sm text-center py-2 px-3 text-accentSoft dark:text-accentDark">{formatter.format(person.unpaidProducts.reduce((sum, product) => sum + product.sellPrice, 0))}</span>
                  </>
                ) : <p className="italic text-sm py-1 w-fit rounded-sm bg-slate-300 dark:bg-neutral-600 px-1">No unpaid products</p>}
              </div>
              <div className="mt-4">
                <h4 className="text-lg mb-2 text-center border-b w-full py-1 border-accentSoft dark:border-accentDark">Unpaid Flexy</h4>
                {person.unpaidFlexy.length ? (
                  <ul className="list-disc ml-4 p-3">
                    {person.unpaidFlexy.map(flexy => (
                      <li key={flexy._id} className="flex w-full justify-between text-sm items-center">
                        {flexy.title} {" "}
                        {flexy.buyPrice}
                        <DeleteItem personId={person._id}  flexyId={flexy._id} />
                      </li>
                    ))}
                  </ul>
                ) : <p className="italic text-sm py-1 w-fit rounded-sm bg-slate-300 dark:bg-neutral-600 px-1">No unpaid flexy</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default People