import { Farmer } from "./Farmer"
import { Location } from "./Location"

export type CheckListTypes = 'Antibiotico' | 'BPA' | 'BPF'

export type CheckList = {
  type: CheckListTypes
  amount_of_milk_produced: number
  number_of_cows_head: number
  farmer: Farmer
  from: { name: string }
  to: { name: string }
  had_supervision: boolean
  location: Location
  created_at: string
  updated_at: string
  formatedDate?: string
}