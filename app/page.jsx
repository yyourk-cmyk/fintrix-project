'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client' // DB 연결 도구 불러오기

export default function OlymptradeFintrixLanding() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const supabase = createClient()
        
        // localStorage 대신 Supabase DB에서 데이터를 가져옵니다.
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .order('rank', { ascending: true })

        if (error) throw error
        
        if (data) {
          setLeaderboard(data)
        }
      } catch (err) {
        console.error('데이터 로딩 실패:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">DB에서 데이터를 불러오는 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-6 italic">
          OLYMPTRADE X FINTRIX
        </h1>

        <p className="text-xl text-gray-300 mb-10">
          미래형 모의투자 트레이딩 대회 - 리더보드
        </p>

        <div className="grid gap-4 w-full mb-10">
          {leaderboard.map((item) => (
            <div
              key={item.id || item.rank}
              className={`border rounded-2xl p-6 flex justify-between items-center ${
                item.rank <= 3 
                  ? 'border-cyan-500/30 bg-cyan-500/5' 
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="flex items-center gap-6">
                <div className={`font-bold text-2xl ${
                  item.rank === 1 ? 'text-yellow-400' :
                  item.rank === 2 ? 'text-gray-300' :
                  item.rank === 3 ? 'text-amber-600' : 'text-white'
                }`}>
                  #{item.rank}
                </div>
                <div className="text-xl font-medium">{item.name}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-green-400">{item.profit}</div>
                {item.prize && <div className="text-sm text-cyan-400">{item.prize}</div>}
              </div>
            </div>
          ))}
        </div>

        {leaderboard.length === 0 && (
          <div className="text-gray-500 mb-10">현재 등록된 순위 데이터가 없습니다.</div>
        )}

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
        >
          관리자 페이지로 이동
        </Link>
      </div>
    </div>
  )
}
