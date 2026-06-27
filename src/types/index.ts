export interface Workload {
  month: string
  isFictive: boolean
  value: string
}

export interface PersonData {
  name: string
  actingAs: string
  note: string
  workloads: Workload[]
}

export interface AdditionalData {
  actingAs: string
  note: string
}
