'use client'

import { useState } from "react"
import Spinner from "./Spinner"
import { useAutosave } from 'react-autosave'
import { updateEntry } from "@/utils/api"
import { set } from "zod"


const Editor = ({entry}) => {
    const [value, setValue] = useState(entry.content)
  const [currentEntry, setEntry] = useState(entry)
  const [isloading,  setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry?.analysis)

  const {mood, summary,subject,color, negative} = analysis;

  const analysisData = [
    {
      name: 'Summary',
      value: summary
    },
    {
      name: 'Subject',
      value: subject
    },
    {
      name: 'Mood',
      value: mood
    },
    {
      name: 'Negative',
      value: negative?'true':'false'
    }
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value === entry.content) return
      setIsLoading(true)

      const updated = await updateEntry(entry.id,  _value )
      setAnalysis(updated.analysis)

      setEntry(updated.analysis)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full relative grid grid-cols-3 ">
    <div className="absolute left-0 top-0 p-2">
      {isloading ? (
        <Spinner />
      ) : (
        <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
      )}
    </div>
    <div className="w-full h-full col-span-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-full text-xl p-8 outline-none"
      />
    </div>
    <div className="border-l border-black/5">
        <div className="px-6 py-10 "  style={{backgroundColor: color}}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
            <ul>
                {analysisData.map((data)=>(
                    <li key={data.name} className="flex justify-between border-b border-t px-2 py-4 border-black/10">
                        <span className='text-lg font-semibold'>{data.name}</span>
                        <span>{data.value}</span>
                    </li>
                ))}
            </ul>
        </div>
      </div>
  </div>
)
}

export default Editor