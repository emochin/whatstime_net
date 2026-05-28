/* whatstime.net Interactive Script */
document.addEventListener('DOMContentLoaded', () => {
    const breathingWidget = document.getElementById('breathing-widget');
    const instructionText = document.getElementById('instructions');
    const timerText = document.getElementById('timer');
    const controlButton = document.getElementById('btn-breathing-control');

    let isRunning = false;
    let breathingInterval = null;
    let countdownInterval = null;
    
    // Breathing cycle durations (in seconds)
    const INHALE_TIME = 4;
    const HOLD_TIME = 7;
    const EXHALE_TIME = 8;

    // Start/Stop Handler
    function toggleExercise() {
        if (isRunning) {
            stopExercise();
        } else {
            startExercise();
        }
    }

    breathingWidget.addEventListener('click', toggleExercise);
    controlButton.addEventListener('click', toggleExercise);

    // Start the exercise loop
    function startExercise() {
        isRunning = true;
        controlButton.textContent = 'Detener Ejercicio';
        breathingWidget.classList.add('active');
        runBreathingCycle();
    }

    // Stop the exercise and reset UI
    function stopExercise() {
        isRunning = false;
        controlButton.textContent = 'Iniciar Ejercicio de Enfoque';
        breathingWidget.classList.remove('active', 'inhale', 'hold', 'exhale');
        instructionText.textContent = 'Pulsa para empezar';
        timerText.textContent = '4s';
        
        clearTimeout(breathingInterval);
        clearInterval(countdownInterval);
    }

    // Core breathing cycle (Técnica 4-7-8)
    function runBreathingCycle() {
        if (!isRunning) return;

        // 1. INHALE PHASE (4 seconds)
        breathingWidget.classList.remove('exhale', 'hold');
        breathingWidget.classList.add('inhale');
        instructionText.textContent = 'Inhala...';
        startTimer(INHALE_TIME, () => {
            
            // 2. HOLD PHASE (7 seconds)
            if (!isRunning) return;
            breathingWidget.classList.remove('inhale');
            breathingWidget.classList.add('hold');
            instructionText.textContent = 'Mantén el aire...';
            startTimer(HOLD_TIME, () => {
                
                // 3. EXHALE PHASE (8 seconds)
                if (!isRunning) return;
                breathingWidget.classList.remove('hold');
                breathingWidget.classList.add('exhale');
                instructionText.textContent = 'Exhala lentamente...';
                startTimer(EXHALE_TIME, () => {
                    
                    // Loop back to Inhale
                    runBreathingCycle();
                });
            });
        });
    }

    // Countdown helper
    function startTimer(seconds, onComplete) {
        clearInterval(countdownInterval);
        let timeLeft = seconds;
        timerText.textContent = `${timeLeft}s`;

        countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                onComplete();
            } else {
                timerText.textContent = `${timeLeft}s`;
            }
        }, 1000);
    }
});
