import type { PersonData, Workload } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getDefaultWorkLoads = (): Workload[] => {
  return [
    { month: 'Jan', value: '1', isFictive: false },
    { month: 'Feb', value: '1', isFictive: false },
    { month: 'Mar', value: '1', isFictive: false },
    { month: 'Apr', value: '1', isFictive: false },
    { month: 'May', value: '1', isFictive: false },
    { month: 'Jun', value: '1', isFictive: false },
    { month: 'Jul', value: '1', isFictive: false },
    { month: 'Aug', value: '1', isFictive: false },
    { month: 'Sep', value: '1', isFictive: false },
    { month: 'Oct', value: '1', isFictive: false },
    { month: 'Nov', value: '1', isFictive: false },
    { month: 'Dec', value: '1', isFictive: false },
  ]
}

export const getDefaultData = (): PersonData => {
  return {
    name: 'BIANCHINI Thierry',
    actingAs: 'admin',
    note: 'none',
    workloads: [
      { month: 'Jan', value: '1', isFictive: false },
      { month: 'Feb', value: '1', isFictive: false },
      { month: 'Mar', value: '1', isFictive: false },
      { month: 'Apr', value: '1', isFictive: false },
      { month: 'May', value: '1', isFictive: false },
      { month: 'Jun', value: '1', isFictive: false },
      { month: 'Jul', value: '1', isFictive: false },
      { month: 'Aug', value: '1', isFictive: false },
      { month: 'Sep', value: '1', isFictive: false },
      { month: 'Oct', value: '1', isFictive: false },
      { month: 'Nov', value: '1', isFictive: false },
      { month: 'Dec', value: '1', isFictive: false },
    ],
  }
}
