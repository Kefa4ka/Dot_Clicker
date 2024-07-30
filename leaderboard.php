<?php
header('Content-Type: application/json');

// Отримуємо поточний вміст файлу
$file = 'scores.txt';
$scores = file($file, FILE_IGNORE_NEW_LINES);

// Обробка результатів
$leaderboard = [];
foreach ($scores as $line) {
    if (preg_match('/Score: (\d+)/', $line, $matches)) {
        $score = (int)$matches[1];
        $leaderboard[] = ['name' => 'Player', 'score' => $score];
    }
}

// Сортуємо таблицю лідерів за спаданням результатів
usort($leaderboard, function($a, $b) {
    return $b['score'] - $a['score'];
});

// Відображаємо тільки топ 10
$leaderboard = array_slice($leaderboard, 0, 10);

echo json_encode($leaderboard);
?>
