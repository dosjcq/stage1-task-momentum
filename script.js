const time = document.querySelector(".time");
const playerContainer = document.querySelector(".player");
const date = document.querySelector(".date");
const greetingContainer = document.querySelector(".greeting-container");
const greeting = document.querySelector(".greeting");
const userName = document.querySelector(".name");
const body = document.getElementsByTagName("body")[0];
let randomNum;
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const weatherContainer = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const todoContainer = document.querySelector(".todo");
const quotesContainer = document.querySelector(".quotes");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
let quotesArr;
const quoteChange = document.querySelector(".change-quote");
// let isPlay = false;
// const play = document.querySelector(".play");
// let playNum = 0;
// const audioNext = document.querySelector(".play-next");
// const audioPrev = document.querySelector(".play-prev");
const toggleSettingsVisibility = document.querySelector(".settings-on");
const settingsMenu = document.querySelector(".settings");
const settingsChooseLanguage = document.querySelector(".choose-language");
const settingsChooseBackground = document.querySelector(".choose-bg");
const settingsChooseBlock = document.querySelector(".choose-blocks");
const settingsQueryForBack = document.querySelector(".query-for-back");
const settingsHideBlocksArr = document.querySelectorAll(".hideOneBlock");
console.log("settingsHideBlocksArr: ", settingsHideBlocksArr);

// const playList = [
//   {
//     title: "Aqua Caelestis",
//     src: "../assets/sounds/Aqua Caelestis.mp3",
//     duration: "00:58",
//   },
//   {
//     title: "River Flows In You",
//     src: "../assets/sounds/River Flows In You.mp3",
//     duration: "03:50",
//   },
//   {
//     title: "Ennio Morricone",
//     src: "../assets/sounds/Ennio Morricone.mp3",
//     duration: "01:37",
//   },
//   {
//     title: "Summer Wind",
//     src: "../assets/sounds/Summer Wind.mp3",
//     duration: "01:50",
//   },
// ];
// const li = document.createElement("li");
// const playListContainer = document.querySelector(".play-list");

// Записываем в ul.play-list названия песен, которые есть
// playList.forEach((el) => {
//   let li = document.createElement("li");
//   li.classList.add("play-item");
//   li.textContent = el.title;
//   playListContainer.append(li);
// });

let lang = "en-En";
let currentQuoteNum;
let bgType = "git";
let dataFlickr;
let dataUnsplash;
let slideNumFlickr = 0;
let slideNumUnsplash = 0;
const photoThemeInput = document.querySelector(".choose-photo-theme");
let themeUnsplash;

let hideBlockArrEn = [
  "Time",
  "Date",
  "Greeting",
  "Weather",
  "Player",
  "ToDo",
  "Quotes",
];

let hideBlockArrRu = [
  "Время",
  "Дату",
  "Приветствие",
  "Погоду",
  "Плеер",
  "Туду",
  "Цитаты",
];

function iterateThrewHideBlocks() {
  if (lang === "en-En") {
    let g = 0;
    settingsHideBlocksArr.forEach((el) => {
      el.textContent = `Hide ${hideBlockArrEn[g]}`;
      g++;
    });
  } else {
    let g = 0;
    settingsHideBlocksArr.forEach((el) => {
      el.textContent = `Скрыть ${hideBlockArrRu[g]}`;
      g++;
    });
  }
}

iterateThrewHideBlocks();

settingsChooseLanguage.textContent = "Choose language";
settingsChooseBackground.textContent = "Choose background";
settingsChooseBlock.textContent = "Hide Blocks";
settingsQueryForBack.textContent = "Photo Theme";

// Функция выводит текущее время онлайн
function showTime() {
  const currentTime = new Date().toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
}
showTime();

// Функция выводит текущюю дату онлайн
function showDate() {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const currentDate = new Date().toLocaleDateString(lang, options);
  date.textContent = currentDate;
  setTimeout(showDate, 1000);
}
showDate();

// Функция подбирает время суток для вывода приветствия и bg изображения
function getTimeOfDay() {
  const hours = new Date().getHours();
  greetArr = ["night", "morning", "afternoon", "evening"];
  return greetArr[Math.floor(hours / 6)];
}

