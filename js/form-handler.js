
async sendToGoogleSheets(data) {
  // 🔍 디버깅: 전송 전 데이터 확인
  console.log('📤 sendToGoogleSheets 호출, 전송할 데이터:', data);
  console.log('🔗 전송할 URL:', GOOGLE_SCRIPT_URL);
 
  // 1. JSON 객체를 URLSearchParams로 변환
  const params = new URLSearchParams();
  for (const key in data) {
    // 배열인 경우 문자열로 변환
    if (Array.isArray(data[key])) {
      params.append(key, data[key].join(', '));
    } else {
      params.append(key, data[key]);
    }
  }
  
  // 🔍 디버깅: 변환된 파라미터 확인
  console.log('📝 URLSearchParams 결과:', params.toString());
  
  // 2. Content-Type을 application/x-www-form-urlencoded로 변경
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString()
  });
  
  console.log('📨 fetch 요청 완료 (no-cors 모드이므로 응답 내용 확인 불가)');
  return response;
}
  
