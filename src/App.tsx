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
import type { WorkLoad } from './types'
import { useState } from 'react'
import { cn } from './lib/utils'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'

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
  const [workloads, setWorkLoads] = useState(defaultState)

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

  return (
    <>
      <Toaster />
      <main className="bg-stone-200 w-full h-full flex justify-center pt-24 p-10">
        <div className="bg-white rounded-lg w-full h-full shadow-md p-5 scroll-auto">
          <h1 className="text-2xl font-bold">BIANCHINI Thierry</h1>
          <h3 className="text-stone-600">Workload</h3>
          <div className="overflow-auto">
            <table className="border-separate border-spacing-x-2 border-spacing-y-2">
              <tr className="h-[50px]">
                <th className="w-[200px] h-3"></th>
                {workloads.map((workLoad) => (
                  <th className="w-[100px]">{workLoad.month}</th>
                ))}
              </tr>
              <tr>
                <th className="w-[200px] h-3"></th>
                {workloads.map((workLoad) => (
                  <th
                    className={cn('w-[100px] p-2 rounded-md bg-teal-200 text-teal-800', {
                      'bg-red-200': workLoad.value == 0,
                      'text-red-800': workLoad.value == 0,
                      'bg-amber-200': workLoad.value > 0 && workLoad.value < 1,
                      'text-amber-800': workLoad.value > 0 && workLoad.value < 1,
                    })}
                  >
                    {workLoad.value}
                  </th>
                ))}
              </tr>
              <tr className="">
                <th colSpan={13} className="border-b-1 border-stone-400 h-5 "></th>
              </tr>
              <tr className="">
                <th colSpan={13} className="h-12 text-left">
                  <span className="text-black font-bold">Serial Life PSA</span>
                  <span className="text-stone-500 font-normal"> | Europe | STELLANTIS | PSA</span>
                </th>
              </tr>
              <tr>
                <th className="w-[200px] h-3 text-stone-500 font-normal">Total</th>
                {workloads.map((workLoad) => (
                  <th className="w-[100px] p-2">{workLoad.value}</th>
                ))}
              </tr>
              <tr>
                <th rowSpan={2} className="w-[200px] h-3">
                  test
                </th>
                {workloads.map((workLoad) => (
                  <th
                    className={cn(
                      'w-[100px] p-2 rounded-md bg-stone-200 text-stone-700 font-normal',
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
                      <Checkbox
                        checked={workLoad.isActive}
                        onCheckedChange={() => toggleCheckbox(workLoad.month)}
                      />
                    </span>
                  </th>
                ))}
              </tr>
              <tr>
                <th colSpan={2} className="rounded-md bg-stone-200 p-2">
                  <Select>
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder="Acting as" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </th>
                <th colSpan={10} className="rounded-md bg-stone-200 p-2">
                  Input
                </th>
              </tr>
              <th colSpan={13} className="border-b-1 border-stone-400 h-5 "></th>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
