const wordsEl = document.querySelector('#words');
const inputWordEl = document.querySelector('#input-word');
const timeEl = document.querySelector('#time');
const btnStart = document.querySelector('.start');
const paragraphEl = document.querySelector('#paragraph');
const wordscorrectEl = document.querySelector('.words-correct');
const wordswrongEl = document.querySelector('.words-wrong');

let string = "Tôi trả tiền làm tượng nhưng cũng không hài lòng Anh Tú Thứ năm Chủ khu du lịch An sapa Sa Pa Lào Cai nghĩ cộng đồng mạng nên có cái nhìn chính xác hơn về sự cố liên quan đến tượng Nữ thần Tự do vừa qua Chia sẻ với Zing ông Nguyễn Ngọc Đông chủ khu An sapa thừa nhận rất mệt mỏi trong những ngày qua khi trở thành nạn nhân của cộng đồng mạng";

let paragraph = {
    1: string
};

let time;
let words;
let interval;
let index;
let isPlaying;


paragraphEl.addEventListener('change', function () {
    init();
});

btnStart.addEventListener('click', function () {
    init();
});

function randomWords(arr) {
    return arr.sort(function () {
        return Math.random() - 0.5;
    });
}

function convertTime(num) {
    let minute = `0${Math.floor(num / 60)}`.slice(-2);
    let second = `0${num % 60}`.slice(-2);
    return `${minute}:${second}`;
}

function highlightWord(index) {
    let spans = document.querySelectorAll('#words span');
    Array.from(spans).map((span) => span.classList.remove('highlight'));
    spans[index].classList.add('highlight');
}

function init() {
    time = 60;
    index = 0;
    isPlaying = false;

    if (interval) {
        clearInterval(interval);
    }

    inputWordEl.disabled = false;
    inputWordEl.value = '';

    let paragraphValue = paragraphEl.value;
    words = paragraph[paragraphValue].toLowerCase().split(' ');

    words = randomWords(words);

    renderWords(words);

    timeEl.innerText = convertTime(time);

    highlightWord(index);
}

inputWordEl.addEventListener('keyup', function (e) {
    if (!isPlaying) {
        interval = setInterval(countdownTime, 1000);
        isPlaying = true;
    }
    checkCurrentWord(e.target.value.trim(), words[index]);

    if (e.keyCode == 32) {
        compareWord(e.target.value.trim(), words[index]);
        index++;
        highlightWord(index);
        e.target.value = '';
    }
});

function checkCurrentWord(inputValue, word) {
    let spans = document.querySelectorAll('#words span');

    if (!word.startsWith(inputValue)) {
        spans[index].classList.add('highlight-wrong');
    } else {
        spans[index].classList.remove('highlight-wrong');
    }
}

function compareWord(inputValue, word) {
    let spans = document.querySelectorAll('#words span');
    Array.from(spans).map((span) => span.classList.remove('highlight-wrong'));

    if (!word.startsWith(inputValue)) {
        spans[index].classList.add('wrong');
    }

    if (word.startsWith(inputValue) && inputValue.length != word.length) {
        spans[index].classList.add('wrong');
    }

    if (inputValue == word) {
        spans[index].classList.add('correct');
    }
}

function countdownTime() {
    time--;
    timeEl.innerText = convertTime(time);

    if (time == 0) {
        clearInterval(interval);
        inputWordEl.disabled = true;
        inputWordEl.value = '';

        updateInfoPlayer();
    }
}

function updateInfoPlayer() {
    let spans = document.querySelectorAll('#words span');

    let totalCorrectWords = 0; 
    let totalWrongWords = 0; 

    for (let i = 0; i < spans.length; i++) {
        if (spans[i].classList.contains('correct')) {
            totalCorrectWords++;
        }
        if (spans[i].classList.contains('wrong')) {
            totalWrongWords++;
        }
    }
    wordscorrectEl.innerText = totalCorrectWords;
    wordswrongEl.innerText = totalWrongWords;
}

function renderWords(arr) {
    wordsEl.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        const w = arr[i];
        wordsEl.innerHTML += `
            <span>${w}</span>
        `;
    }
}

window.onload = init;
