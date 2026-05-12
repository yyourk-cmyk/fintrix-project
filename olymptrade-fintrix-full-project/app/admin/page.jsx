'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [rows, setRows] = useState([])
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('fintrixLeaderboard')

    if (saved) {
      setRows(JSON.parse(saved))
    } else {
      setRows([
        { rank: 1, name: 'Trader Alpha', profit: '+482%' },
        { rank: 2, name: 'Neo Scalper', profit: '+391%' },
        { rank: 3, name: 'FX Hunter', profit: '+355%' },
      ])
    }
  }, [])

  const updateRow = (index, key, value) => {
    const updated = [...rows]
    updated[index][key] = value
    setRows(updated)
  }

  const saveLeaderboard = () => {
    // 순위 기준 정렬 후 저장
    const sorted = [...rows].sort((a, b) => Number(a.rank) - Number(b.rank))
    localStorage.setItem('fintrixLeaderboard', JSON.stringify(sorted))
    setRows(sorted)
    setSaveMessage('저장 완료!')
    setTimeout(() => setSaveMessage(''), 2000)
  }

  const addRow = () => {
    setRows([
      ...rows,
      {
        rank: rows.length + 1,
        name: '',
        profit: '+0%'
      }
    ])
  }

  const deleteRow = (index) => {
    const updated = rows.filter((_, i) => i !== index)
    // 순위 재정렬
    const reranked = updated.map((row, i) => ({
      ...row,
      rank: i + 1
    }))
    setRows(reranked)
  }

  const moveUp = (index) => {
    if (index === 0) return
    const updated = [...rows]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    // 순위 재정렬
    const reranked = updated.map((row, i) => ({
      ...row,
      rank: i + 1
    }))
    setRows(reranked)
  }

  const moveDown = (index) => {
    if (index === rows.length - 1) return
    const updated = [...rows]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    // 순위 재정렬
    const reranked = updated.map((row, i) => ({
      ...row,
      rank: i + 1
    }))
    setRows(reranked)
  }

  return (
    <div className='min-h-screen bg-black text-white p-6 md:p-10'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4'>
          <div>
            <h1 className='text-4xl md:text-5xl font-black tracking-tight'>
              ADMIN PANEL
            </h1>
            <p className='text-gray-400 mt-2'>리더보드 관리</p>
          </div>
          <Link
            href='/'
            className='inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium'
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            메인으로 돌아가기
          </Link>
        </div>

        {/* Table Header */}
        <div className='grid grid-cols-[60px_1fr_1fr_1fr_100px] gap-3 px-5 py-3 text-sm text-gray-400 font-medium border-b border-white/10'>
          <div>순위</div>
          <div>이름</div>
          <div>수익률</div>
          <div>순서 변경</div>
          <div>삭제</div>
        </div>

        {/* Rows */}
        <div className='space-y-3 mt-4'>
          {rows.map((row, index) => (
            <div
              key={index}
              className='grid grid-cols-[60px_1fr_1fr_1fr_100px] gap-3 items-center border border-white/10 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors'
            >
              {/* Rank Display */}
              <div className='text-2xl font-black text-cyan-400'>
                #{row.rank}
              </div>

              {/* Name Input */}
              <input
                value={row.name}
                onChange={(e) => updateRow(index, 'name', e.target.value)}
                placeholder='트레이더 이름'
                className='bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:outline-none transition-colors'
              />

              {/* Profit Input */}
              <input
                value={row.profit}
                onChange={(e) => updateRow(index, 'profit', e.target.value)}
                placeholder='+0%'
                className='bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 focus:border-green-500 focus:outline-none transition-colors text-green-400'
              />

              {/* Move Buttons */}
              <div className='flex gap-2'>
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className='p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
                  aria-label='위로 이동'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === rows.length - 1}
                  className='p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
                  aria-label='아래로 이동'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteRow(index)}
                className='p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors'
                aria-label='삭제'
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

        {/* Empty State */}
        {rows.length === 0 && (
          <div className='text-center py-16 text-gray-500'>
            <p className='text-lg'>리더보드가 비어있습니다</p>
            <p className='text-sm mt-1'>참가자를 추가해주세요</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 mt-8'>
          <button
            onClick={addRow}
            className='flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition-colors'
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
            className='flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 font-bold transition-colors'
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            저장하기
          </button>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className='fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg animate-pulse'>
            {saveMessage}
          </div>
        )}

        {/* Stats */}
        <div className='mt-12 pt-8 border-t border-white/10'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            <div className='bg-white/5 rounded-xl p-5'>
              <p className='text-gray-400 text-sm'>총 참가자</p>
              <p className='text-3xl font-black mt-1'>{rows.length}</p>
            </div>
            <div className='bg-white/5 rounded-xl p-5'>
              <p className='text-gray-400 text-sm'>최고 수익률</p>
              <p className='text-3xl font-black text-green-400 mt-1'>
                {rows.length > 0 ? rows.sort((a, b) => {
                  const aNum = parseFloat(a.profit.replace(/[^0-9.-]/g, ''))
                  const bNum = parseFloat(b.profit.replace(/[^0-9.-]/g, ''))
                  return bNum - aNum
                })[0]?.profit : '-'}
              </p>
            </div>
            <div className='bg-white/5 rounded-xl p-5'>
              <p className='text-gray-400 text-sm'>상태</p>
              <p className='text-xl font-bold text-cyan-400 mt-1'>활성화</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
