import axios from "axios";
import { flsModules } from "./modules.js"
document.addEventListener('DOMContentLoaded', () => {
	const forms = document.querySelectorAll('.form');
	if (forms.length === 0) return;
	forms.forEach(form => {
		const formTitleInput = form.querySelector('[data-form-title]');
		const nameInput = form.querySelector('[data-form-name]');
		const emailInput = form.querySelector('[data-form-email]');
		const messageInput = form.querySelector('[data-form-message]');
		const formSendButton = form.querySelector('[data-form-send]');
		let formData = {};
		const requiredMask = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,8})+$/;
		function validateForm() {
			const userNameValue = nameInput.value;
			const userEmailValue = emailInput.value;
			const userMessageValue = messageInput.value;
			const subject = formTitleInput ? formTitleInput.value : '';
			toggleErrorClass(nameInput, userNameValue.length === 0);
			toggleErrorClass(emailInput, userEmailValue.length === 0 || !validateEmail(userEmailValue));
			toggleErrorClass(messageInput, userMessageValue.length === 0);
			if (userNameValue.length > 0 && userMessageValue.length > 0 && validateEmail(userEmailValue)) {
				formData['name'] = userNameValue;
				formData['email'] = userEmailValue;
				formData['message'] = userMessageValue;
				formData['mail-title'] = subject;
				getMailTitle(formData);
				chatSubmit(formData, [nameInput, emailInput, messageInput]);
			}
		}
		function validateEmail(email) {
			return requiredMask.test(email);
		}
		function toggleErrorClass(element, condition) {
			if (condition) {
				element.parentElement.classList.add('_form-error');
			} else {
				element.parentElement.classList.remove('_form-error');
			}
		}
		function getMailTitle(targetArray) {
			const emailSubject = document.querySelector('#subject');
			const emailSubjectValue = emailSubject.value;
			targetArray['subject'] = emailSubjectValue;
		}
		async function chatSubmit(currentData, inputsArr) {
			const formData = new FormData();
			for (const [key, value] of Object.entries(currentData)) {
				formData.append(key, value);
			}
			form ? form.classList.add('_sending') : null;
			try {
				const response = await axios.post('../files/sendmail/sendmail.php', formData);
				for (let input of inputsArr) {
					input.value = '';
				}
				form ? form.classList.remove('_sending') : null;
				const inputsActive = document.querySelectorAll('._input-active');
				if (inputsActive.length > 0) inputsActive.forEach(input => input.classList.remove('_input-active'));
			} catch (error) {
				form ? form.classList.remove('_sending') : null;
			}
		}
		if (formSendButton) {
			formSendButton.addEventListener("click", validateForm);
		}
	});
});
