window.addEventListener('DOMContentLoaded',() => {
	//Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabContents = document.querySelectorAll('.tab_content'),
		tabParents = document.querySelector('.tabheader__items')

		function hideTabContentds() {
			tabContents.forEach(tabContent => {
				tabContent.classList.add('hide')
			})

			tabs.forEach(tab => {
				tab.classList.remove('tabheader__item_active')
			})
			
		}

		function showTabContent(index = 0) {
			tabContents[index].classList.add('show', 'fade')
			tabContents[index].classList.remove('hide')
			tabs[index].classList.add('tabheader__item_active')
		}

		hideTabContentds()
		showTabContent()

		tabParents.addEventListener('click', (event) => {
			const target = event.target

			if (target && target.classList.contains('tabheader__item')) {
				tabs.forEach((tab , index) => {
					if (target === tab) {
						hideTabContentds()
						showTabContent(index)
					}
				})
			}
		})

	//Loaders
	const loaderWrapper = document.querySelector('.loader-wrapper')

	setTimeout(() =>{
		loaderWrapper.style.display = 'none'
	}, 1500)

	//Timer

	const deadLine = '2025-10-10'

	function getTimeRemaining(endTime) {
		const time = Date.parse(endTime) - Date.parse(new Date)

		let days, hours, minutes, seconds

		if (time <= 0) {
			days = 0,
			hours = 0,
			minutes = 0,
			seconds = 0
		}else {
			days = Math.floor(time / (1000*60*60*24)),
			hours = Math.floor(time / (1000*60*60) %24),
			minutes = Math.floor(time / (1000*60) %60),
			seconds = Math.floor(time / (1000) %60)
		}
			
			return {
				totalTime: time,
				days,
				hours,
				minutes,
				seconds,
			}
		}

	function formatNumber(number) {
		if (number >=0 && number < 10){
			return `0${number}`
		}else {
			return number
		}
	}
			
	function setClock(selector, endTime) {
		const timer = document.querySelector(selector)

			days = timer.querySelector('#days')
			hours = timer.querySelector('#hours')
			minutes = timer.querySelector('#minutes')
			seconds = timer.querySelector('#seconds')
			timeInterval = setInterval(updateClock, 1000)
			
		updateClock()

			function updateClock() {
				const time = getTimeRemaining(endTime)
				
				days.textContent = formatNumber(time.days)
				hours.textContent = formatNumber(time.hours)
				minutes.textContent = formatNumber(time.minutes)
				seconds.textContent = formatNumber(time.seconds)
				
				if (time.totalTime <= 0 ) {
					clearInterval(timeInterval)
				}
			}
		}

	setClock('.timer', deadLine)

	//Modal

	const modalOpenBtns = document.querySelectorAll("[data-modal]"),
		modal = document.querySelector(".modal"),
		modalCloseBtn = document.querySelector('[data-modal-close]'),
		modalContent = document.querySelector('.modal__content')
	
		function openModal() {
			modalContent.classList.add("modal_fade")
			modal.classList.add("show")
			modal.classList.remove("hide")
			document.body.style.overflow = 'hidden'
			clearInterval(modalTimeId)
		}

		function closeModal() {
			modal.classList.add("hide")
			modal.classList.remove("show")
			document.body.style.overflow = ''

		}

	modalOpenBtns.forEach(btn => {
		btn.addEventListener("click", openModal)
	})

	modalCloseBtn.addEventListener('click', closeModal)

	modal.addEventListener('click', (event) => {
		if (event.target === modal) {
			closeModal()
		}
	})

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal()
		}
	})

	const modalTimeId = setTimeout(openModal, 5000)
})
