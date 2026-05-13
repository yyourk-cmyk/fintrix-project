'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client' // 1. DB 연결 도구 추가

export default function AdminPage() {
  const [rows, setRows] = useState([])
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  // 2. DB에서 데이터 불러오기 (localStorage 대신)
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('leaderboard')
        .select('*')
        .order('rank', { ascending: true })

      if (data && data.length > 0) {
        setRows(data)
      } else {
        // 데이터가 없으면 초기값 설정
        setRows([
          { rank: 1, name: 'Trader Alpha', profit: '+482%', prize: '$13,000' },
          { rank: 2, name: 'Neo Scalper', profit: '+391%', prize: '$5,000' },
          { rank: 3, name: 'FX Hunter', profit: '+355%', prize: '$2,000' },
        ])
      }
      setLoading(false)
    }
    fetchLeaderboard()
  }, [])

  const updateRow = (index, key, value) => {
    const updated = [...rows]
    updated[index][key] = value
    setRows(updated)
    setIsSaved(false)
  }

  // 3. 저장하기 함수 수정 (Supabase로 전송)
  const saveLeaderboard = async () => {
    const supabase = createClient()
    
    // 순위 자동 재정렬
    const sortedRows = rows.map((row, index) => ({
      ...row,
      rank: index + 1
    }))
    
    setRows(sortedRows)

    // 핵심: DB에 저장
    const { error } = await supabase
      .from('leaderboard')
      .upsert(sortedRows)

    if (error) {
      alert("DB 저장 실패: " + error.message)
    } else {
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  // ... (나머지 addRow, deleteRow, moveRow 함수는 동일하게 유지) ...
  
  const addRow = () => {
    setRows([...rows, { rank: rows.length + 1, name: 'NEW TRADER', profit: '+0%', prize: '-' }])
    setIsSaved(false)
  }

  const deleteRow = (index) => {
    const updated = rows.filter((_, i) => i !== index)
    const reranked = updated.map((row, i) => ({ ...row, rank: i + 1 }))
    setRows(reranked)
    setIsSaved(false)
  }

  const moveRow = (index, direction) => {
    if ((direction === -1 && index === 0) || (direction === 1 && index === rows.length - 1)) return
    const updated = [...rows]
    const temp = updated[index]
    updated[index] = updated[index + direction]
    updated[index + direction] = temp
    const reranked = updated.map((row, i) => ({ ...row, rank: i + 1 }))
    setRows(reranked)
    setIsSaved(false)
  }

  if (loading) return <div className="min-h-screen bg-black text-white p-10">데이터 로딩 중...</div>

  return (
    // ... 사용자님이 만드신 화려한 UI 부분 (return 문 안의 코드 그대로 유지) ...
    // 단, saveLeaderboard가 이제 비동기(async)로 작동하므로 버튼 클릭 시 잘 호출됩니다.
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      {/* ... (이하 동일한 UI 코드) ... */}
      {/* (중략 - 기존 return 문 안의 코드를 그대로 사용하세요) */}
      <div className="max-w-6xl mx-auto">
         {/* Header, Stats, Table 등 기존 코드 유지 */}
         {/* 마지막 저장 버튼 부분에서 onClick={saveLeaderboard} 확인 */}
      </div>
    </div>
  )
}
