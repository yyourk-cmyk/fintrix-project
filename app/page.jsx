'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function AdminPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. DB에서 현재 데이터 가져오기
  useEffect(() => {
    const fetchDB = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('leaderboard').select('*').order('rank', { ascending: true })
      if (data) setRows(data)
      setLoading(false)
    }
    fetchDB()
  }, [])

  // 2. 값 수정 함수
  const handleChange = (index, field, value) => {
    const newRows = [...rows]
    newRows[index][field] = value
    setRows(newRows)
  }

  // 3. [저장하기] 버튼: Supabase DB로 업데이트
  const handleSave = async () => {
    const supabase = createClient()
    const { error } = await supabase.from('leaderboard').upsert(rows)
    
    if (error) alert("저장 실패: " + error.message)
    else alert("실시간 DB에 반영되었습니다!")
  }

  if (loading) return <div className="p-10 text-white">로딩 중...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-cyan-400">LEADERBOARD ADMIN</h1>
          <div className="flex gap-4">
            <Link href="/" className="px-4 py-2 bg-gray-800 rounded-lg">메인으로</Link>
            <button onClick={handleSave} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-bold">
              DB에 저장하기
            </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-white/10 text-gray-400">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Name</th>
                <th className="p-4">Profit</th>
                <th className="p-4">Prize</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-t border-white/5">
                  <td className="p-4 w-20">
                    <input type="number" value={row.rank} onChange={(e) => handleChange(index, 'rank', parseInt(e.target.value))} className="bg-transparent border border-white/20 w-full p-1 rounded" />
                  </td>
                  <td className="p-4">
                    <input type="text" value={row.name} onChange={(e) => handleChange(index, 'name', e.target.value)} className="bg-transparent border border-white/20 w-full p-1 rounded" />
                  </td>
                  <td className="p-4">
                    <input type="text" value={row.profit} onChange={(e) => handleChange(index, 'profit', e.target.value)} className="bg-transparent border border-white/20 w-full p-1 rounded text-green-400" />
                  </td>
                  <td className="p-4">
                    <input type="text" value={row.prize} onChange={(e) => handleChange(index, 'prize', e.target.value)} className="bg-transparent border border-white/20 w-full p-1 rounded text-cyan-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
