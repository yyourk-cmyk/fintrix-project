'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function AdminPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('rank', { ascending: true })

    if (error) {
      console.error('Error fetching leaderboard:', error)
    } else {
      setRows(data || [])
    }
    setLoading(false)
  }

  const updateRow = (index, key, value) => {
    const updated = [...rows]
    updated[index][key] = key === 'rank' ? parseInt(value) || 0 : value
    setRows(updated)
  }

  const saveLeaderboard = async () => {
    setSaving(true)
    const supabase = createClient()

    try {
      // Update each row
      for (const row of rows) {
        const { error } = await supabase
          .from('leaderboard')
          .update({ rank: row.rank, name: row.name, profit: row.profit, updated_at: new Date().toISOString() })
          .eq('id', row.id)

        if (error) throw error
      }

      alert('리더보드가 저장되었습니다!')
    } catch (error) {
      console.error('Error saving leaderboard:', error)
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const addRow = async () => {
    const supabase = createClient()
    const newRank = rows.length + 1

    const { data, error } = await supabase
      .from('leaderboard')
      .insert([{ rank: newRank, name: 'NEW TRADER', profit: '+0%' }])
      .select()
      .single()

    if (error) {
      console.error('Error adding row:', error)
      alert('추가 중 오류가 발생했습니다.')
    } else {
      setRows([...rows, data])
    }
  }

  const deleteRow = async (id, index) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    const supabase = createClient()
    const { error } = await supabase
      .from('leaderboard')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting row:', error)
      alert('삭제 중 오류가 발생했습니다.')
    } else {
      const updated = rows.filter((_, i) => i !== index)
      // Re-rank remaining rows
      const reRanked = updated.map((row, i) => ({ ...row, rank: i + 1 }))
      setRows(reRanked)
    }
  }

  const moveRow = (index, direction) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= rows.length) return

    const updated = [...rows]
    const temp = updated[index]
    updated[index] = updated[newIndex]
    updated[newIndex] = temp

    // Update ranks
    const reRanked = updated.map((row, i) => ({ ...row, rank: i + 1 }))
    setRows(reRanked)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-5xl font-black">
            FINTRIX ADMIN PANEL
          </h1>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm"
          >
            메인으로 돌아가기
          </Link>
        </div>

        <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="grid grid-cols-[60px_1fr_1fr_1fr_100px] gap-4 text-sm text-gray-400 font-medium">
            <div>순서</div>
            <div>순위</div>
            <div>이름</div>
            <div>수익률</div>
            <div>관리</div>
          </div>
        </div>

        <div className="space-y-4">
          {rows.map((row, index) => (
            <div
              key={row.id}
              className="grid grid-cols-[60px_1fr_1fr_1fr_100px] gap-4 border border-white/10 bg-white/5 rounded-2xl p-5 items-center"
            >
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveRow(index, -1)}
                  disabled={index === 0}
                  className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                </button>
                <button
                  onClick={() => moveRow(index, 1)}
                  disabled={index === rows.length - 1}
                  className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
              </div>

              <input
                value={row.rank}
                onChange={(e) => updateRow(index, 'rank', e.target.value)}
                className="bg-black border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                value={row.name}
                onChange={(e) => updateRow(index, 'name', e.target.value)}
                className="bg-black border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                value={row.profit}
                onChange={(e) => updateRow(index, 'profit', e.target.value)}
                className="bg-black border border-white/10 rounded-xl px-4 py-3"
              />

              <button
                onClick={() => deleteRow(row.id, index)}
                className="p-3 hover:bg-red-500/20 rounded-xl text-red-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"/>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  <line x1="10" x2="10" y1="11" y2="17"/>
                  <line x1="14" x2="14" y1="11" y2="17"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={addRow}
            className="px-8 py-4 rounded-2xl bg-green-500 hover:bg-green-600 font-bold transition-colors"
          >
            참가자 추가
          </button>

          <button
            onClick={saveLeaderboard}
            disabled={saving}
            className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-600 font-bold transition-colors disabled:opacity-50"
          >
            {saving ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </div>
    </div>
  )
}
