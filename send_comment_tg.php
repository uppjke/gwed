<?php
$telegramBotToken = "TOKEN";
$chat_id = "CHAT_ID";

if(!empty($_POST['food_list'])) {
    foreach($_POST['food_list'] as $check) {
        $dish .= $check . "%0A";
    }
}

if(!empty($_POST['cham'])) {
    foreach($_POST['cham'] as $check) {
        $cham .= $check . " ";
    }
}

if(!empty($_POST['cham_type'])) {
    foreach($_POST['cham_type'] as $check) {
        $cham_type .= $check . " ";
    }
}

if(!empty($_POST['wine'])) {
    foreach($_POST['wine'] as $check) {
        $wine .= $check . " ";
    }
}

if(!empty($_POST['wine_type'])) {
    foreach($_POST['wine_type'] as $check) {
        $wine_type .= $check . " ";
    }
}

if(!empty($_POST['wine_color'])) {
    foreach($_POST['wine_color'] as $check) {
        $wine_color .= $check . " ";
    }
}

if(!empty($_POST['spirits'])) {
    foreach($_POST['spirits'] as $check) {
        $spirits .= $check;
    }
}

if(!empty($_POST['non_drink'])) {
    foreach($_POST['non_drink'] as $check) {
        $non_drink .= $check;
    }
}

$fullname = $_POST['fullname'];
$fullname = "Меня зовут: " . $fullname;
$food = "%0A%0A" . "Я буду кушать: " . "%0A" . $dish;
$drink = "%0A" . "Я буду пить: " . "%0A" . $cham . $cham_type . "%0A" . $wine . $wine_color . $wine_type . "%0A" . $spirits . $non_drink;
$comment = $_POST['comment'];
$comment = "%0A%0A" . "Пожелание: " . $comment;
$text = $fullname . $food . $drink . $comment;

$api_url = "https://api.telegram.org/bot{$telegramBotToken}/sendMessage?chat_id={$chat_id}&text={$text}";

$response = file_get_contents($api_url);
?>
