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
		// modalCloseBtn = document.querySelector('[data-modal-close]'),
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

	// modalCloseBtn.addEventListener('click', closeModal)

	modal.addEventListener('click', (event) => {
		if (event.target === modal || event.target.getAttribute('data-modal-close') === '' ){
			closeModal()
		}
	})

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal()
		}
	})

	const modalTimeId = setTimeout(openModal, 50000)

	//Class 1-part
	class OfferMenu {
		constructor(src, alt, title, descr, discount, sell, parentSelector){
			this.src = src
			this.alt = alt
			this.title = title
			this.descr = descr
			this.discount = discount
			this.sell = sell
			this.parent = document.querySelector(parentSelector)
			this.formatToUSD()
		}

		formatToUSD() {
			this.discount = this.discount.toLocaleString("en-US", {style:"currency", currency:"USD"})
			this.sell = this.sell.toLocaleString("en-US", {style:"currency", currency:"USD"})
		}
		render () {
			const element = document.createElement("div")
			element.innerHTML = `
          <img src="${this.src}" alt="${this.alt}">
          <div>
            <h3>${this.title}</h3>
            <p>${this.descr}<p>
            <p><del>${this.discount}</del> <span class="primary-text">${this.sell}</span></p>
          </div>
        `
			
				this.parent.append(element)
		}
	}

const offers = [
	{
		src: "./img/offer1.png",
		alt: 'Quattro Pasta',
		title: 'Quattro Pasta',
		descr: 'Quattro Pasta is a delicious and easy-to-make pasta dish that is perfect',
		discount: 20,
		sell: 5,
	},
	{
		src: "./img/offer2.png",
		alt: 'Vegertarian Pasta',
		title: 'Vegertarian Pasta',
		descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
		discount: 30,
		sell: 15,
	},
	{
		src: "./img/offer3.png",
		alt: 'Gluten-Free Pasta',
		title: 'Gluten-Free Pasta',
		descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
		discount: 100,
		sell: 50,
	}
]

offers.forEach(offer => {
	const {src, alt, descr, discount, sell, title} = offer
	new OfferMenu(src,alt,title,descr,discount,sell,'.offers-items').render()
})

// new OfferMenu(
// 		"./img/offer1.png",
// 		'Quattro Pasta',
// 		'Quattro Pasta',
// 		'Quattro Pasta is a classic Italian dish made with four types of pasta, including spaghetti',
// 		20,  10,
// 		".offers-items"
// 	).render()

// new OfferMenu(
// 		"./img/offer2.png",
// 		'Vegertarian Pasta',
// 		'Vegertarian Pasta',
// 		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
// 		60, 25,
// 		".offers-items"
// 	).render()
// new OfferMenu(
// 		"./img/offer3.png",
// 		'Gluten-Free Pasta',
// 		'Gluten-Free Pasta',
// 		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
// 		100, 50,
// 		".offers-items"
// 	).render()


	//Class 2-part
	class DayTime {
		constructor(src, alt, title, descr, parentSelector) {
			this.src = src
			this.alt = alt
			this.title = title
			this.descr = descr
			this.parent = document.querySelector(parentSelector)
		}

		renderPhoto(){
			const element = document.createElement("div")
			element.innerHTML= `
				<img src="${this.src}" alt="${this.alt}">
        <h3>${this.title}</h3>
        <p>${this.descr}</p>
			`

			this.parent.append(element)
		}
	}

	const dayTimes = [
		{
			src: './img/breckfastIcon.png',
			alt: 'Breakfast',
			title: 'Breakfast',
			descr: '8:00 am to 10:00 am',
		},
		{
			src: './img/lunchIcon.png',
			alt: 'Lunch',
			title: 'Lunch',
			descr: '4:00 pm to 7:00 pm',
		},
		{
			src: './img/dinnerIcon.png',
			alt: 'Dinner',
			title: 'Dinner',
			descr: '9:00 pm to 1:00 Am',
		},
		{
			src: './img/dessertIcon.png',
			alt: 'Dessert',
			title: 'Dessert',
			descr: 'All day',
		},
	]

	dayTimes.forEach(dayTime =>{
		const {src, alt,title, descr} = dayTime
		new DayTime(src,alt,title,descr,'.daytime-items').renderPhoto()
	})

	//FORMS

	const form = document.querySelector("form"),
		telegramTokenBot = '7631856448:AAH4XbQe4-0ehm0YeJw-_Bkjsf-WREf7yVY',
		chatId = '6229059361'

	const message = {
		loading: 'Loading ...',
		success: 'Thanking for contacting with us',
		failure: 'Something went wrong'
	}

	form.addEventListener('submit', (event) =>{
		event.preventDefault()

		const loader = document.createElement('div')
		loader.classList.add("loader")
		loader.style.width = '20px'
		loader.style.height = '20px'
		loader.style.marginTop = '20px'
		form.append(loader)

		const formData = new FormData(form)

		const object = {}
		formData.forEach((value, key) =>{
			object[key] = value
		})

		fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
			 method: 'POST',
			 headers: {"Content-Type": 'application/json'},
			 body: JSON.stringify({
				chat_id: chatId,
				text: `
					Name: ${object.name}, 
					Phone: ${object.phone}`, 
			 })
		}).then(() => {
			showStatusMessage(message.success)
			form.reset()
		}).catch(() => {
			showStatusMessage(message.failure)
		}).finally (() => loader.remove())
	})

	function showStatusMessage (message) {
		const modalDialog = document.querySelector('.modal__dialog')

		modalDialog.classList.add('hide')
		openModal()

		const statusModal = document.createElement('div')
		statusModal.classList.add('modal__dialog')
		statusModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">&times;</div>
				<div data-modal class="modal__title">${message}</div>
			</div>
		`

		document.querySelector('.modal').append(statusModal)

		setTimeout(() => {
			statusModal.remove()
			modalDialog.classList.remove('hide')
			closeModal()
		}, 3000)
	}
})
