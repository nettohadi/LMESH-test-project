import { cn } from '@/lib/utils'
import type { Workload } from '@/types'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Checkbox } from '../ui/checkbox'

interface Props {
  workload: Workload
  onChange: (value: string) => void
  onBlur: (value: string) => void
  onToggleFictive: (isChecked: boolean) => void
}

const WorkloadCell = ({ workload, onChange, onBlur, onToggleFictive }: Props) => {
  return (
    <td
      className={cn(
        'w-25 px-2 py-[1px] rounded-md bg-stone-100 text-stone-700 font-normal',
        workload.isFictive && 'bg-orange-100 text-orange-400',
      )}
    >
      <span className="flex gap-1 justify-center items-center">
        <input
          type="text"
          inputMode="decimal"
          value={workload.value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur(e.target.value)}
          className="w-8 text-center rounded-sm border-2 border-transparent focus:border-blue-500 outline-none"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex">
              <Checkbox
                checked={workload.isFictive}
                onCheckedChange={(checked) => onToggleFictive(Boolean(checked))}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent className="rounded-md">
            <p>Mark as fictive</p>
          </TooltipContent>
        </Tooltip>
      </span>
    </td>
  )
}

export default WorkloadCell
