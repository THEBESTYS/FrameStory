async sendToGoogleSheets(data) {
  // 1. JSON 객체를 URLSearchParams로 변환
  const params = new URLSearchParams();
  for (const key in data) {
    // 배열인 경우 문자열로 변환 (예: ['브랜드 소개형', '예약·상담 중심'] → '브랜드 소개형, 예약·상담 중심')
    if (Array.isArray(data[key])) {
      params.append(key, data[key].join(', '));
    } else {
      params.append(key, data[key]);
    }
  }
  
  // 2. Content-Type을 application/x-www-form-urlencoded로 변경
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // ← 이렇게 변경!
    },
    body: params.toString() // ← JSON.stringify 대신 params.toString()
  });
  
  return response;
}
