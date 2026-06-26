import './App.css'

function App() {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return (
    <>
      <main className="bg-stone-200 w-full h-full flex justify-center pt-24 p-20">
        <div className="bg-white rounded-lg w-full h-full shadow-md p-5">
          <h1 className="text-2xl font-bold">BIANCHINI Thierry</h1>
          <h3 className="text-stone-600">Workload</h3>
          <div>
            <table className="border-separate border-spacing-x-2 border-spacing-y-2">
              <tr className="h-[50px]">
                <th className="w-[200px] h-3"></th>
                {months.map((month) => (
                  <th className="w-[100px]">{month}</th>
                ))}
              </tr>
              <tr>
                <th className="w-[200px] h-3"></th>
                {months.map((month) => (
                  <th className="w-[100px] p-2 rounded-md bg-teal-200 text-teal-800">1</th>
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
                {months.map((month) => (
                  <th className="w-[100px] p-2">1</th>
                ))}
              </tr>
              <tr>
                <th rowSpan={2} className="w-[200px] h-3">
                  test
                </th>
                {months.map((month) => (
                  <th className="w-[100px] p-2 rounded-md bg-stone-200 text-stone-700 font-normal">
                    <span className="flex gap-3 justify-center">
                      <span>1</span>
                      <input type="checkbox" />
                    </span>
                  </th>
                ))}
              </tr>
              <tr>
                <th colSpan={2} className="rounded-md bg-stone-200 p-2">
                  Acting as
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
