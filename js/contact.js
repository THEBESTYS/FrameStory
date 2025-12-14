// contact.js - 연락처 폼 및 지도 기능

document.addEventListener('DOMContentLoaded', function() {
    // 폼 제출 처리
    const contactForm = document.getElementById('consultation-form');
    const successModal = document.getElementById('success-modal');
    const modalClose = successModal.querySelector('.modal-close');
    const modalConfirm = successModal.querySelector('.modal-confirm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // 간단한 유효성 검사
            if (!formObject.name || !formObject.email || !formObject.company || !formObject.service) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }
            
            // 실제 구현에서는 여기서 서버로 데이터 전송
            // 예: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formObject) })
            
            // 성공 모달 표시 (임시)
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // 폼 초기화
            this.reset();
            
            // 콘솔에 데이터 출력 (테스트용)
            console.log('폼 제출 데이터:', formObject);
            
            // URL 파라미터에서 서비스 타입 가져오기
            const urlParams = new URLSearchParams(window.location.search);
            const serviceParam = urlParams.get('service');
            
            if (serviceParam) {
                // 서비스 셀렉트 박스에 설정
                const serviceSelect = document.getElementById('service');
                if (serviceSelect) {
                    serviceSelect.value = serviceParam;
                }
            }
        });
    }
    
    // 모달 닫기
    modalClose.addEventListener('click', closeModal);
    modalConfirm.addEventListener('click', closeModal);
    
    function closeModal() {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // 모달 외부 클릭 시 닫기
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // FAQ 토글 기능
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // 현재 FAQ 항목 토글
            if (isActive) {
                faqItem.classList.remove('active');
            } else {
                // 다른 모든 FAQ 닫기
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                // 선택한 FAQ 열기
                faqItem.classList.add('active');
            }
        });
    });
    
    // 연락처 카드 애니메이션
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    // Google Maps API 구현 (예시)
    function initMap() {
        // 실제 구현에서는 Google Maps API 키 필요
        console.log('Google Maps 초기화 위치: 서울특별시 강남구 테헤란로 123');
        
        // 간단한 지도 대체 구현
        const mapPlaceholder = document.querySelector('.map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.innerHTML = `
                <div class="map-overlay">
                    <h3>FrameStory 오피스</h3>
                    <p>서울특별시 강남구 테헤란로 123<br>프레임스토리 빌딩 15층</p>
                    <div class="transport-info">
                        <div class="transport">
                            <strong>지하철</strong>
                            <p>2호선 강남역 11번 출구 도보 5분</p>
                        </div>
                        <div class="transport">
                            <strong>주차</strong>
                            <p>건물 지하주차장 이용 가능</p>
                        </div>
                    </div>
                    <div class="map-actions">
                        <a href="https://maps.google.com/?q=서울특별시+강남구+테헤란로+123" 
                           target="_blank" 
                           class="btn-primary"
                           style="margin-top: 20px;">
                            Google 지도에서 보기
                        </a>
                    </div>
                </div>
            `;
        }
    }
    
    // 페이지 로드 시 지도 초기화
    window.addEventListener('load', initMap);
    
    // 애니메이션 효과
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 애니메이션 적용 요소
    document.querySelectorAll('.contact-card, .process-step, .info-card').forEach(el => {
        observer.observe(el);
    });
    
    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
