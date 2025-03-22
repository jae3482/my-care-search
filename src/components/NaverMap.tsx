'use client'

import { useEffect, useState } from 'react'

const CLIENT_ID = '3utfv202xc'

export default function NaverMap() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (document.getElementById('naver-map-script')) {
      setLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.id = 'naver-map-script'
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${CLIENT_ID}`
    script.async = true
    script.onload = () => setLoaded(true)
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (!loaded) return

    // 지도 생성
    const map = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(37.5665, 126.9780), // 서울
      zoom: 10,
    })
  }, [loaded])

  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>🗺️ 요양기관 지도</h1>
      <div id="map" style={{ width: '100%', height: '500px', borderRadius: '12px', marginTop: '12px' }} />
    </div>
  )
}
