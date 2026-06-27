import './App.css'
import { type PersonData, type Workload } from './types'
import { useState } from 'react'
import { cn, getDefaultData } from './lib/utils'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'
import SelectActingAs from './components/SelectActingAs'
import WorkloadCell from './components/workLoad/WorkloadCell'
import LineSeparator from './components/LineSeparator'

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
    const numberValue = Number(value)

    if (isNaN(numberValue)) {
      toast.error('Please enter a valid number.')
      return updateWorkLoadByMonth(month, { value: '1' })
    }

    if (numberValue < 0 || numberValue > 5) {
      toast.error('Staffing must be between 0 and 5.')
      return updateWorkLoadByMonth(month, { value: '1' })
    }
  }, 500)

  const normalize = (month: string, value: string) => {
    const numberValue = Number(value)

    if (value.trim() === '') {
      return updateWorkLoadByMonth(month, { value: '0' })
    }

    if (numberValue.toString() !== value) {
      return updateWorkLoadByMonth(month, { value: numberValue.toString() })
    }
  }

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
      <main className="bg-stone-200 w-full h-full flex flex-col justify-start">
        <div className="bg-white w-full min-h-25 shadow-sm"></div>
        <div className="pt-14 py-0 px-8">
          <div className="bg-white rounded-2xl w-full h-full min-h-175 shadow-md p-10 scroll-auto">
            <h1 className="text-2xl font-bold">{personData.name}</h1>
            <h3 className="text-stone-600">Workload</h3>
            <div className="overflow-auto">
              <table className="border-separate border-spacing-x-2 border-spacing-y-1">
                <thead>
                  <tr className="h-8">
                    <th className="w-27.5 "></th>
                    {personData.workloads.map((workload) => (
                      <th key={workload.month} className="w-25 text-neutral-500/80 font-normal">
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
                          'w-25 p-2 rounded-md bg-teal-200 text-teal-800 font-normal',
                          getMonthColor(workload.value, workload.isFictive),
                        )}
                      >
                        {workload.isFictive ? 0 : workload.value}
                      </th>
                    ))}
                  </tr>
                  <LineSeparator />
                </thead>
                <tbody>
                  <tr className="">
                    <td colSpan={13} className="h-12 text-left text-xl">
                      <span className="text-black font-bold">Serial Life PSA</span>
                      <span className="text-stone-500 font-normal">
                        {' '}
                        | Europe | STELLANTIS | PSA
                      </span>
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
                      <WorkloadCell
                        workload={workload}
                        onChange={(value) => changeValue(workload.month, value)}
                        onBlur={(value) => normalize(workload.month, value)}
                        onToggleFictive={(checked) => toggleCheckbox(workload.month, checked)}
                      />
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
                        value={personData.note}
                        placeholder="Comment"
                      ></textarea>
                    </td>
                  </tr>
                  <LineSeparator />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
