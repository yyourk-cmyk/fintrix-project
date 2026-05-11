'use client'

import { useEffect, useState } from 'react'

export default function OlymptradeFintrixLanding() {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('fintrixLeaderboard')

    if (saved) {
      setLeaderboard(JSON.parse(saved))
    } else {
      setLeaderboard([
        { rank: 1, name: 'Trader Alpha', profit: '+482%' },
        { rank: 2, name: 'Neo Scalper', profit: '+391%' },
        { rank: 3, name: 'FX Hunter', profit: '+355%' },
      ])
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">
      <div className="max-w-5xl text-center">
        <h1 className="text-6xl font-black mb-6">
          OLYMPTRADE X FINTRIX
        </h1>

        <p className="text-xl text-gray-300 mb-10">
          미래형 모의투자 트레이딩 대회
        </p>

        <div className="grid gap-4">
          {leaderboard.map((item) => (
            <div
              key={item.rank}
              className="border border-white/10 rounded-2xl p-6 bg-white/5 flex justify-between"
            >
              <div>#{item.rank}</div>
              <div>{item.name}</div>
              <div className="text-green-400">{item.profit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
