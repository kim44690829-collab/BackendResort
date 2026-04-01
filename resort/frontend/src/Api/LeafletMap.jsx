import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
// import markerIcon2x from '../assets/marker-icon-2x.png';
// import markerIcon from '../assets/marker-icon.png';
// import markerShadow from '../assets/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

// 전역 기본 마커 아이콘 설정
L.Marker.prototype.options.icon = defaultIcon;

export default function LeafletMap({ style, city, hotelName }) {
  
/**
 * city → 좌표 캐시
 * 같은 도시 재요청 방지 (Rate Limit 해결)
 */
const geoCache = new Map();

  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // city 없으면 중단
    if (!city) {
      setError(true);
      setLoading(false);
      return;
    }

    // 상태 초기화
    setLoading(true);
    setError(false);
    setPosition(null);

    // 캐시 있으면 API 호출 안 함
    if (geoCache.has(city)) {
      setPosition(geoCache.get(city));
      setLoading(false);
      return;
    }

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`,
      {
        headers: {
           "Accept": "application/json",
          "User-Agent": "hotel-booking-project",
          "Accept-Language": "en"
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then((data) => {
        if (!data || data.length === 0) {
          setError(true);
          return;
        }

        const pos = [
          Number(data[0].lat),
          Number(data[0].lon),
        ];

        geoCache.set(city, pos); // 캐싱
        setPosition(pos);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city]);

  /* =========================
     렌더링 분기
  ========================== */

    if (loading) {
      return <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>지도 로딩중...</div>;
    }
    // if (!city) {
    //   return (
    //     <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //       <img src={RoomBennerImg[currentImg]} className='RoomBennerImg'/>
    //     </div>
    //   );
    // }else 
    if(error || !position){
      return (
        <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          지도를 불러올 수 없습니다.
        </div>
      );
    }

  return (
    <MapContainer
      center={position}
      zoom={20}
      style={style}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <Marker position={position}>
        <Tooltip
            direction="top"
            offset={[0, -10]}
            opacity={1}
            permanent
        >
            {hotelName}
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}

// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
// import L from 'leaflet';

// const defaultIcon = L.icon({
//   iconUrl: '/marker-icon.png',
//   iconRetinaUrl: '/marker-icon-2x.png',
//   shadowUrl: '/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   shadowSize: [41, 41],
// });

// L.Marker.prototype.options.icon = defaultIcon;

// // 컴포넌트 밖으로 빼기
// const geoCache = new Map();

// export default function LeafletMap({ style, city, hotelName }) {
//   const [position, setPosition] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     if (!city) {
//       setPosition(null);
//       setError(false);
//       setLoading(false);
//       return;
//     }

//     let cancelled = false;

//     setLoading(true);
//     setError(false);
//     setPosition(null);

//     if (geoCache.has(city)) {
//       setPosition(geoCache.get(city));
//       setLoading(false);
//       return;
//     }

//     fetch(
//       `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`,
//       {
//         headers: {
//           Accept: 'application/json',
//           'Accept-Language': 'en',
//         },
//       }
//     )
//       .then((res) => {
//         if (!res.ok) throw new Error('API Error');
//         return res.json();
//       })
//       .then((data) => {
//         if (cancelled) return;

//         if (!data || data.length === 0) {
//           setError(true);
//           return;
//         }

//         const pos = [Number(data[0].lat), Number(data[0].lon)];
//         geoCache.set(city, pos);
//         setPosition(pos);
//       })
//       .catch(() => {
//         if (!cancelled) setError(true);
//       })
//       .finally(() => {
//         if (!cancelled) setLoading(false);
//       });

//     return () => {
//       cancelled = true;
//     };
//   }, [city]);

//   const [currentImg, setCurrent] = useState(0);
//   const RoomBennerImg = [
//     '/eventbenner/room_bn1.jpg',
//     '/eventbenner/room_bn2.jpg',
//     '/eventbenner/room_bn3.jpg',
//     '/eventbenner/room_bn4.jpg',
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev < 3 ? prev + 1 : 0));
//     }, 3000);

//     return () => clearInterval(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         지도 로딩중...
//       </div>
//     );
//   }

//   if (!city) {
//     return (
//       <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <img src={RoomBennerImg[currentImg]} className="RoomBennerImg" />
//       </div>
//     );
//   }

//   if (error || !position) {
//     return (
//       <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         지도를 불러올 수 없습니다.
//       </div>
//     );
//   }

//   return (
//     <MapContainer center={position} zoom={20} style={style}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="© OpenStreetMap contributors"
//       />
//       <Marker position={position}>
//         <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
//           {hotelName}
//         </Tooltip>
//       </Marker>
//     </MapContainer>
//   );
// }