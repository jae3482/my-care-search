'use client' // 👈 요거 하나면 해결됨

import NaverMap from '@/components/NaverMap'

export default function MapPage() {
  return (
    <main className="p-6">
      <NaverMap />
    </main>
  )
}