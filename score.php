<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $score = isset($input['score']) ? (int)$input['score'] : 0;

    // Для простоти, ми будемо зберігати результати в текстовому файлі.
    $file = 'scores.txt';

    // Отримуємо поточний вміст файлу
    $current = file_get_contents($file);

    // Додаємо новий результат
    $current .= "Score: $score\n";

    // Зберігаємо файл
    file_put_contents($file, $current);

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
