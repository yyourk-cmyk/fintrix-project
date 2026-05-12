'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [rows, setRows] = useState([])
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('fintrixLeaderboard')

    if (saved) {
      setRows(JSON.parse(saved))
    } else {
      setRows([
        { rank: 1, name: 'Trader Alpha', profit: '+482%', prize: '$13,000' },
        { rank: 2, name: 'Neo Scalper', profit: '+391%', prize: '$5,000' },
        { rank: 3, name: 'FX Hunter', profit: '+355%', prize: '$2,000' },
        { rank: 4, name: 'BTC Vision', profit: '+298%', prize: '-' },
        { rank: 5, name: 'Shadow Trader', profit: '+251%', prize: '-' },
      ])
    }
  }, [])

  const updateRow = (index, key, value) => {
    const updated = [...rows]
    updated[index][key] = value
    setRows(updated)
    setIsSaved(false)
  }

  const saveLeaderboard = () => {
    // 순위 자동 재정렬
    const sortedRows = rows.map((row, index) => ({
      ...row,
      rank: index + 1
    }))
    setRows(sortedRows)
    localStorage.setItem('fintrixLeaderboard', JSON.stringify(sortedRows))
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const addRow = () => {
    setRows([
      ...rows,
      {
        rank: rows.length + 1,
        name: 'NEW TRADER',
        profit: '+0%',
        prize: '-'
      }
    ])
    setIsSaved(false)
  }

  const deleteRow = (index) => {
    const updated = rows.filter((_, i) => i !== index)
    // 순위 재정렬
    const reranked = updated.map((row, i) => ({
      ...row,
      rank: i + 1
    }))
    setRows(reranked)
    setIsSaved(false)
  }

  const moveRow = (index, direction) => {
    if (
      (direction === -1 && index === 0) || 
      (direction === 1 && index === rows.length - 1)
    ) {
      return
    }
    
    const updated = [...rows]
    const temp = updated[index]
    updated[index] = updated[index + direction]
    updated[index + direction] = temp
    
    // 순위 재정렬
    const reranked = updated.map((row, i) => ({
      ...row,
      rank: i + 1
    }))
    setRows(reranked)
    setIsSaved(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">
              FINTRIX ADMIN PANEL
            </h1>
            <p className="text-gray-400">리더보드 관리</p>
          </div>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium w-fit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            메인으로 돌아가기
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-cyan-400">{rows.length}</div>
            <div className="text-sm text-gray-400">총 참가자</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-400">
              {rows[0]?.profit || '-'}
            </div>
            <div className="text-sm text-gray-400">최고 수익률</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-yellow-400">$20,000</div>
            <div className="text-sm text-gray-400">총 상금</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-400">
              {rows.filter(r => r.prize !== '-').length}
            </div>
            <div className="text-sm text-gray-400">수상자</div>
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 text-sm text-gray-400 font-medium">
          <div className="col-span-1">순위</div>
          <div className="col-span-3">트레이더</div>
          <div className="col-span-2">수익률</div>
          <div className="col-span-2">예상 상금</div>
          <div className="col-span-4 text-right">액션</div>
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {rows.map((row, index) => (
            <div
              key={index}
              className={`border rounded-2xl p-4 md:p-5 ${
                row.rank <= 3 
                  ? 'border-cyan-500/30 bg-cyan-500/5' 
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-12 gap-4 items-center">
                {/* Rank */}
                <div className="col-span-1">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                    row.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                    row.rank === 2 ? 'bg-gray-500/20 text-gray-300' :
                    row.rank === 3 ? 'bg-amber-600/20 text-amber-500' : 
                    'bg-white/10 text-white'
                  }`}>
                    {row.rank}
                  </span>
                </div>

                {/* Name */}
                <div className="col-span-1 md:col-span-3">
                  <label className="text-xs text-gray-500 md:hidden mb-1 block">트레이더</label>
                  <input
                    value={row.name}
                    onChange={(e) => updateRow(index, 'name', e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="트레이더 이름"
                  />
                </div>

                {/* Profit */}
                <div className="col-span-1 md:col-span-2">
                  <label className="text-xs text-gray-500 md:hidden mb-1 block">수익률</label>
                  <input
                    value={row.profit}
                    onChange={(e) => updateRow(index, 'profit', e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-green-400 focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="+0%"
                  />
                </div>

                {/* Prize */}
                <div className="col-span-1 md:col-span-2">
                  <label className="text-xs text-gray-500 md:hidden mb-1 block">예상 상금</label>
                  <input
                    value={row.prize}
                    onChange={(e) => updateRow(index, 'prize', e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-cyan-400 focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="$0"
                  />
                </div>

                {/* Actions */}
                <div className="col-span-2 md:col-span-4 flex items-center justify-end gap-2">
                  <button
                    onClick={() => moveRow(index, -1)}
                    disabled={index === 0}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="위로 이동"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m18 15-6-6-6 6"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => moveRow(index, 1)}
                    disabled={index === rows.length - 1}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="아래로 이동"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteRow(index)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    title="삭제"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      <line x1="10" x2="10" y1="11" y2="17"/>
                      <line x1="14" x2="14" y1="11" y2="17"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={addRow}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 font-bold transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 12h8"/>
              <path d="M12 8v8"/>
            </svg>
            참가자 추가
          </button>

          <button
            onClick={saveLeaderboard}
            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all ${
              isSaved 
                ? 'bg-green-500 text-white' 
                : 'bg-cyan-500 hover:bg-cyan-400 text-black'
            }`}
          >
            {isSaved ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                저장 완료!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                저장하기
              </>
            )}
          </button>
        </div>

        {/* Help Text */}
        <p className="text-gray-500 text-sm mt-6">
          변경 사항은 저장 버튼을 클릭해야 메인 페이지에 반영됩니다.
        </p>
      </div>
    </div>
  )
}