// Функция выводит приветствие в зависимости от времени суток
function showGreeting() {
  if (lang === "en-En") {
    const timeOfDay = getTimeOfDay();
    greeting.textContent = `Good ${timeOfDay}`;
  } else {
    const timeOfDay = getTimeOfDay();
    greetArrRu = ["Доброй ночи", "Доброе утро", "Добрый день", "Добрый вечер"];
    switch (timeOfDay) {
      case "night":
        greeting.textContent = `${greetArrRu[0]}`;
        break;
      case "morning":
        greeting.textContent = `${greetArrRu[1]}`;
        break;
      case "afternoon":
        greeting.textContent = `${greetArrRu[2]}`;
        break;
      case "evening":
        greeting.textContent = `${greetArrRu[3]}`;
        break;
    }
  }
  setTimeout(showGreeting, 1000);
}
showGreeting();

// Функция перед перезагрузкой страницы сохраняет имя пользователя в local storage
function setLocalStorage() {
  localStorage.setItem("name", userName.value);
}
window.addEventListener("beforeunload", setLocalStorage);

// Функция перед загрузкой страницы достает имя пользователя из  local storage
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

// Функция получает случайное значение от 1 до 20 для выбора фонового изображения
function getRandomNum() {
  randomNum = Math.floor(Math.random() * (21 - 1)) + 1;
}

// Функция задает фоновое изображение в зависимости от времени суток c github
function setBg() {
  bgType = "git";
  timeOfDay = getTimeOfDay();
  getRandomNum();
  strBgNum = String(randomNum).padStart(2, "0");
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${strBgNum}.jpg')`;
}
setBg();

// Функция перелистывает картинку меняя путь github
function slideBg(num) {
  timeOfDay = getTimeOfDay();
  strBgNum = String(num).padStart(2, "0");
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${strBgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`;
  };
}

// Функция перелистывает картинку меняя путь flickr
function slideBgFlickr(num) {
  const img = new Image();
  img.src = `${dataFlickr.photos.photo[num].url_l}`;
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`;
  };
}

// Функция которая перелистывает картинку вперед, меняя индекс на +1
function getSlideNext() {
  if (bgType === "unsplash") {
    getLinkToImageUnsplash(themeUnsplash);
  } else if (bgType === "flickr") {
    slideNumFlickr += 1;
    if (slideNumFlickr === 100) {
      slideNumFlickr = 0;
    }
    slideBgFlickr(slideNumFlickr);
  } else {
    randomNum += 1;
    if (randomNum === 21) {
      randomNum = 1;
    }
    slideBg(randomNum);
  }
}

// Функция которая перелистывает картинку назад, меняя индекс на -1
function getSlidePrev() {
  if (bgType === "unsplash") {
    getLinkToImageUnsplash(themeUnsplash);
  } else if (bgType === "flickr") {
    slideNumFlickr -= 1;
    if (slideNumFlickr === -1) {
      slideNumFlickr = 99;
    }
    slideBgFlickr(slideNumFlickr);
  } else {
    randomNum -= 1;
    if (randomNum === 0) {
      randomNum = 20;
    }
    slideBg(randomNum);
  }
}

