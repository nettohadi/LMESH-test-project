import {
  Select as ShadCnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  value: string | undefined
  onValueChange: (value: string) => void
}

const SelectActingAs = ({ value, onValueChange }: Props) => {
  return (
    <ShadCnSelect
      value={value}
      onValueChange={(value) => {
        onValueChange(value)
      }}
    >
      <SelectTrigger className="w-full max-w-48 bg-stone-100 rounded-sm border-0 h-12.5">
        <SelectValue placeholder="Acting as" className="font-normal" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="tester">Tester</SelectItem>
        </SelectGroup>
      </SelectContent>
    </ShadCnSelect>
  )
}

export default SelectActingAs
