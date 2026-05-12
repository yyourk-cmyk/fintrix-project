'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function OlymptradeFintrixLanding() {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('fintrixLeaderboard')

    if (saved) {
      setLeaderboard(JSON.parse(saved))
    } else {
      setLeaderboard([
        { rank: 1, name: 'Trader Alpha', profit: '+482%', prize: '$13,000' },
        { rank: 2, name: 'Neo Scalper', profit: '+391%', prize: '$5,000' },
        { rank: 3, name: 'FX Hunter', profit: '+355%', prize: '$2,000' },
        { rank: 4, name: 'BTC Vision', profit: '+298%', prize: '-' },
        { rank: 5, name: 'Shadow Trader', profit: '+251%', prize: '-' },
      ])
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-6">
          OLYMPTRADE X FINTRIX
        </h1>

        <p className="text-xl text-gray-300 mb-10">
          미래형 모의투자 트레이딩 대회
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">LIVE LEADERBOARD</h2>
          <p className="text-gray-400 text-sm mb-6">실시간 순위</p>
        </div>

        <div className="grid gap-4">
          {leaderboard.map((item) => (
            <div
              key={item.rank}
              className={`border rounded-2xl p-6 flex justify-between items-center ${
                item.rank <= 3 
                  ? 'border-cyan-500/30 bg-cyan-500/5' 
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className={`font-bold text-lg ${
                item.rank === 1 ? 'text-yellow-400' :
                item.rank === 2 ? 'text-gray-300' :
                item.rank === 3 ? 'text-amber-600' : 'text-white'
              }`}>
                #{item.rank}
              </div>
              <div className="font-medium">{item.name}</div>
              <div className="text-green-400 font-bold">{item.profit}</div>
              <div className={`text-sm ${item.prize !== '-' ? 'text-cyan-400' : 'text-gray-500'}`}>
                {item.prize}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          관리자 페이지
        </Link>
      </div>
    </div>
  )
}