// Функция подгружает данные о погоде в соответствии с городом
async function getWeather() {
  let weatherLang = "en";
  let windLang;
  let windSpeed;
  let humidityLang;
  let errorLang;
  if (lang === "en-En") {
    weatherLang = "en";
    windLang = "Wind";
    windSpeed = "m/s";
    humidityLang = "Humidity";
    errorLang = "Incorrect city";
  } else {
    weatherLang = "ru";
    windLang = "Скорость ветра";
    windSpeed = "м/c";
    humidityLang = "Влажность";
    errorLang = "Некорректный город";
  }
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${weatherLang}&appid=12a81f56cb50b9f2630fcd1a0240d2ee&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.style.color = "white";
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${windLang}: ${data.wind.speed.toFixed(
      0
    )} ${windSpeed}`;
    humidity.textContent = `${humidityLang}: ${data.main.humidity} %`;
  } catch (error) {
    weatherIcon.className = " ";
    temperature.textContent = " ";
    weatherDescription.style.color = "red";
    weatherDescription.textContent = `${errorLang}`;
    wind.textContent = " ";
    humidity.textContent = " ";
  }
}
getWeather();

// Меняем город для отображения погоды
city.addEventListener("change", getWeather);

// Функция загружает цитаты и выводит рандомную
async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  // console.log(data);
  quotesArr = data;
  setNumQuote = Math.floor(Math.random() * (18 - 0)) + 0;
  currentQuoteNum = setNumQuote;
  quote.textContent = data[setNumQuote].text;
  author.textContent = data[setNumQuote].author;
}
getQuotes();

// Функция позволяет изменить цитату на другую
function changeQuote() {
  randomQuote = Math.floor(Math.random() * (18 - 0)) + 0;
  currentQuoteNum = randomQuote;
  if (lang === "en-En") {
    quote.textContent = quotesArr[randomQuote].text;
    author.textContent = quotesArr[randomQuote].author;
  } else {
    quote.textContent = quotesArr[randomQuote].textRu;
    author.textContent = quotesArr[randomQuote].authorRu;
  }
}

// Добавляем событие на клик для изменения цитаты
quoteChange.addEventListener("click", changeQuote);

// const audio = new Audio();

// // Функция запускает проигрывание аудио
// function playAudio() {
//   audio.src = playList[playNum].src; // ссылка на аудио-файл;
//   audio.currentTime = 0;
//   if (!isPlay) {
//     audio.play();
//     isPlay = true;
//     play.classList.toggle("pause");
//   } else {
//     audio.pause();
//     isPlay = false;
//     play.classList.toggle("pause");
//   }
// }

// // Функция запускает предыдущий или следующий трек
// function playSlideAudio() {
//   audio.src = playList[playNum].src;
//   if (!isPlay) {
//     isPlay = true;
//     play.classList.toggle("pause");
//   } else {
//     isPlay = false;
//     play.classList.toggle("pause");
//   }
//   audio.play();
// }

// // Вешаем событие клик для воспроизведения аудио
// play.addEventListener("click", playAudio);

// // Функция переключается на следующий трек
// function playNext() {
//   playNum += 1;
//   playSlideAudio();
// }

// // Функция переключается на предидущий трек
// function playPrev() {
//   playNum -= 1;
//   playSlideAudio();
// }

// // Вешаем событие клик для воспроизведения следующего аудио
// audioNext.addEventListener("click", playNext);

// // Вешаем событие клик для воспроизведения преидущего аудио
// audioPrev.addEventListener("click", playPrev);

const translation = document.querySelector(".translate");

function translateApp(value) {
  // lang === "en-En"
  //   ? ((lang = "ru-Ru"),
  //     (userName.placeholder = "[Введите имя]"),
  //     (city.value = "Минск"))
  //   : ((lang = "en-En"),
  //     (userName.placeholder = "[Enter name]"),
  //     (city.value = "Minsk"));
  if (value === "ru") {
    lang = "ru-Ru";
    userName.placeholder = "[Введите имя]";
    city.value = "Минск";
    quote.textContent = quotesArr[currentQuoteNum].textRu;
    author.textContent = quotesArr[currentQuoteNum].authorRu;
    settingsChooseLanguage.textContent = "Выберите язык";
    settingsChooseBackground.textContent = "Выберите фон";
    settingsChooseBlock.textContent = "Скрыть блоки";
    settingsQueryForBack.textContent = "Тема фото";
  } else {
    lang = "en-En";
    userName.placeholder = "[Enter name]";
    city.value = "Minsk";
    quote.textContent = quotesArr[currentQuoteNum].text;
    author.textContent = quotesArr[currentQuoteNum].author;
    settingsChooseLanguage.textContent = "Choose language";

    settingsChooseBackground.textContent = "Choose background";
    settingsChooseBlock.textContent = "Hide Blocks";
    settingsQueryForBack.textContent = "Photo Theme";
  }
  getWeather();
  iterateThrewHideBlocks();
}

// Функция задает фоновое изображение  c unsplash
async function getLinkToImageUnsplash(query) {
  bgType = "unsplash";
  console.log(query);
  let url;
  const timeOfDay = getTimeOfDay();
  if (query === "unsplash") {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=Cg7hDCXPJQFQImOWJ8NrSlPzSd9RiN86X1Oi2e5Kx0Q`;
  } else {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${query}&client_id=Cg7hDCXPJQFQImOWJ8NrSlPzSd9RiN86X1Oi2e5Kx0Q`;
  }
  const res = await fetch(url);
  const data = await res.json();
  dataUnsplash = data;
  console.log(data);
  body.style.backgroundImage = `url('${data.urls.raw}')`;
}

// Функция задает фоновое изображение  c flickr
async function getLinkToImageFlickr(query) {
  console.log(query);
  bgType = "flickr";
  let url;
  const timeOfDay = getTimeOfDay();
  if (query === "flickr") {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=78c343d73fb2e3e41644061aeedebf1c&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
  } else {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=78c343d73fb2e3e41644061aeedebf1c&tags=${query}&extras=url_l&format=json&nojsoncallback=1`;
  }

  const res = await fetch(url);
  const data = await res.json();
  dataFlickr = data;
  console.log(data);
  body.style.backgroundImage = `url('${data.photos.photo[0].url_l}')`;
  return dataFlickr;
}

