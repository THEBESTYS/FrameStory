// 2번 홈페이지의 form-handler.js를 이 코드로 완전히 교체

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
    
    // v3 방식: 간단한 FormData 처리
    const formData = new FormData(this.form);
    const params = new URLSearchParams();
    
    // 1. 기본 필드 추가
    for (const [key, value] of formData.entries()) {
      if (key !== 'website-type' && key !== 'design-style' && key !== 'features') {
        params.append(key, value);
      }
    }
    
    // 2. 체크박스 그룹 처리 (v3 방식)
    const websiteTypes = Array.from(this.form.querySelectorAll('input[name="website-type"]:checked'))
      .map(cb => cb.value).join(', ');
    if (websiteTypes) params.append('website-type', websiteTypes);
    
    const designStyles = Array.from(this.form.querySelectorAll('input[name="design-style"]:checked'))
      .map(cb => cb.value).join(', ');
    if (designStyles) params.append('design-style', designStyles);
    
    const features = Array.from(this.form.querySelectorAll('input[name="features"]:checked'))
      .map(cb => cb.value).join(', ');
    if (features) params.append('features', features);
    
    // 3. Google Script로 전송 (v3 방식)
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      });
      
      // 성공 처리 (2번 홈페이지의 UI에 맞게)
      document.getElementById('estimateForm').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
      
    } catch (error) {
      console.error('제출 오류:', error);
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  new FormHandler();
});
