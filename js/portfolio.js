// portfolio.js - 포트폴리오 필터링 및 모달 기능

document.addEventListener('DOMContentLoaded', function() {
    // 포트폴리오 필터링 기능
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // 활성 버튼 업데이트
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 아이템 필터링
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 더보기 버튼 기능 (샘플 데이터)
    const loadMoreBtn = document.getElementById('load-more');
    let currentItems = 5;
    const totalItems = 10; // 전체 아이템 수
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // 여기에 실제로 더 많은 데이터를 불러오는 로직 구현
            // 예: API 호출 또는 정적 데이터 로드
            
            currentItems += 3;
            
            if (currentItems >= totalItems) {
                this.style.display = 'none';
            }
            
            // 임시 알림
            this.textContent = '더 많은 사례를 준비중입니다...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = '더 많은 사례 보기';
                this.disabled = false;
            }, 2000);
        });
    }
    
    // 테스터모니얼 슬라이더
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // 슬라이드 숨기기
        testimonialSlides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // 도트 업데이트
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // 새 슬라이드 표시
        testimonialSlides[index].style.display = 'block';
        testimonialDots[index].classList.add('active');
        currentSlide = index;
    }
    
    // 초기 슬라이드 표시
    if (testimonialSlides.length > 0) {
        showSlide(0);
        
        // 다음 슬라이드
        if (testimonialNext) {
            testimonialNext.addEventListener('click', function() {
                let nextSlide = currentSlide + 1;
                if (nextSlide >= testimonialSlides.length) {
                    nextSlide = 0;
                }
                showSlide(nextSlide);
            });
        }
        
        // 이전 슬라이드
        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', function() {
                let prevSlide = currentSlide - 1;
                if (prevSlide < 0) {
                    prevSlide = testimonialSlides.length - 1;
                }
                showSlide(prevSlide);
            });
        }
        
        // 도트 클릭
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // 자동 슬라이드 (선택사항)
        setInterval(() => {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= testimonialSlides.length) {
                nextSlide = 0;
            }
            showSlide(nextSlide);
        }, 5000);
    }
    
    // 포트폴리오 모달 기능
    const portfolioModal = document.getElementById('portfolio-modal');
    const modalClose = portfolioModal.querySelector('.modal-close');
    const portfolioLinks = document.querySelectorAll('.portfolio-overlay a');
    
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 여기에 모달에 표시할 데이터를 설정
            // 실제 구현에서는 API나 데이터베이스에서 데이터를 가져옵니다
            const portfolioItem = this.closest('.portfolio-item');
            const title = portfolioItem.querySelector('.portfolio-title').textContent;
            const category = portfolioItem.querySelector('.portfolio-category').textContent;
            const description = portfolioItem.querySelector('.portfolio-description').textContent;
            
            // 모달 내용 업데이트
            const modalBody = portfolioModal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="modal-portfolio">
                    <div class="modal-header">
                        <span class="modal-category">${category}</span>
                        <h3>${title}</h3>
                    </div>
                    <div class="modal-image">
                        <img src="${portfolioItem.querySelector('img').src}" alt="${title}">
                    </div>
                    <div class="modal-content">
                        <p>${description}</p>
                        <div class="modal-results">
                            ${portfolioItem.querySelector('.portfolio-results').outerHTML}
                        </div>
                        <div class="modal-tags">
                            ${portfolioItem.querySelector('.portfolio-tags').outerHTML}
                        </div>
                        <div class="modal-details">
                            <h4>프로젝트 상세</h4>
                            <p>이 프로젝트는 FrameStory의 종합적인 솔루션을 통해 완성되었습니다. 브랜드 스토리 개발부터 웹사이트 구현까지 일관된 전략으로 진행되었으며, 고객사의 비즈니스 목표를 효과적으로 달성할 수 있었습니다.</p>
                            <h4>주요 성과</h4>
                            <ul>
                                <li>브랜드 인지도 180% 향상</li>
                                <li>웹사이트 전환율 320% 증가</li>
                                <li>고객 유치 비용 35% 절감</li>
                                <li>평균 주문 금액 45% 증가</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            
            // 모달 표시
            portfolioModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 모달 닫기
    modalClose.addEventListener('click', function() {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // 모달 외부 클릭 시 닫기
    portfolioModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
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
    document.querySelectorAll('.portfolio-item, .performance-stat').forEach(el => {
        observer.observe(el);
    });
});
