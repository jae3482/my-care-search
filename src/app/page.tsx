'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const router = useRouter()

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('facilities')
      .select('장기요양기관코드, 장기요양기관이름, 기관유형코드, 기관별상세주소')
      .ilike('장기요양기관이름', `%${query}%`)

    if (!error && data) setResults(data)
  }

  const handleSelect = (code: string) => {
    router.push(`/facility/${code}`)
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">요양기관 검색</h1>
      <input
        type="text"
        className="w-full border p-2 mb-4"
        placeholder="기관명을 입력하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        검색
      </button>

      {results.length > 0 && (
        <ul className="mt-6 space-y-2">
          {results.map((facility) => (
            <li
              key={facility.장기요양기관코드}
              className="border p-3 cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => handleSelect(facility.장기요양기관코드)}
            >
              <p className="font-semibold">{facility.장기요양기관이름}</p>
              <p className="text-sm text-gray-600">{facility.기관별상세주소}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