// Добавляем событие на клик кнопки слайдера для перелистывания изображения
slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

// Функция при выборе в настройках откуда брать изображение показывает инпут
function showThemePhotoInput() {
  photoThemeInput.style.display = "block";
}

// Функция при выборе в настройках откуда брать изображение скрывает инпут
function hideThemePhotoInput() {
  photoThemeInput.style.display = "none";
}

// Функция задает тему фото для загрузки из API
function addBgTheme(query) {
  if (bgType === "flickr") {
    getLinkToImageFlickr(query);
  } else {
    getLinkToImageUnsplash(query);
    themeUnsplash = query;
    return themeUnsplash;
  }
}

// Функция скрывает или показывает настройки
function toggleSettingsMenu() {
  settingsMenu.classList.toggle("settings-active");
}

// вешаем событие для того, чтобы при нажатии на иконку настроек появлялось меню
toggleSettingsVisibility.addEventListener("click", toggleSettingsMenu);

// Функция скрывает или показывает аудиоплеер
function togglePlayerVisibility() {
  playerContainer.classList.toggle("hide-block");
}

// Функция скрывает или показывает приветствие
function toggleGreetingVisibility() {
  greetingContainer.classList.toggle("hide-block");
}

// Функция скрывает или показывает время
function toggleTimeVisibility() {
  time.classList.toggle("hide-block");
}

// Функция скрывает или показывает дату
function toggleDateVisibility() {
  date.classList.toggle("hide-block");
}

// Функция скрывает или показывает погоду
function toggleWeatherVisibility() {
  weatherContainer.classList.toggle("hide-block");
}

// Функция скрывает или показывает цитаты
function toggleQuotesVisibility() {
  quotesContainer.classList.toggle("hide-block");
}

// Функция скрывает или показывает туду
function toggleTodoVisibility() {
  todoContainer.classList.toggle("hide-block");
}

let playNow = 0;
let isPlay = false;
let toggleVolume = true;
let playNowName = document.querySelector(".player__currentTrack");
const audioObj = [
  {
    title: "Aqua Caelestis",
    src: "../assets/sounds/Aqua Caelestis.mp3",
    duration: "00:58",
  },
  {
    title: "River Flows In You",
    src: "../assets/sounds/River Flows In You.mp3",
    duration: "03:50",
  },
  {
    title: "Ennio Morricone",
    src: "../assets/sounds/Ennio Morricone.mp3",
    duration: "00:58",
  },
  {
    title: "Summer Wind",
    src: "../assets/sounds/Summer Wind.mp3",
    duration: "03:50",
  },
];

const audioList = document.querySelector(".play-list");

function AddAudioList() {
  let fragmentAudioList = document.createDocumentFragment();
  audioObj.forEach((el) => {
    const li = document.createElement("li");
    li.textContent = el.title;
    li.classList.add("play-item");
    fragmentAudioList.append(li);
  });
  audioList.append(fragmentAudioList);
}
AddAudioList();

const playBtn = document.querySelector(".play-big");
const playNext = document.querySelector(".play-next");
const playPrev = document.querySelector(".play-prev");
const audio = new Audio();

function togglePlay() {
  if (isPlay) {
    stopTrack();
  } else if (!isPlay) {
    playTrack();
  }
}

function stopTrack() {
  isPlay = false;
  playBtn.classList.toggle("pause");
  audio.pause();
}

function playTrack() {
  changeCurrentTrack();
  let trackToPlay = audioObj[playNow].src;
  isPlay = true;
  playBtn.classList.toggle("pause");
  audio.src = `${trackToPlay}`;
  audio.currentTime = 0;
  audio.play();
}

playNext.addEventListener("click", (e) => {
  playNow += 1;

  if (playNow >= audioObj.length) {
    playNow = 0;
  }
  changeCurrentTrack();
  document.querySelector(".item-active").classList.remove("item-active");
  tracksInList[playNow].classList.add("item-active");
  if (isPlay) {
    let trackToPlay = audioObj[playNow].src;
    audio.src = `${trackToPlay}`;
    audio.play();
  } else if (!isPlay) {
    isPlay = true;
    playBtn.classList.toggle("pause");
    let trackToPlay = audioObj[playNow].src;
    audio.src = `${trackToPlay}`;
    audio.play();
  }
});

