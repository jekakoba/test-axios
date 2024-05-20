import { flsModules } from "./modules.js"
import axios from "axios"

document.addEventListener('DOMContentLoaded', () => {
	const forms = document.querySelectorAll('.form')
	if (forms.length === 0) return
	forms.forEach(form => {
		// Заголовки форм
		const firstFormTitle = form.querySelector('[data-first-form-title]')
		// const secondFormTitle = form.querySelector('[data-second-form-title]')

		// Перша форма
		const firstFormName = form.querySelector('[data-first-form-name]')
		const firstFormEmail = form.querySelector('[data-first-form-email]')
		const firstFormMessage = form.querySelector('[data-first-form-message]')
		const firstFormSend = form.querySelector('[data-first-form-send]')

		// Друга  форма
		// const secondFormName = form.querySelector('[data-second-form-name]')
		// const secondFormEmail = form.querySelector('[data-second-form-email]')
		// const secondFormMessage = form.querySelector('[data-second-form-message]')
		// const secondFormSend = form.querySelector('[data-second-form-send]')


		// Валідація email
		const requiredMask = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,8})+$/
		let dataFirstForm = []



		function validationFirstForm() {
			if (firstFormName && firstFormEmail && firstFormMessage) {
				const userFirstNameValue = firstFormName.value;
				const userFirstNameValueEmailValue = firstFormEmail.value;
				const userFirstNameValueMessage = firstFormMessage.value;
				const subjectFirstForm = firstFormTitle ? firstFormTitle.value : '';

				toggleErrorClass(firstFormName, userFirstNameValue.length === 0);
				toggleErrorClass(firstFormEmail, userFirstNameValueEmailValue.length === 0 || !validateEmail(userFirstNameValueEmailValue));
				toggleErrorClass(firstFormMessage, userFirstNameValueMessage.length === 0);

				if (userFirstNameValue.length > 0 && userFirstNameValueMessage.length > 0 && validateEmail(userFirstNameValueEmailValue)) {
					dataFirstForm['name'] = userFirstNameValue;
					dataFirstForm['email'] = userFirstNameValueEmailValue;
					dataFirstForm['mail-title'] = subjectFirstForm;
					getMailTitle(dataFirstForm);

					chatSubmit(dataFirstForm, [firstFormName, firstFormEmail, firstFormMessage]);
				}
			}
		}


		function getMailTitle(targetArray) {
			const emailSubject = document.querySelector('#subject')
			const emailSubjectValue = emailSubject.value
			targetArray['subject'] = emailSubjectValue
		}

		function validateEmail(email) {
			return requiredMask.test(email)
		}

		function toggleErrorClass(element, condition) {
			if (condition) { element.parentElement.classList.add('_form-error') }
			else { element.parentElement.classList.remove('_form-error') }
		}


		async function chatSubmit(currentData, inputsArr) {
			const formData = new FormData()
			for (const [key, value] of Object.entries(currentData)) {
				formData.append(key, value)
			}
			form ? form.classList.add('_sending') : null
			// formPopup ? formPopup.classList.add('_sending') : null
			try {

				const response = await axios.post('../files/sendmail/sendmail.php', formData)
				for (let input of inputsArr) {
					input.value = ''
				}
				form ? form.classList.remove('_sending') : null
				// formPopup ? formPopup.classList.remove('_sending') : null

				// if (suceessSelectorPopup) {
				// 	flsModules.popup.open(suceessSelectorPopup)
				// }
			} catch (error) {
				form ? form.classList.remove('_sending') : null
				// formPopup ? formPopup.classList.remove('_sending') : null
				// console.error(error)
			}
		}
		if (firstFormSend) firstFormSend.addEventListener("click", validationFirstForm);
	});
})



