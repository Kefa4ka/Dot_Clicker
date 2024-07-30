let clickCount = 0;
let scoreCount = 0;
let clickValue = 1;
let timeLeft = 300; // 5 minutes in seconds
let autoClickers = [];
let timerStarted = false;

// Функція для автоматичних кліків
function startAutoClickers() {
    autoClickers.forEach(({ rate, clicks }) => {
        setInterval(() => {
            clickCount += clicks;
            scoreCount += clicks;
            document.getElementById('click-count').textContent = clickCount;
            document.getElementById('score-count').textContent = scoreCount;

            // Анімація збільшення числа кліків
            animateClickCount();
        }, rate);
    });
}

document.getElementById('start-timer-button').addEventListener('click', () => {
    if (!timerStarted) {
        timerStarted = true;
        document.getElementById('clicker-button').disabled = false; // Розблокувати кнопку кліку
        document.getElementById('start-timer-button').disabled = true; // Заблокувати кнопку запуску таймера
        startTimer();
    }
});

document.getElementById('clicker-button').addEventListener('click', () => {
    if (timerStarted) {
        clickCount += clickValue;
        scoreCount += clickValue;
        document.getElementById('click-count').textContent = clickCount;
        document.getElementById('score-count').textContent = scoreCount;

        // Анімація збільшення числа кліків
        animateClickCount();
    }
});

document.getElementById('save-score').addEventListener('click', () => {
    fetch('score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score: scoreCount })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Score saved successfully!');
            window.location.href = 'leaderboard.html';
        } else {
            alert('Failed to save score.');
        }
    });
});

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const shopItem = event.target.closest('.shop-item');
        const cost = parseInt(shopItem.getAttribute('data-cost'));
        const value = parseInt(shopItem.getAttribute('data-value'));

        if (clickCount >= cost) {
            clickCount -= cost;
            clickValue += value;
            document.getElementById('click-count').textContent = clickCount;
            alert(`Purchased upgrade! Your click value is now ${clickValue}`);
        } else {
            alert('Not enough clicks!');
        }
    });
});

document.querySelectorAll('.buy-auto-clicker').forEach(button => {
    button.addEventListener('click', (event) => {
        const autoClickerItem = event.target.closest('.auto-clicker-item');
        const cost = parseInt(autoClickerItem.getAttribute('data-cost'));
        const rate = parseInt(autoClickerItem.getAttribute('data-rate'));

        if (clickCount >= cost) {
            clickCount -= cost;
            autoClickers.push({ rate, clicks: clickValue });
            startAutoClickers();
            document.getElementById('click-count').textContent = clickCount;
            alert(`Purchased auto-clicker! Clicks every ${rate / 1000} seconds.`);
        } else {
            alert('Not enough clicks!');
        }
    });
});

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`Time's up! Your final score is ${scoreCount}`);
            document.getElementById('clicker-button').disabled = true;
            document.getElementById('save-score').disabled = false;
        }
    }, 1000);
}

function animateClickCount() {
    const clickCountElement = document.getElementById('click-count');
    clickCountElement.classList.add('bounce');
    setTimeout(() => {
        clickCountElement.classList.remove('bounce');
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('clicker-button').disabled = true; // Спочатку кнопка кліку заблокована
    document.getElementById('save-score').disabled = true; // Спочатку кнопка збереження заблокована
});
