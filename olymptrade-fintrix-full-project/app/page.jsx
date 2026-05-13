'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client' // 이 줄이 추가되어야 DB와 연결됩니다.

export default function OlymptradeFintrixLanding() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // DB에서 데이터를 가져오는 함수
    const fetchLeaderboard = async () => {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('rank', { ascending: true })

      if (error) {
        console.error('데이터 로딩 실패:', error)
      } else {
        // 성공하면 DB 데이터를 리더보드 상태에 저장
        setLeaderboard(data || [])
      }
      setLoading(false)
    }

    fetchLeaderboard()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">데이터를 불러오는 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-6xl font-black mb-6">
          OLYMPTRADE X FINTRIX
        </h1>

        <p className="text-xl text-gray-300 mb-10">
          미래형 모의투자 트레이딩 대회 - 리더보드
        </p>

        <div className="grid gap-4 w-full">
          {leaderboard.map((item) => (
            <div
              key={item.id} // DB의 고유 ID를 키값으로 사용
              className="border border-white/10 rounded-2xl p-6 bg-white/5 flex justify-between items-center"
            >
              <div className="text-2xl font-bold text-gray-500">#{item.rank}</div>
              <div className="text-xl font-medium">{item.name}</div>
              <div className="text-2xl font-black text-green-400">{item.profit}</div>
            </div>
          ))}
        </div>
        
        {leaderboard.length === 0 && (
          <div className="text-gray-500 mt-10">현재 등록된 데이터가 없습니다.</div>
        )}
      </div>
    </div>
  )
}
//daekyu
