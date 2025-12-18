// form-handler.js - 1번 홈페이지에서 사용하는 것과 동일한 코드
// 단, const GOOGLE_SCRIPT_URL = ... 줄은 제거 (HTML에서 선언)

class FormHandler {
  constructor() {
    this.form = document.getElementById('estimateForm');
    if (!this.form) return;
    
    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // 간단한 FormData 처리 (1번 방식)
    const formData = new FormData(this.form);
    const params = new URLSearchParams();
    
    // 기본 필드
    for (const [key, value] of formData.entries()) {
      params.append(key, value);
    }
    
    // 체크박스 그룹
    const websiteTypes = Array.from(this.form.querySelectorAll('input[name="website-type"]:checked'))
      .map(cb => cb.value).join(', ');
    if (websiteTypes) params.append('website-type', websiteTypes);
    
    // Google Script로 전송 (1번과 완전히 동일)
    try {
      await fetch(window.GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      });
      
      // 성공 처리
      document.getElementById('estimateForm').style.display = 'none';
      document.getElementById('successMessage').style.display = 'block';
      
    } catch (error) {
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  new FormHandler();
});
