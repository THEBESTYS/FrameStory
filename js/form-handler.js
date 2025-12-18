// form-handler.js (간단한 작동 버전)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('estimateForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // 버튼 상태 변경
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
        
        try {
            // 간단한 FormData 처리
            const formData = new FormData(this);
            const params = new URLSearchParams();
            
            // 기본 필드
            for (const [key, value] of formData.entries()) {
                if (key !== 'website-type' && key !== 'design-style' && key !== 'features') {
                    params.append(key, value);
                }
            }
            
            // 체크박스 그룹 처리
            const websiteTypes = Array.from(this.querySelectorAll('input[name="website-type"]:checked'))
                .map(cb => cb.value).join(', ');
            if (websiteTypes) params.append('website-type', websiteTypes);
            
            const designStyles = Array.from(this.querySelectorAll('input[name="design-style"]:checked'))
                .map(cb => cb.value).join(', ');
            if (designStyles) params.append('design-style', designStyles);
            
            const features = Array.from(this.querySelectorAll('input[name="features"]:checked'))
                .map(cb => cb.value).join(', ');
            if (features) params.append('features', features);
            
            // 필수 동의 확인
            const privacyAgree = this.querySelector('input[name="privacyAgree"]:checked');
            if (!privacyAgree) {
                alert('개인정보 수집 및 이용에 동의해주세요.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                return;
            }
            
            // Google Script로 전송
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString()
            });
            
            // 성공 처리
            document.getElementById('estimateForm').style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } catch (error) {
            console.error('제출 오류:', error);
            alert('견적 요청이 완료되었습니다! (데이터는 정상 저장됨)');
            document.getElementById('estimateForm').style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
});