playPrev.addEventListener("click", (e) => {
  playNow -= 1;
  if (playNow < 0) {
    playNow = audioObj.length - 1;
  }
  changeCurrentTrack();
  document.querySelector(".item-active").classList.remove("item-active");
  tracksInList[playNow].classList.add("item-active");
  if (isPlay) {
    let trackToPlay = audioObj[playNow].src;
    audio.src = `${trackToPlay}`;
    audio.play();
  } else if (!isPlay) {
    isPlay = true;
    playBtn.classList.toggle("pause");
    let trackToPlay = audioObj[playNow].src;
    audio.src = `${trackToPlay}`;
    audio.play();
  }
});

playBtn.addEventListener("click", (e) => {
  e.preventDefault();
  togglePlay();
});

const tracksInList = document.querySelectorAll(".play-item");
tracksInList[0].classList.add("item-active");
// продвинутый плеер
let progressContainer = document.querySelector(".player__progress-contaner");
let playerProgress = document.querySelector(".player__progress");

function updateProgress(e) {
  let CurrentProcent = (e.srcElement.currentTime / e.srcElement.duration) * 100;
  playerProgress.style.width = `${CurrentProcent}%`;
}

audio.addEventListener("timeupdate", updateProgress);

function setProgress(e) {
  let width = this.clientWidth;
  let clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}
progressContainer.addEventListener("click", setProgress);

function changeCurrentTrack() {
  playNowName.textContent = audioObj[playNow].title;
}

//звук продвинутого плеера
let soundProgressContainer = document.querySelector(
  ".sound__progress-container"
);

let soundVolumeBar = document.querySelector(".sound__volume");

let soundVolume = document.querySelector(".sound__volume");

function setVolume(e) {
  let clickX = e.offsetX;
  let width = this.clientWidth;
  if (clickX < 5) {
    toggleVolume = false;
    soundVolumeBar.style.width = 0;
    audio.volume = 0;
    soundImage.src = "./assets/img/sound/soundIsOff.svg";
    return;
  } else if (toggleVolume === false) {
    toggleVolume = true;
    soundImage.src = "./assets/img/sound/soundIsOn.svg";
  }
  audio.volume = clickX / width;
  soundVolumeBar.style.width = `${(clickX / width) * 100}% `;
}

soundProgressContainer.addEventListener("click", setVolume);

let soundImage = document.querySelector(".sound__image");

soundImage.addEventListener("click", (e) => {
  changeSoundImg();
  if (toggleVolume) {
    toggleVolume = false;
    soundVolumeBar.style.width = 0;
    audio.volume = 0;
  } else {
    toggleVolume = true;
    soundVolumeBar.style.width = `50%`;
    audio.volume = 0.5;
  }
});

function changeSoundImg() {
  toggleVolume
    ? (soundImage.src = "./assets/img/sound/soundIsOff.svg")
    : (soundImage.src = "./assets/img/sound/soundIsOn.svg");
}

// отображение времени воспроизвдения
let timeShow = document.querySelector(".time-show");
let minutes = 0;

let timerTrack = setTimeout(function tickTrackTime() {
  minutes = Math.floor(audio.currentTime / 60);
  timeShow.textContent = `${
    String(minutes).padStart(2, "0") || "00"
  } : ${String(Math.floor(audio.currentTime % 60)).padStart(2, "0")}`;
  timerId = setTimeout(tickTrackTime, 1000); // (*)
}, 1000);

// переключение треков по завершении проигрывания

audio.addEventListener("ended", () => {
  playNow += 1;
  if (playNow >= audioObj.length) {
    playNow = 0;
  }
  changeCurrentTrack();
  document.querySelector(".item-active").classList.remove("item-active");
  tracksInList[playNow].classList.add("item-active");
  if (isPlay) {
    let trackToPlay = audioObj[playNow].src;
    audio.src = `${trackToPlay}`;
    audio.play();
  } else if (!isPlay) {
    isPlay = true;
    playBtn.classList.toggle("pause");
    let trackToPlay = audioObj[playNow].src;
    audio.src = `${trackToPlay}`;
    audio.play();
  }
});
