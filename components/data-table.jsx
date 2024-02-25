import { formatter } from "@/lib/utils"
import { CellAction } from "./call-action"

export const DataTable = ({data}) => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-5 text-sm mb-2 py-4 border-b">
                <h4>Title</h4>
                <h4 className="flex justify-center">Buy Price</h4>
                <h4 className="flex justify-center">Sell Price</h4>
                <h4 className="flex justify-center" >Profit</h4>
                <h4 className="flex justify-end">Edit</h4>
            </div>
            {data.map(item => (
                <div className="grid grid-cols-5 py-2 border-b text-sm" key={item._id}>
                    <h4 className="flex justify-start">{item.title}</h4>
                    <h4 className="flex justify-center gap-2">
                        {formatter.format(item.buyPrice)}
                        {item.isNotPayed && <span className="text-[8px] text-white bg-accentSoft dark:bg-accentDark px-1 rounded-md shadow-md">Not Payed</span>}
                    </h4>
                    <h4 className="flex justify-center relative">
                        {formatter.format(item.sellPrice)}
                    </h4>
                    <h4 className="flex justify-center items-center gap-3">{formatter.format(item.profit)}</h4>
                    <div className="flex justify-end">
                        <CellAction data={item}/>
                    </div>
                </div>
            ))}
        </div>
    )
}