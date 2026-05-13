'use client'

import { useEffect, useState } from 'react'
 leaderboard-admin-page
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

import { createClient } from '@/lib/supabase/client' // 이 줄이 추가되어야 DB와 연결됩니다.
 main

export default function OlymptradeFintrixLanding() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
 leaderboard-admin-page
    const fetchLeaderboard = async () => {
      const supabase = createClient()

    // DB에서 데이터를 가져오는 함수
    const fetchLeaderboard = async () => {
      const supabase = createClient()
      
 main
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('rank', { ascending: true })

      if (error) {
 leaderboard-admin-page
        console.error('Error fetching leaderboard:', error)
      } else {

        console.error('데이터 로딩 실패:', error)
      } else {
        // 성공하면 DB 데이터를 리더보드 상태에 저장
 main
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

 leaderboard-admin-page
        {loading ? (
          <div className="text-gray-400">리더보드 로딩 중...</div>
        ) : (
          <div className="grid gap-4">
            {leaderboard.map((item) => (
              <div
                key={item.id}
                className="border border-white/10 rounded-2xl p-6 bg-white/5 flex justify-between"
              >
                <div>#{item.rank}</div>
                <div>{item.name}</div>
                <div className="text-green-400">{item.profit}</div>
              </div>
            ))}
          </div>
        )}

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
 main
      </div>
    </div>
  )
}
