// form-handler.js - 메인 페이지 5단계 설문 폼 처리

document.addEventListener('DOMContentLoaded', function() {
    const projectForm = document.getElementById('project-form');
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const stepDots = document.querySelectorAll('.step-dot');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    let currentStep = 0;
    const totalSteps = 5;
    
    // 폼 데이터 저장
    const formData = {
        businessType: '',
        budget: '',
        timeline: '',
        goals: [],
        contactInfo: {}
    };
    
    // 다음 단계 버튼 클릭
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateCurrentStep()) {
                saveStepData();
                
                if (currentStep < totalSteps - 1) {
                    currentStep++;
                    updateFormStep();
                } else {
                    // 마지막 단계: 폼 제출
                    submitForm();
                }
            }
        });
    }
    
    // 이전 단계 버튼 클릭
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentStep > 0) {
                currentStep--;
                updateFormStep();
            }
        });
    }
    
    // 폼 단계 업데이트
    function updateFormStep() {
        // 현재 단계 숨기기
        formSteps.forEach((step, index) => {
            step.classList.remove('active');
            stepDots[index].classList.remove('active');
        });
        
        // 새 단계 표시
        formSteps[currentStep].classList.add('active');
        stepDots[currentStep].classList.add('active');
        
        // 버튼 상태 업데이트
        prevBtn.disabled = currentStep === 0;
        nextBtn.textContent = currentStep === totalSteps - 1 ? '제출하기' : '다음 단계 →';
        
        // 진행률 업데이트
        const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `${currentStep + 1}/${totalSteps} 단계`;
        
        // 동적으로 다음 단계 생성 (실제 구현에서는 서버에서 데이터 가져오기)
        if (formSteps[currentStep].dataset.step === '2' && !formSteps[currentStep].hasChildNodes()) {
            createStep2();
        } else if (formSteps[currentStep].dataset.step === '3' && !formSteps[currentStep].hasChildNodes()) {
            createStep3();
        } else if (formSteps[currentStep].dataset.step === '4' && !formSteps[currentStep].hasChildNodes()) {
            createStep4();
        } else if (formSteps[currentStep].dataset.step === '5' && !formSteps[currentStep].hasChildNodes()) {
            createStep5();
        }
    }
    
    // 단계 2 생성
    function createStep2() {
        const step2 = document.querySelector('[data-step="2"]');
        step2.innerHTML = `
            <div class="step-header">
                <span class="step-count">STEP 2</span>
                <h3>예산 범위는 어떻게 되시나요?</h3>
            </div>
            <div class="option-grid">
                <label class="option-card">
                    <input type="radio" name="budget" value="5m" required>
                    <div class="option-content">
                        <div class="option-icon">💼</div>
                        <h4>500만원 미만</h4>
                        <p>스타트업/소규모 비즈니스</p>
                    </div>
                </label>
                
                <label class="option-card">
                    <input type="radio" name="budget" value="5-10m" required>
                    <div class="option-content">
                        <div class="option-icon">🏢</div>
                        <h4>500만원 ~ 1,000만원</h4>
                        <p>중소기업/성장기 비즈니스</p>
                    </div>
                </label>
                
                <label class="option-card">
                    <input type="radio" name="budget" value="10-20m" required>
                    <div class="option-content">
                        <div class="option-icon">🏛️</div>
                        <h4>1,000만원 ~ 2,000만원</h4>
                        <p>중견기업/본격적 투자</p>
                    </div>
                </label>
                
                <label class="option-card">
                    <input type="radio" name="budget" value="20m+" required>
                    <div class="option-content">
                        <div class="option-icon">🌐</div>
                        <h4>2,000만원 이상</h4>
                        <p>대기업/글로벌 비즈니스</p>
                    </div>
                </label>
            </div>
        `;
        
        // 옵션 카드 이벤트 리스너 추가
        initializeOptionCards();
    }
    
    // 단계 3 생성
    function createStep3() {
        const step3 = document.querySelector('[data-step="3"]');
        step3.innerHTML = `
            <div class="step-header">
                <span class="step-count">STEP 3</span>
                <h3>희망 일정은 어떻게 되시나요?</h3>
            </div>
            <div class="option-grid">
                <label class="option-card">
                    <input type="radio" name="timeline" value="asap" required>
                    <div class="option-content">
                        <div class="option-icon">⚡</div>
                        <h4>가능한 빨리</h4>
                        <p>1개월 이내 시작 희망</p>
                    </div>
                </label>
                
                <label class="option-card">
                    <input type="radio" name="timeline" value="1-3month" required>
                    <div class="option-content">
                        <div class="option-icon">📅</div>
                        <h4>1-3개월 이내</h4>
                        <p>신중한 준비 후 시작</p>
                    </div>
                </label>
                
                <label class="option-card">
                    <input type="radio" name="timeline" value="3-6month" required>
                    <div class="option-content">
                        <div class="option-icon">🗓️</div>
                        <h4>3-6개월 이내</h4>
                        <p>장기적인 계획</p>
                    </div>
                </label>
                
                <label class="option-card">
                    <input type="radio" name="timeline" value="undecided" required>
                    <div class="option-content">
                        <div class="option-icon">❓</div>
                        <h4>아직 미정</h4>
                        <p>상담 후 결정</p>
                    </div>
                </label>
            </div>
        `;
        
        initializeOptionCards();
    }
    
    // 단계 4 생성
    function createStep4() {
        const step4 = document.querySelector('[data-step="4"]');
        step4.innerHTML = `
            <div class="step-header">
                <span class="step-count">STEP 4</span>
                <h3>가장 중요한 목표는 무엇인가요? (복수 선택 가능)</h3>
            </div>
            <div class="checkbox-grid">
                <label class="checkbox-card">
                    <input type="checkbox" name="goals" value="brand-awareness">
                    <div class="checkbox-content">
                        <div class="checkbox-icon">🎯</div>
                        <h4>브랜드 인지도 향상</h4>
                        <p>더 많은 사람들에게 브랜드를 알리기</p>
                    </div>
                </label>
                
                <label class="checkbox-card">
                    <input type="checkbox" name="goals" value="lead-generation">
                    <div class="checkbox-content">
                        <div class="checkbox-icon">📞</div>
                        <h4>리드(영업기회) 생성</h4>
                        <p>잠재 고객 확보하기</p>
                    </div>
                </label>
                
                <label class="checkbox-card">
                    <input type="checkbox" name="goals" value="sales-conversion">
                    <div class="checkbox-content">
                        <div class="checkbox-icon">💰</div>
                        <h4>판매 전환율 증가</h4>
                        <p>방문자를 구매자로 전환하기</p>
                    </div>
                </label>
                
                <label class="checkbox-card">
                    <input type="checkbox" name="goals" value="customer-retention">
                    <div class="checkbox-content">
                        <div class="checkbox-icon">🤝</div>
                        <h4>고객 유지율 향상</h4>
                        <p>기존 고객의 충성도 높이기</p>
                    </div>
                </label>
            </div>
        `;
        
        initializeCheckboxCards();
    }
    
    // 단계 5 생성
    function createStep5() {
        const step5 = document.querySelector('[data-step="5"]');
        step5.innerHTML = `
            <div class="step-header">
                <span class="step-count">STEP 5</span>
                <h3>연락처 정보를 입력해주세요</h3>
            </div>
            <div class="contact-form-step">
                <div class="form-group">
                    <label for="contact-name">이름 *</label>
                    <input type="text" id="contact-name" name="contact-name" required placeholder="성함을 입력해주세요">
                </div>
                
                <div class="form-group">
                    <label for="contact-company">회사명 *</label>
                    <input type="text" id="contact-company" name="contact-company" required placeholder="회사명을 입력해주세요">
                </div>
                
                <div class="form-group">
                    <label for="contact-email">이메일 *</label>
                    <input type="email" id="contact-email" name="contact-email" required placeholder="이메일 주소를 입력해주세요">
                </div>
                
                <div class="form-group">
                    <label for="contact-phone">전화번호</label>
                    <input type="tel" id="contact-phone" name="contact-phone" placeholder="전화번호를 입력해주세요">
                </div>
                
                <div class="form-group full-width">
                    <label for="contact-message">추가 요청사항</label>
                    <textarea id="contact-message" name="contact-message" rows="3" placeholder="추가로 알려주실 내용이 있다면 작성해주세요."></textarea>
                </div>
                
                <div class="form-group full-width">
                    <label class="checkbox-label">
                        <input type="checkbox" name="privacy-agreement" required>
                        <span>개인정보 처리방침에 동의합니다</span>
                    </label>
                    <a href="#" class="privacy-link">개인정보 처리방침 보기</a>
                </div>
            </div>
        `;
    }
    
    // 옵션 카드 초기화
    function initializeOptionCards() {
        document.querySelectorAll('.option-card input[type="radio"]').forEach(input => {
            input.addEventListener('change', function() {
                document.querySelectorAll('.option-card').forEach(card => {
                    card.classList.remove('selected');
                });
                this.closest('.option-card').classList.add('selected');
            });
        });
    }
    
    // 체크박스 카드 초기화
    function initializeCheckboxCards() {
        document.querySelectorAll('.checkbox-card input[type="checkbox"]').forEach(input => {
            input.addEventListener('change', function() {
                if (this.checked) {
                    this.closest('.checkbox-card').classList.add('selected');
                } else {
                    this.closest('.checkbox-card').classList.remove('selected');
                }
            });
        });
    }
    
    // 현재 단계 유효성 검사
    function validateCurrentStep() {
        const currentStepElement = formSteps[currentStep];
        
        // 라디오 버튼 검사
        const radioInputs = currentStepElement.querySelectorAll('input[type="radio"]:required');
        if (radioInputs.length > 0) {
            let isRadioChecked = false;
            radioInputs.forEach(input => {
                if (input.checked) isRadioChecked = true;
            });
            
            if (!isRadioChecked) {
                alert('옵션을 선택해주세요.');
                return false;
            }
        }
        
        // 체크박스 검사 (단계 4)
        if (currentStep === 3) {
            const checkboxes = currentStepElement.querySelectorAll('input[type="checkbox"]');
            let isChecked = false;
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) isChecked = true;
            });
            
            if (!isChecked) {
                alert('최소 한 개의 목표를 선택해주세요.');
                return false;
            }
        }
        
        // 연락처 정보 검사 (단계 5)
        if (currentStep === 4) {
            const nameInput = currentStepElement.querySelector('#contact-name');
            const emailInput = currentStepElement.querySelector('#contact-email');
            const companyInput = currentStepElement.querySelector('#contact-company');
            const privacyCheckbox = currentStepElement.querySelector('input[name="privacy-agreement"]');
            
            if (!nameInput.value.trim() || !emailInput.value.trim() || !companyInput.value.trim()) {
                alert('필수 정보를 모두 입력해주세요.');
                return false;
            }
            
            if (!privacyCheckbox.checked) {
                alert('개인정보 처리방침에 동의해주세요.');
                return false;
            }
            
            // 이메일 유효성 검사
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert('유효한 이메일 주소를 입력해주세요.');
                return false;
            }
        }
        
        return true;
    }
    
    // 단계 데이터 저장
    function saveStepData() {
        const currentStepElement = formSteps[currentStep];
        
        switch (currentStep) {
            case 0: // 비즈니스 유형
                const businessType = currentStepElement.querySelector('input[name="business-type"]:checked');
                if (businessType) formData.businessType = businessType.value;
                break;
                
            case 1: // 예산
                const budget = currentStepElement.querySelector('input[name="budget"]:checked');
                if (budget) formData.budget = budget.value;
                break;
                
            case 2: // 일정
                const timeline = currentStepElement.querySelector('input[name="timeline"]:checked');
                if (timeline) formData.timeline = timeline.value;
                break;
                
            case 3: // 목표
                const goals = [];
                currentStepElement.querySelectorAll('input[name="goals"]:checked').forEach(checkbox => {
                    goals.push(checkbox.value);
                });
                formData.goals = goals;
                break;
                
            case 4: // 연락처
                formData.contactInfo = {
                    name: currentStepElement.querySelector('#contact-name').value,
                    company: currentStepElement.querySelector('#contact-company').value,
                    email: currentStepElement.querySelector('#contact-email').value,
                    phone: currentStepElement.querySelector('#contact-phone').value,
                    message: currentStepElement.querySelector('#contact-message').value
                };
                break;
        }
        
        console.log('저장된 폼 데이터:', formData);
    }
    
    // 폼 제출
    function submitForm() {
        // 실제 구현에서는 서버로 데이터 전송
        console.log('최종 폼 데이터 제출:', formData);
        
        // 성공 메시지 표시
        const formContainer = projectForm.parentElement;
        formContainer.innerHTML = `
            <div class="form-success">
                <div class="success-icon">✓</div>
                <h3>설문이 완료되었습니다!</h3>
                <p>입력해주신 정보를 바탕으로 맞춤형 제안서를 준비하고 있습니다.<br>24시간 이내에 <strong>${formData.contactInfo.email}</strong>으로 제안서를 발송해 드리겠습니다.</p>
                <div class="success-summary">
                    <h4>요약 정보</h4>
                    <ul>
                        <li><strong>비즈니스 유형:</strong> ${getBusinessTypeLabel(formData.businessType)}</li>
                        <li><strong>예산 범위:</strong> ${getBudgetLabel(formData.budget)}</li>
                        <li><strong>희망 일정:</strong> ${getTimelineLabel(formData.timeline)}</li>
                        <li><strong>주요 목표:</strong> ${formData.goals.map(getGoalLabel).join(', ')}</li>
                    </ul>
                </div>
                <div class="success-actions">
                    <a href="pages/contact.html" class="btn-primary">상담 바로 예약하기</a>
                    <a href="../index.html" class="btn-secondary">홈으로 돌아가기</a>
                </div>
            </div>
        `;
        
        // 스크롤 맨 위로
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 라벨 변환 헬퍼 함수들
    function getBusinessTypeLabel(value) {
        const labels = {
            'product': '제품 판매',
            'service': '서비스 제공',
            'both': '제품 + 서비스'
        };
        return labels[value] || value;
    }
    
    function getBudgetLabel(value) {
        const labels = {
            '5m': '500만원 미만',
            '5-10m': '500만원 ~ 1,000만원',
            '10-20m': '1,000만원 ~ 2,000만원',
            '20m+': '2,000만원 이상'
        };
        return labels[value] || value;
    }
    
    function getTimelineLabel(value) {
        const labels = {
            'asap': '가능한 빨리',
            '1-3month': '1-3개월 이내',
            '3-6month': '3-6개월 이내',
            'undecided': '아직 미정'
        };
        return labels[value] || value;
    }
    
    function getGoalLabel(value) {
        const labels = {
            'brand-awareness': '브랜드 인지도 향상',
            'lead-generation': '리드 생성',
            'sales-conversion': '판매 전환율 증가',
            'customer-retention': '고객 유지율 향상'
        };
        return labels[value] || value;
    }
    
    // 옵션 카드 초기 이벤트 리스너 설정
    initializeOptionCards();
    
    // 옵션 카드 클릭 이벤트
    document.addEventListener('click', function(e) {
        if (e.target.closest('.option-card')) {
            const optionCard = e.target.closest('.option-card');
            const radioInput = optionCard.querySelector('input[type="radio"]');
            if (radioInput) {
                radioInput.checked = true;
                optionCard.classList.add('selected');
                
                // 다른 옵션 카드 선택 해제
                optionCard.parentElement.querySelectorAll('.option-card').forEach(card => {
                    if (card !== optionCard) {
                        card.classList.remove('selected');
                    }
                });
            }
        }
    });
});
