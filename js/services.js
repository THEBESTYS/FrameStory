// services.js - 서비스 탭 및 FAQ 기능

document.addEventListener('DOMContentLoaded', function() {
    // 서비스 탭 전환 기능
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceDetails = document.querySelectorAll('.service-detail');
    
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 활성 탭 업데이트
            serviceTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 활성 서비스 내용 업데이트
            serviceDetails.forEach(detail => {
                detail.classList.remove('active');
                if (detail.id === tabId) {
                    detail.classList.add('active');
                }
            });
            
            // URL 해시 업데이트
            window.history.replaceState(null, null, `#${tabId}`);
        });
    });
    
    // URL 해시에서 초기 탭 설정
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        const targetTab = document.querySelector(`.service-tab[data-tab="${hash}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
    
    // FAQ 토글 기능
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // 모든 FAQ 닫기
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // 선택한 FAQ 열기
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
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
    document.querySelectorAll('.service-card, .benefit-card, .process-step').forEach(el => {
        observer.observe(el);
    });
});
