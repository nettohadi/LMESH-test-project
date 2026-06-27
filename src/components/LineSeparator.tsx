const LineSeparator = ({ colSpan }: { colSpan?: number }) => (
  <tr>
    <th colSpan={colSpan ?? 13} className="border-b border-stone-300 h-5 "></th>
  </tr>
)

export default LineSeparator
