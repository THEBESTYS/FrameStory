// process.js - 프로세스 페이지 인터랙티브 기능

document.addEventListener('DOMContentLoaded', function() {
    // 프로세스 단계 아코디언 기능
    const processPhases = document.querySelectorAll('.process-phase');
    
    processPhases.forEach(phase => {
        const phaseHeader = phase.querySelector('.phase-header');
        
        phaseHeader.addEventListener('click', function() {
            const isActive = phase.classList.contains('active');
            
            // 모든 단계 닫기
            processPhases.forEach(p => {
                p.classList.remove('active');
            });
            
            // 선택한 단계 열기
            if (!isActive) {
                phase.classList.add('active');
                
                // 스크롤로 이동
                setTimeout(() => {
                    phase.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
            }
        });
    });
    
    // 첫 번째 단계 열기
    if (processPhases.length > 0) {
        processPhases[0].classList.add('active');
    }
    
    // 타임라인 애니메이션
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // 협업 기능 아이콘 애니메이션
    const collabFeatures = document.querySelectorAll('.collab-feature');
    
    collabFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.2}s`;
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(feature);
    });
    
    // 활동 카드 호버 효과
    const activityCards = document.querySelectorAll('.activity');
    
    activityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });
    
    // 단계별 진행률 표시
    function updateProgress() {
        const phases = document.querySelectorAll('.process-phase');
        const progressBar = document.createElement('div');
        progressBar.className = 'phase-progress';
        
        phases.forEach((phase, index) => {
            const progressItem = document.createElement('div');
            progressItem.className = 'progress-item';
            progressItem.innerHTML = `
                <span class="progress-number">${index + 1}</span>
                <span class="progress-label">${phase.querySelector('h2').textContent}</span>
            `;
            
            progressItem.addEventListener('click', function() {
                // 모든 단계 닫기
                phases.forEach(p => p.classList.remove('active'));
                // 선택한 단계 열기
                phase.classList.add('active');
                
                // 스크롤로 이동
                setTimeout(() => {
                    phase.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
            });
            
            progressBar.appendChild(progressItem);
        });
        
        // 페이지에 진행률 바 추가
        const detailedProcess = document.querySelector('.detailed-process');
        if (detailedProcess && !document.querySelector('.phase-progress')) {
            detailedProcess.insertBefore(progressBar, detailedProcess.firstChild);
        }
    }
    
    // 반응형: 작은 화면에서만 진행률 바 표시
    if (window.innerWidth < 768) {
        updateProgress();
    }
    
    // 화면 크기 변경 감지
    window.addEventListener('resize', function() {
        const progressBar = document.querySelector('.phase-progress');
        
        if (window.innerWidth < 768 && !progressBar) {
            updateProgress();
        } else if (window.innerWidth >= 768 && progressBar) {
            progressBar.remove();
        }
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
    
    // 추가 CSS 스타일 동적 추가
    const style = document.createElement('style');
    style.textContent = `
        .process-phase.active .phase-content {
            max-height: 5000px;
            opacity: 1;
            padding-top: var(--space-lg);
        }
        
        .phase-content {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.5s ease;
        }
        
        .phase-progress {
            display: flex;
            justify-content: space-between;
            margin-bottom: var(--space-lg);
            padding: var(--space-md);
            background: var(--bg-white);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-sm);
            overflow-x: auto;
        }
        
        .progress-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: var(--space-sm);
            cursor: pointer;
            min-width: 80px;
            transition: all 0.3s ease;
        }
        
        .progress-item:hover {
            transform: translateY(-2px);
        }
        
        .progress-number {
            width: 30px;
            height: 30px;
            background: var(--primary);
            color: var(--text-light);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            margin-bottom: var(--space-xs);
        }
        
        .progress-label {
            font-size: 0.75rem;
            text-align: center;
            color: var(--text-secondary);
            font-weight: 500;
        }
        
        .collab-feature {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .collab-feature.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item {
            opacity: 0;
            transform: translateX(-50px);
            transition: all 0.6s ease;
        }
        
        .timeline-item.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .timeline-item:nth-child(even) {
            transform: translateX(50px);
        }
        
        .timeline-item:nth-child(even).animate-in {
            transform: translateX(0);
        }
    `;
    
    document.head.appendChild(style);
});
