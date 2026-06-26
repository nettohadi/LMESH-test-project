import './App.css'
import { Toaster } from '@/components/ui/sonner'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { AdditionalData, WorkLoad } from './types'
import { useState } from 'react'
import { cn } from './lib/utils'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const defaultState: WorkLoad[] = [
  { month: 'Jan', value: 1, isActive: false },
  { month: 'Feb', value: 1, isActive: false },
  { month: 'Mar', value: 1, isActive: false },
  { month: 'Apr', value: 1, isActive: false },
  { month: 'May', value: 1, isActive: false },
  { month: 'Jun', value: 1, isActive: false },
  { month: 'Jul', value: 1, isActive: false },
  { month: 'Aug', value: 1, isActive: false },
  { month: 'Sep', value: 1, isActive: false },
  { month: 'Oct', value: 1, isActive: false },
  { month: 'Nov', value: 1, isActive: false },
  { month: 'Dec', value: 1, isActive: false },
]
function App() {
  const [workloads, setWorkLoads] = useState<WorkLoad[]>(defaultState)
  const [additionalData, setAdditionalData] = useState<AdditionalData>({ actingAs: '', note: '' })

  const toggleCheckbox = (month: string) => {
    setWorkLoads((items) => {
      return items.map((item) => {
        if (item.month === month) {
          return { ...item, isActive: !item.isActive }
        }
        return item
      })
    })
  }

  const changeValue = (month: string, value: string) => {
    let newValue = null
    if (isNaN(Number(value))) {
      toast.error('Please enter a valid number.', { id: 'invalid-number' })
      newValue = 1
    }

    if (Number(value) < 0 || Number(value) > 5) {
      toast.error('Staffing must be between 0 and 5.', { id: 'staffing-range' })
      newValue = 1
    }
    setWorkLoads((items) => {
      return items.map((item) => {
        if (item.month === month) {
          return { ...item, value: newValue ?? value }
        }
        return item
      })
    })
  }

  const getColor = (value: number, isFictive: boolean) => {
    if (value == 0 || isFictive) {
      return 'bg-red-200 text-red-800'
    }

    if (value > 0 && value < 1) {
      return 'bg-amber-200 text-amber-800'
    }

    if (value >= 4) {
      return 'bg-blue-200 text-blue-800'
    }
  }

  return (
    <>
      <Toaster />
      <TooltipProvider delayDuration={0}>
        <main className="bg-stone-200 w-full h-full flex justify-center pt-24 p-10">
          <div className="bg-white rounded-lg w-full h-full shadow-md p-5 scroll-auto">
            <h1 className="text-2xl font-bold">BIANCHINI Thierry</h1>
            <h3 className="text-stone-600">Workload</h3>
            <div className="overflow-auto">
              <table className="border-separate border-spacing-x-2 border-spacing-y-2">
                <thead>
                  <tr className="h-[50px]">
                    <th className="w-[110px] h-3"></th>
                    {workloads.map((workLoad) => (
                      <th key={workLoad.month} className="w-[100px]">
                        {workLoad.month}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    <th className="w-[110px] h-3"></th>
                    {workloads.map((workLoad) => (
                      <th
                        key={workLoad.month}
                        className={cn(
                          'w-[100px] p-2 rounded-md bg-teal-200 text-teal-800',
                          getColor(workLoad.value, workLoad.isActive),
                        )}
                      >
                        {workLoad.isActive ? 0 : workLoad.value}
                      </th>
                    ))}
                  </tr>
                  <tr className="">
                    <th colSpan={13} className="border-b-1 border-stone-400 h-5 "></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td colSpan={13} className="h-12 text-left">
                      <span className="text-black font-bold">Serial Life PSA</span>
                      <span className="text-stone-500 font-normal">
                        {' '}
                        | Europe | STELLANTIS | PSA
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[110px] h-3 text-stone-400 font-normal text-right">Total</td>
                    {workloads.map((workLoad) => (
                      <td key={workLoad.month} className="w-[100px] p-2 text-center font-bold">
                        {workLoad.isActive ? 0 : workLoad.value}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td rowSpan={2} className="w-[110px] h-3">
                      <div className="flex gap-1 font-normal">
                        <div>
                          <div className="bg-blue-700 h-6 w-[6px] rounded-sm"></div>
                        </div>
                        <div className="text-left text-stone-500">
                          <div>DE |</div>
                          <div>MR10R801</div>
                        </div>
                      </div>
                    </td>
                    {workloads.map((workLoad) => (
                      <td
                        key={workLoad.month}
                        className={cn(
                          'w-[100px] px-2 py-1 rounded-md bg-stone-100 text-stone-700 font-normal',
                          {
                            'bg-orange-100': workLoad.isActive,
                            'text-orange-500': workLoad.isActive,
                          },
                        )}
                      >
                        <span className="flex gap-1 justify-center items-center">
                          <input
                            type="text"
                            onChange={(e) => changeValue(workLoad.month, e.target.value)}
                            className="w-8 text-center rounded-sm border-2 border-transparent focus:border-blue-500 outline-none"
                            value={workLoad.value}
                          />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="inline-flex">
                                <Checkbox
                                  checked={workLoad.isActive}
                                  onCheckedChange={() => toggleCheckbox(workLoad.month)}
                                />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="rounded-md">
                              <p>Mark as fictive</p>
                            </TooltipContent>
                          </Tooltip>
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td colSpan={2} className="rounded-md pt-2 align-top">
                      <Select
                        value={additionalData.actingAs}
                        onValueChange={(value) => {
                          setAdditionalData((prevState) => ({ ...prevState, actingAs: value }))
                        }}
                      >
                        <SelectTrigger className="w-full max-w-48 bg-stone-100 rounded-sm border-0 h-[50px]">
                          <SelectValue placeholder="Acting as" className="font-normal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="tester">Tester</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </td>
                    <td colSpan={10} className="rounded-md  pt-2 text-left">
                      <textarea
                        className={cn(
                          'w-full font-normal bg-stone-100 p-2',
                          'rounded-sm h-9 focus:h-19 transition-[height]',
                          'duration-200 resize-none outline-none',
                        )}
                        name=""
                        id=""
                        onChange={(e) => {
                          setAdditionalData((prevState) => ({ ...prevState, note: e.target.value }))
                        }}
                        value={additionalData.note || 'test'}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={13} className="border-b border-stone-400 h-5 "></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </TooltipProvider>
    </>
  )
}

export default App
