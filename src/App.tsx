import './App.css'
import { Checkbox } from '@/components/ui/checkbox'
import { type PersonData, type Workload } from './types'
import { useState } from 'react'
import { cn, getDefaultData } from './lib/utils'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useDebouncedCallback } from 'use-debounce'
import SelectActingAs from './components/SelectActingAs'

function App() {
  const [personData, setPersonData] = useState<PersonData>(getDefaultData())

  const updateWorkLoadByMonth = (month: string, newValues: Partial<Workload>) => {
    setPersonData((prevState) => {
      const workloads = prevState.workloads.map((item) => {
        if (item.month === month) {
          return { ...item, ...newValues }
        }
        return item
      })

      return { ...prevState, workloads }
    })
  }

  const updatePersonData = (newValues: Partial<PersonData>) => {
    setPersonData((prevState) => ({ ...prevState, ...newValues }))
  }

  const toggleCheckbox = (month: string, isChecked: boolean | string) => {
    updateWorkLoadByMonth(month, { isFictive: Boolean(isChecked) })
  }

  const validate = useDebouncedCallback((month: string, value: string) => {
    if (value.trim() === '') {
      updateWorkLoadByMonth(month, { value: '0' })
    }

    if (isNaN(Number(value))) {
      toast.error('Please enter a valid number.', { id: 'invalid-number' })
      updateWorkLoadByMonth(month, { value: '1' })
    }

    if (Number(value) < 0 || Number(value) > 5) {
      toast.error('Staffing must be between 0 and 5.', { id: 'staffing-range' })
      updateWorkLoadByMonth(month, { value: '1' })
    }
  }, 500)

  const changeValue = (month: string, value: string) => {
    updateWorkLoadByMonth(month, { value: value })
    validate(month, value)
  }

  const getMonthColor = (value: string, isFictive: boolean) => {
    const numberValue = Number(value)

    if (numberValue == 0 || isFictive) {
      return 'bg-red-200 text-red-800'
    }

    if (numberValue > 0 && numberValue < 1) {
      return 'bg-amber-200 text-amber-800'
    }

    if (numberValue >= 4) {
      return 'bg-blue-200 text-blue-800'
    }
  }

  return (
    <>
      <main className="bg-stone-200 w-full h-full flex justify-center pt-24 p-10">
        <div className="bg-white rounded-lg w-full h-full shadow-md p-5 scroll-auto">
          <h1 className="text-2xl font-bold">{personData.name}</h1>
          <h3 className="text-stone-600">Workload</h3>
          <div className="overflow-auto">
            <table className="border-separate border-spacing-x-2 border-spacing-y-2">
              <thead>
                <tr className="h-12.5">
                  <th className="w-27.5 h-3"></th>
                  {personData.workloads.map((workload) => (
                    <th key={workload.month} className="w-25">
                      {workload.month}
                    </th>
                  ))}
                </tr>
                <tr>
                  <th className="w-27.5 h-3"></th>
                  {personData.workloads.map((workload) => (
                    <th
                      key={workload.month}
                      className={cn(
                        'w-25 p-2 rounded-md bg-teal-200 text-teal-800',
                        getMonthColor(workload.value, workload.isFictive),
                      )}
                    >
                      {workload.isFictive ? 0 : workload.value}
                    </th>
                  ))}
                </tr>
                <tr className="">
                  <th colSpan={13} className="border-b border-stone-400 h-5 "></th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td colSpan={13} className="h-12 text-left">
                    <span className="text-black font-bold">Serial Life PSA</span>
                    <span className="text-stone-500 font-normal"> | Europe | STELLANTIS | PSA</span>
                  </td>
                </tr>
                <tr>
                  <td className="w-27.5 h-3 text-stone-400 font-normal text-right">Total</td>
                  {personData.workloads.map((workload) => (
                    <td key={workload.month} className="w-25 p-2 text-center font-bold">
                      {workload.isFictive ? 0 : workload.value}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td rowSpan={2} className="w-27.5 h-3">
                    <div className="flex gap-1 font-normal">
                      <div>
                        <div className="bg-blue-700 h-6 w-1.5 rounded-sm"></div>
                      </div>
                      <div className="text-left text-stone-500">
                        <div>DE |</div>
                        <div>MR10R801</div>
                      </div>
                    </div>
                  </td>
                  {personData.workloads.map((workload) => (
                    <td
                      key={workload.month}
                      className={cn(
                        'w-25 px-2 py-1 rounded-md bg-stone-100 text-stone-700 font-normal',
                        {
                          'bg-orange-100': workload.isFictive,
                          'text-orange-500': workload.isFictive,
                        },
                      )}
                    >
                      <span className="flex gap-1 justify-center items-center">
                        <input
                          type="text"
                          onChange={(e) => changeValue(workload.month, e.target.value)}
                          className="w-8 text-center rounded-sm border-2 border-transparent focus:border-blue-500 outline-none"
                          value={workload.value}
                        />
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-flex">
                              <Checkbox
                                checked={workload.isFictive}
                                onCheckedChange={(checked) =>
                                  toggleCheckbox(workload.month, checked)
                                }
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
                    <SelectActingAs
                      value={personData.actingAs}
                      onValueChange={(value) => {
                        updatePersonData({ actingAs: value })
                      }}
                    />
                  </td>
                  <td colSpan={10} className="rounded-md  pt-2 text-left">
                    <textarea
                      className={cn(
                        'w-full font-normal bg-stone-100 p-2',
                        'rounded-sm h-9 focus:h-19 transition-[height]',
                        'duration-200 resize-none outline-none',
                      )}
                      onChange={(e) => {
                        updatePersonData({ note: e.target.value })
                      }}
                      value={personData.note || 'test'}
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
    </>
  )
}

export default App
