// "use strict"

// const { response } = require('express')

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

	fetch("http://localhost:3000/offers", {
		method: 'GET',
		headers: {"Content-Type" : "application/json"}
	}).then(response => response.json())
		.then(data => {
			data.forEach(offer => {
				const {src, alt, descr, discount, sell, title} = offer
				new OfferMenu(src,alt,title,descr,discount,sell,'.offers-items').render()
			})
		})

	//Class 2-part
	class MenuItem {
		constructor(src, alt, title, sale, descr, parentSelector){
			this.src = src
			this.alt = alt
			this.title = title
			this.sale = sale
			this.descr = descr
			this.parent = document.querySelector(parentSelector)
		}

		formatToUSD() {
			this.sale = this.sale.toLocaleString("en-US", {style:"currency", currency:"USD"})
		}

		renderText(){
			const element = document.createElement('div')
			element.classList.add('menu-item')
			element.innerHTML = `
              <img src="${this.src}" alt="${this.alt}">
              <div>
                <h3>${this.title} <span class="primary-text">$${this.sale}</span></h3>
                <p>${this.descr}</p>
							</div>
			`

			this.parent.append(element)
		}
	}

	fetch('http://localhost:3000/menuItemLeft', {
		method: "GET",
		headers: {"Content-Type" : "application/json"}
	}).then(response => response.json()).then(data => {
		data.forEach(menuItem =>{
			const {src, alt,title, descr, sale} = menuItem
			new MenuItem(src,alt,title,sale, descr,'.menu-items-left').renderText()
		})
	})   // Menu-Items-Left

	fetch('http://localhost:3000/menuItemRight', {
		method: "GET",
		headers: {"Content-Type" : "application/json"}
	}).then(response => response.json()).then(data => {
		data.forEach(menuItem =>{
			const {src, alt,title, descr, sale} = menuItem
			new MenuItem(src,alt,title,sale, descr,'.menu-items-right').renderText()
		})  //Menu-Items-Right
	})

	
	//Class 3-part
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

	fetch('http://localhost:3000/dayTimes', {
		method: "GET",
		headers: {"Content-Type" : "application/json"}
	}).then(response => response.json()).then(data => {
		data.forEach(dayTime =>{
			const {src, alt,title, descr} = dayTime
			new DayTime(src,alt,title,descr,'.daytime-items').renderPhoto()
		})
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

	//Slider
	const slides = document.querySelectorAll('.offer__slide'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesInner = document.querySelector('.offer__slide-inner'),
		width = window.getComputedStyle(slidesWrapper).width

	let slideIndex = 1,
		offset = 0

	if (slides.length < 10){
		total.textContent = `0${slides.length}`
		current.textContent = `0${slideIndex}`
	}else {
		total.textContent = slides.length
		current.textContent = slideIndex
	}

	slidesInner.style.width = 100 * slides.length + '%'
	slidesInner.style.display = 'flex'
	slidesInner.style.transition = 'all .5s ease'
	slidesWrapper.style.overflow = 'hidden'

	slides.forEach(slide => {
		slide.style.width = width
	})

	next.addEventListener('click', () => {
		if (offset === +width.slice(0, width.length - 2)* (slides.length - 1)){
			offset = 0
		}else {
			offset += +width.slice(0, width.length - 2)
		}

		slidesInner.style.transform = `translateX(-${offset}px)`

		if (slideIndex === slides.length) {
			slideIndex = 1
		}else {
			slideIndex ++
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`
		}else {
			current.textContent = slideIndex
		}
	})

	prev.addEventListener('click', () => {
		if (offset === 0){
			offset = +width.slice(0, width.length - 2)* (slides.length - 1)
		}else {
			offset -= +width.slice(0, width.length - 2)
		}

		slidesInner.style.transform = `translateX(-${offset}px)`

		if (slideIndex === 1) {
			slideIndex = slides.length
		}else {
			slideIndex --
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`
		}else {
			current.textContent = slideIndex
		}
	})

	// showSlides(slideIndex)

	// if (slides.length < 10){
	// 	total.textContent = `0${slides.length}`
	// }else {
	// 	total.textContent = slides.length
	// }

	// function showSlides(index){
	// 	if(index > slides.length) {
	// 		slideIndex = 1
	// 	}
	// 	if (index < 1){
	// 		slideIndex = slides.length
	// 	}

	// 	slides.forEach(slide => slide.style.display = 'none')

	// 	slides[slideIndex - 1].style.display = 'block'
	
	// 	if (slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`
	// 	}else {
	// 		current.textContent = slideIndex
	// 	}
	// }

	// function moveSlides(index){
	// 	showSlides(slideIndex += index)
	// }

	// prev.addEventListener('click', ()=> {
	// 	moveSlides(-1)
	// })
	// next.addEventListener('click', ()=> {
	// 	moveSlides(1)
	// })
})
