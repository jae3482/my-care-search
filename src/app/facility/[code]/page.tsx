import { supabase } from "@/lib/supabaseClient";

interface Props {
  params: {
    code: string;
  };
}

export default async function FacilityDetailPage({ params }: Props) {
  const { code } = params;

  const { data: facility, error } = await supabase
    .from("facilities")
    .select("*")
    .eq("장기요양기관코드", code)
    .single();

  if (error || !facility) {
    return (
      <div className="p-10">
        <h1 className="text-xl font-bold">❌ 기관 정보를 찾을 수 없습니다.</h1>
        <p className="text-gray-500">장기요양기관코드: {code}</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">{facility.장기요양기관이름}</h1>
      <p className="mb-2">🏷️ 기관유형: {facility.기관유형코드}</p>
      <p className="mb-2">📍 주소: {facility.기관별상세주소}</p>
      <p className="mb-2">📬 우편번호: {facility.우편번호}</p>
      <p className="mb-2">👥 정원: {facility.정원}명</p>
      <hr className="my-4" />
      <h2 className="text-lg font-semibold mb-2">인력 구성</h2>
      <ul className="list-disc pl-6">
        <li>요양보호사: {facility.요양보호사}명</li>
        <li>간호사: {facility.간호사}명</li>
        <li>의사(전임): {facility.의사_전임}명</li>
        <li>의사(촉탁): {facility.의사_촉탁}명</li>
        <li>사회복지사: {facility.사회복지사}명</li>
        <li>시설장: {facility.시설장}</li>
        <li>사무국장: {facility.사무국장}</li>
      </ul>
    </div>
  );
}
