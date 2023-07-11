const weddingDate = new Date("2023-08-05T00:00:00")
const daysElement = document.querySelector(".days")
const hoursElement = document.querySelector(".hours")
const minutesElement = document.querySelector(".minutes")
const secondsElement = document.querySelector(".seconds")

function updateTimer() {
	const currentTime = new Date()
	const timeRemaining = weddingDate - currentTime

	const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
	const hours = Math.floor(
		(timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	)
	const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

	daysElement.textContent = days
	hoursElement.textContent = hours
	minutesElement.textContent = minutes
	secondsElement.textContent = seconds
}

updateTimer()
setInterval(updateTimer, 1000)

const swiper = new Swiper(".swiper-container", {
	direction: "horizontal",
	loop: false,
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	}
})

document.querySelector(".next-page-button").addEventListener("click", () => {
	swiper.slideNext()
})

document.querySelector(".prev-page-button").addEventListener("click", () => {
	swiper.slidePrev()
})

const champagneCheckbox = document.getElementById("champagne")
const champagneSuboptions = document.getElementById("champagne-suboptions")

champagneCheckbox.addEventListener("change", () => {
	if (champagneCheckbox.checked) {
		champagneSuboptions.classList.remove("hidden")
	} else {
		champagneSuboptions.classList.add("hidden")
	}
})

document.getElementById("wine").addEventListener("change", event => {
	const wineSuboptions = document.getElementById("wine-suboptions")
	if (event.target.checked) {
		wineSuboptions.classList.remove("hidden")
	} else {
		wineSuboptions.classList.add("hidden")
	}
})

document.addEventListener("DOMContentLoaded", function () {
	const wineCheckbox = document.getElementById("wine")
	const champagneCheckbox = document.getElementById("champagne")

	wineCheckbox.addEventListener("change", function () {
		if (!this.checked) {
			const wineSuboptions = document.querySelectorAll(
				'[name="wine_color[]"], [name="wine_type[]"]'
			)
			wineSuboptions.forEach(function (suboption) {
				suboption.checked = false
			})
		}
	})

	champagneCheckbox.addEventListener("change", function () {
		if (!this.checked) {
			const champagneSuboptions = document.querySelectorAll(
				'[name="cham_type[]"]'
			)
			champagneSuboptions.forEach(function (suboption) {
				suboption.checked = false
			})
		}
	})
})

// Получаем чекбокс "Не буду пить алкоголь"
const noDrinkCheckbox = document.querySelector('input[name="non_drink[]"]')

// Получаем все алкогольные варианты
const alcoholOptions = document.querySelectorAll(
	'input[name="cham[]"], input[name="cham_type[]"], input[name="wine[]"], input[name="wine_color[]"], input[name="wine_type[]"], input[name="spirits[]"]'
)

// Получаем подпункты вина и шампанского
const wineSuboptions = document.getElementById("wine-suboptions")

// Добавляем слушатель событий к чекбоксу "Не буду пить алкоголь"
noDrinkCheckbox.addEventListener("change", () => {
	// Отключаем или включаем алкогольные варианты, основываясь на статусе чекбокса "Не буду пить алкоголь"
	// и снимаем выбор, если чекбокс "Не буду пить алкоголь" отмечен
	alcoholOptions.forEach(option => {
		option.disabled = noDrinkCheckbox.checked
		if (noDrinkCheckbox.checked) {
			option.checked = false
		}
	})

	// Если чекбокс "Не буду пить алкоголь" отмечен, скрываем подпункты вина и шампанского
	if (noDrinkCheckbox.checked) {
		wineSuboptions.classList.add("hidden")
		champagneSuboptions.classList.add("hidden")
	}
	// В противном случае, возвращаем подпункты вина и шампанского, только если основной пункт отмечен
	else {
		if (document.querySelector('input[name="wine[]"]').checked) {
			wineSuboptions.classList.remove("hidden")
		}
		if (document.querySelector('input[name="cham[]"]').checked) {
			champagneSuboptions.classList.remove("hidden")
		}
	}
})

// Открытие модального окна
document
	.getElementById("open-modal-btn")
	.addEventListener("click", function () {
		document.getElementById("modal").classList.add("active")
	})

// Закрытие модального окна
document.addEventListener("click", function (event) {
	if (
		event.target.id === "close-modal-btn" ||
		event.target.classList.contains("modal")
	) {
		document.getElementById("modal").classList.remove("active")
	}
})

// Отправка формы и обработка успешной отправки
document.querySelector("form").addEventListener("submit", async function (e) {
	e.preventDefault()
	const fullnameInput = document.querySelector("#fullnameInput")
	const fullname = fullnameInput.value
	const nameError = document.querySelector("#nameError")

	if (fullname.length < 2) {
		// Показываем сообщение об ошибке и выделяем текстовое поле красным
		nameError.classList.remove("hidden")
		fullnameInput.classList.add("error")
		fullnameInput.focus()
		return
	} else {
		// Скрываем сообщение об ошибке и убираем выделение текстового поля
		nameError.classList.add("hidden")
		fullnameInput.classList.remove("error")
	}
	var formData = new FormData(this)

	try {
		const response = await fetch("send_comment_tg.php", {
			method: "POST",
			body: formData
		})

		const data = await response.text()

		// Скрываем содержимое модального окна и отображаем сообщение об успешной отправке
		const modalContent = document.querySelector(".modal-content")
		modalContent.innerHTML =
			'<span id="close-modal-btn" class="close">&times;</span><p>Ваш выбор успешно отправлен!</p>'
	} catch (error) {
		console.error("Error:", error)
	}
})

// Owl

