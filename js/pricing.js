// pricing.js - FAQ 및 가격 비교 기능

document.addEventListener('DOMContentLoaded', function() {
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
    
    // 가격 테이블 호버 효과
    const pricingTables = document.querySelectorAll('.pricing-table');
    
    pricingTables.forEach(table => {
        table.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = 'var(--shadow-lg)';
            }
        });
        
        table.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--shadow-md)';
            }
        });
    });
    
    // 서비스 선택 시 연락처 페이지로 전환
    const serviceLinks = document.querySelectorAll('.pricing-cta a[href*="contact.html"]');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').includes('?')) {
                // 이미 쿼리스트링이 있으면 그대로 이동
                return;
            }
            
            // 서비스 타입에 따라 쿼리스트링 추가
            const serviceType = this.closest('.pricing-table').querySelector('h3').textContent;
            let serviceParam = '';
            
            if (serviceType.includes('StoryFrame')) {
                serviceParam = 'storyframe';
            } else if (serviceType.includes('StrategyFrame')) {
                serviceParam = 'strategyframe';
            } else if (serviceType.includes('WebFrame')) {
                serviceParam = 'webframe';
            } else if (serviceType.includes('통합 패키지')) {
                serviceParam = 'integrated';
            }
            
            if (serviceParam) {
                this.href = `contact.html?service=${serviceParam}`;
            }
        });
    });
    
    // 통합 패키지 가격 비교 계산기 (간단한 버전)
    const packageCalculator = document.querySelector('.package-pricing');
    
    if (packageCalculator) {
        // 개별 가격 합계 표시
        const individualPrices = {
            storyframe: 8900000,
            strategyframe: 12900000,
            webframe: 15900000
        };
        
        const individualTotal = individualPrices.storyframe + individualPrices.strategyframe + individualPrices.webframe;
        const packagePrice = 26900000;
        const savings = individualTotal - packagePrice;
        const savingsPercent = Math.round((savings / individualTotal) * 100);
        
        // 가격 표시 업데이트
        const originalPriceElement = packageCalculator.querySelector('.original-price .price');
        if (originalPriceElement) {
            originalPriceElement.textContent = `₩${individualTotal.toLocaleString()}`;
        }
        
        const savingsElement = packageCalculator.querySelector('.savings');
        if (savingsElement && savingsPercent > 0) {
            savingsElement.textContent = `${savingsPercent}% 절약`;
        }
    }
    
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
    document.querySelectorAll('.pricing-table, .addon-card, .feature').forEach(el => {
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
