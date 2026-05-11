'use client'

import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [rows, setRows] = useState([])

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
    localStorage.setItem('fintrixLeaderboard', JSON.stringify(rows))
    alert('리더보드 저장 완료 🚀')
  }

  const addRow = () => {
    setRows([
      ...rows,
      {
        rank: rows.length + 1,
        name: 'NEW TRADER',
        profit: '+0%'
      }
    ])
  }

  return (
    <div className='min-h-screen bg-black text-white p-8'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-5xl font-black mb-10'>
          FINTRIX ADMIN PANEL
        </h1>

        <div className='space-y-4'>
          {rows.map((row, index) => (
            <div
              key={index}
              className='grid grid-cols-3 gap-4 border border-white/10 bg-white/5 rounded-2xl p-5'
            >
              <input
                value={row.rank}
                onChange={(e) => updateRow(index, 'rank', e.target.value)}
                className='bg-black border border-white/10 rounded-xl px-4 py-3'
              />

              <input
                value={row.name}
                onChange={(e) => updateRow(index, 'name', e.target.value)}
                className='bg-black border border-white/10 rounded-xl px-4 py-3'
              />

              <input
                value={row.profit}
                onChange={(e) => updateRow(index, 'profit', e.target.value)}
                className='bg-black border border-white/10 rounded-xl px-4 py-3'
              />
            </div>
          ))}
        </div>

        <div className='flex gap-4 mt-8'>
          <button
            onClick={addRow}
            className='px-8 py-4 rounded-2xl bg-green-500 font-bold'
          >
            참가자 추가
          </button>

          <button
            onClick={saveLeaderboard}
            className='px-8 py-4 rounded-2xl bg-cyan-500 font-bold'
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}
