import { flsModules } from "./modules.js"
import axios from "axios"

document.addEventListener('DOMContentLoaded', () => {
	const forms = document.querySelectorAll('.form')
	if (forms.length === 0) return
	forms.forEach(form => {
		// Перша форма
		const firstFormTitle = form.querySelector('[data-first-form-title]')
		const firstFormName = form.querySelector('[data-first-form-name]')
		const firstFormEmail = form.querySelector('[data-first-form-email]')
		const firstFormMessage = form.querySelector('[data-first-form-message]')
		const firstFormSend = form.querySelector('[data-first-form-send]')

		// Друга  форма
		const secondFormTitle = form.querySelector('[data-second-form-title]')
		const secondFormName = form.querySelector('[data-second-form-name]')
		const secondFormEmail = form.querySelector('[data-second-form-email]')
		const secondFormMessage = form.querySelector('[data-second-form-message]')
		const secondFormSend = form.querySelector('[data-second-form-send]')


		// Валідація email
		const requiredMask = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,8})+$/

		// Масиви форм, куди йдуть зібрані дані
		let dataFirstForm = []
		let dataSecondForm = []


		// Валідація форми
		function validationFirstForm() {
			if (firstFormName && firstFormEmail && firstFormMessage) {
				const userFirstNameValue = firstFormName.value;
				const userFirstEmailValue = firstFormEmail.value;
				const userFirstMessageValue = firstFormMessage.value;
				const subjectFirstForm = firstFormTitle ? firstFormTitle.value : '';
				toggleErrorClass(firstFormName, userFirstNameValue.length === 0);
				toggleErrorClass(firstFormEmail, userFirstEmailValue.length === 0 || !validateEmail(userFirstEmailValue));
				toggleErrorClass(firstFormMessage, userFirstMessageValue.length === 0);
				if (userFirstNameValue.length > 0 && userFirstMessageValue.length > 0 && validateEmail(userFirstEmailValue)) {
					dataFirstForm['name'] = userFirstNameValue;
					dataFirstForm['email'] = userFirstEmailValue;
					dataFirstForm['message'] = userFirstMessageValue;
					dataFirstForm['mail-title'] = subjectFirstForm;
					getMailTitle(dataFirstForm);
					chatSubmit(dataFirstForm, [firstFormName, firstFormEmail, firstFormMessage]);
				}
			}
		}
		function validationSecondForm() {
			if (secondFormName && secondFormEmail && secondFormMessage) {
				const userSecondNameValue = secondFormName.value;
				const userSecondEmailValue = secondFormEmail.value;
				const userSecondMessageValue = secondFormMessage.value;
				const subjectSecondForm = secondFormTitle ? secondFormTitle.value : '';

				toggleErrorClass(secondFormName, userSecondNameValue.length === 0);
				toggleErrorClass(secondFormEmail, userSecondEmailValue.length === 0 || !validateEmail(userSecondEmailValue));
				toggleErrorClass(secondFormMessage, userSecondMessageValue.length === 0);
				if (userSecondNameValue.length > 0 && userSecondMessageValue.length > 0 && validateEmail(userSecondEmailValue)) {
					dataSecondForm['name'] = userSecondNameValue;
					dataSecondForm['email'] = userSecondEmailValue;
					dataSecondForm['message'] = userSecondMessageValue;
					dataSecondForm['mail-title'] = subjectSecondForm;
					getMailTitle(dataSecondForm);
					chatSubmit(dataSecondForm, [secondFormName, secondFormEmail, secondFormMessage]);
				}
			}
		}

		// Заголовок сторінки
		function getMailTitle(targetArray) {
			const emailSubject = document.querySelector('#subject')
			const emailSubjectValue = emailSubject.value
			targetArray['subject'] = emailSubjectValue
		}
		// Валідація Email
		function validateEmail(email) {
			return requiredMask.test(email)
		}
		// Додавання класу  _form-error для батька інпута 
		function toggleErrorClass(element, condition) {
			if (condition) { element.parentElement.classList.add('_form-error') }
			else { element.parentElement.classList.remove('_form-error') }
		}

		// Відправка форми
		async function chatSubmit(currentData, inputsArr) {
			const formData = new FormData()
			for (const [key, value] of Object.entries(currentData)) {
				formData.append(key, value)
			}
			form ? form.classList.add('_sending') : null
			try {
				const response = await axios.post('../files/sendmail/sendmail.php', formData)
				for (let input of inputsArr) {
					input.value = ''
				}
				form ? form.classList.remove('_sending') : null
				const inputsActive = document.querySelectorAll('._input-active')
				if (inputsActive.length > 0) inputsActive.forEach(input => input.classList.remove('_input-active'))
			} catch (error) {
				form ? form.classList.remove('_sending') : null
			}
		}
		if (firstFormSend) firstFormSend.addEventListener("click", validationFirstForm);
		if (secondFormSend) secondFormSend.addEventListener("click", validationSecondForm);
	});
})



