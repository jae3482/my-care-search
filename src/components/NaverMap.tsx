'use client'

import { useEffect, useState } from 'react'

// ✅ 타입스크립트가 window.naver 인식하도록 선언
declare global {
  interface Window {
    naver: any
  }
}

// ✅ 환경변수에서 네이버 지도 client id 불러오기
const CLIENT_ID = process.env.NEXT_PUBLIC_NCP_CLIENT_ID

export default function NaverMap() {
  const [loaded, setLoaded] = useState(false)

  // ✅ 스크립트 로드
  useEffect(() => {
    if (!CLIENT_ID) {
      console.error('❌ NCP Client ID가 설정되지 않았습니다.')
      return
    }

    // 이미 스크립트가 있는 경우 중복 로딩 방지
    if (document.getElementById('naver-map-script')) {
      setLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.id = 'naver-map-script'
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${CLIENT_ID}`
    script.async = true
    script.onload = () => {
      console.log('✅ 네이버 지도 스크립트 로드 완료')
      setLoaded(true)
    }
    script.onerror = () => {
      console.error('❌ 네이버 지도 스크립트 로드 실패')
    }
    document.head.appendChild(script)
  }, [])

  // ✅ 지도 렌더링
  useEffect(() => {
    if (!loaded || typeof window === 'undefined' || !window.naver) return

    const map = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(37.5665, 126.9780), // 서울
      zoom: 10,
    })
  }, [loaded])

  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>🗺️ 요양기관 지도</h1>
      <div
        id="map"
        style={{
          width: '100%',
          height: '500px',
          borderRadius: '12px',
          marginTop: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  )
}
