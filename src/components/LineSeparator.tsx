const LineSeparator = ({ colSpan }: { colSpan?: number }) => (
  <tr>
    <th colSpan={colSpan ?? 13} className="border-b border-stone-400 h-5 "></th>
  </tr>
)

export default LineSeparator
