import { flsModules } from "./modules.js"
import axios from "axios"

document.addEventListener('DOMContentLoaded', () => {


	const forms = document.querySelectorAll('.form')
	if (forms.length === 0) return
	forms.forEach(form => {
		const suceessSelectorPopup = form.getAttribute('data-success-popup')
		const formPopup = form.querySelector('.content__form')

		// Форма в попапі Our platform
		const formOurPlatformEmail = form.querySelector('[data-form-our-platform]')
		const formOurPlatformSubmit = form.querySelector('[data-form-our-platform-submit]')
		const subjectFormOurPlatform = form.querySelector(' [data-mail-title-our-platform]')



		// Форма у футері
		const formFooterName = form.querySelector('[data-form-footer-name]')
		const formFooterEmail = form.querySelector('[data-form-footer-email]')
		const formFooterMessage = form.querySelector('[data-form-footer-message]')
		const formFooterSubmit = form.querySelector('[data-form-footer-submit]')


		const subjectFormFooter = form.querySelector('[data-mail-title-footer]')
		const subjectFormPopup = form.querySelector('[data-mail-title-popup]')



		// Форма у попапі
		const formQuestionsName = form.querySelector('[data-form-questions-name]')
		const formQuestionsEmail = form.querySelector('[data-form-questions-email]')
		const formQuestionsSubmit = form.querySelector('[data-form-questions-submit]')


		// Форма в блоці  Not sure which expert you need?
		const formExpertNeedEmail = form.querySelector('[data-form-expert-need-email]')
		const formExpertNeedSubmit = form.querySelector('[data-form-expert-need-submit ')
		const subjectExpertNeed = form.querySelector(' [data-mail-title-expert-need]')


		const buttonFinish = form.querySelector('[data-finish]');
		// const buttonFinish = parentPopup ? parentPopup.querySelector('[data-finish]') : null


		const formCVBlock = form.querySelector(' [data-form-cv-content]')
		const cvBlock = form.querySelector(' [data-cv-content]')


		// Попап форми з питаннями
		// const popupFormQuestions = document.querySelector('#popup-question')
		const requiredMask = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,8})+$/

		let dataFooterForm = []
		let dataOurPlatformForm = []
		let dataExpertNeedForm = []


		// Валідація форми в розділі КОНТАКТИ

		function validationFooterForm() {
			if (formFooterName && formFooterEmail && formFooterMessage) {
				const userFooterNameValue = formFooterName.value
				const userFooterEmailValue = formFooterEmail.value
				const userFooterMessage = formFooterMessage.value
				const userSubjectFormFooter = subjectFormFooter.value

				toggleErrorClass(formFooterName, userFooterNameValue.length === 0)
				toggleErrorClass(formFooterEmail, userFooterEmailValue.length === 0 || !validateEmail(userFooterEmailValue))

				if (formFooterName && validateEmail(userFooterEmailValue)) {
					dataFooterForm['Name'] = userFooterNameValue
					dataFooterForm['Email'] = userFooterEmailValue
					dataFooterForm['mail-title'] = userSubjectFormFooter
					getMailTitle(dataFooterForm)
					if (formFooterMessage) {
						dataFooterForm['Message'] = userFooterMessage
					}

					chatSubmit(dataFooterForm, [formFooterName, formFooterEmail, formFooterMessage])
				}
			}
		}

		function validationQuestionsForm() {
			if (formQuestionsName && formQuestionsEmail) {
				const userQuestionNameValue = formQuestionsName.value
				const userQuestionEmailValue = formQuestionsEmail.value
				const userSubjectFormPopup = subjectFormPopup.value
				toggleErrorClass(formQuestionsName, userQuestionNameValue.length === 0)
				toggleErrorClass(formQuestionsEmail, userQuestionEmailValue.length === 0 || !validateEmail(userQuestionEmailValue))
				if (userQuestionNameValue && validateEmail(userQuestionEmailValue)) {
					dataInputs['mail-title'] = userSubjectFormPopup
					dataInputs['Name'] = userQuestionNameValue
					dataInputs['Email'] = userQuestionEmailValue
					getMailTitle(dataInputs)
					chatSubmit(dataInputs, [formQuestionsName, formQuestionsEmail])
					if (cvBlock && formCVBlock) {
						formCVBlock.hidden = true;
						cvBlock.hidden = false;
					}

				}
			}
		}

		// Валідація форми в попапі Our platform
		function validationOurPlatformForm() {
			if (formOurPlatformEmail) {
				const userOurPlatformEmailValue = formOurPlatformEmail.value
				const userSubjectOurPlatformValue = subjectFormOurPlatform.value
				toggleErrorClass(formOurPlatformEmail, userOurPlatformEmailValue.length === 0 || !validateEmail(userOurPlatformEmailValue))
				if (validateEmail(userOurPlatformEmailValue)) {
					dataOurPlatformForm['Email'] = userOurPlatformEmailValue
					dataOurPlatformForm['mail-title'] = userSubjectOurPlatformValue
					getMailTitle(dataOurPlatformForm)
					chatSubmit(dataOurPlatformForm, [formOurPlatformEmail])
				}
			}
		}


		// Валідація форми в блоці Not sure which expert you need?
		function validationNeedExpertForm() {
			if (formExpertNeedEmail) {
				const expertNeedEmail = formExpertNeedEmail.value
				const subjectExpertNeedValue = subjectExpertNeed.value
				toggleErrorClass(formExpertNeedEmail, expertNeedEmail.length === 0 || !validateEmail(expertNeedEmail))
				if (validateEmail(expertNeedEmail)) {
					dataExpertNeedForm['Email'] = expertNeedEmail
					dataExpertNeedForm['mail-title'] = subjectExpertNeedValue
					getMailTitle(dataExpertNeedForm)
					chatSubmit(dataExpertNeedForm, [formExpertNeedEmail])
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
			formPopup ? formPopup.classList.add('_sending') : null
			try {

				const response = await axios.post('../files/sendmail/sendmail.php', formData)
				for (let input of inputsArr) {
					input.value = ''
				}
				if (buttonFinish && buttonFinish.hasAttributes('disabled')) {
					buttonFinish.removeAttribute('disabled')
				}
				form ? form.classList.remove('_sending') : null
				formPopup ? formPopup.classList.remove('_sending') : null

				if (suceessSelectorPopup) {
					flsModules.popup.open(suceessSelectorPopup)
				}
			} catch (error) {
				form ? form.classList.remove('_sending') : null
				formPopup ? formPopup.classList.remove('_sending') : null
				console.error(error)
			}
		}
		if (formQuestionsSubmit) formQuestionsSubmit.addEventListener("click", getValueInputs);
		if (formFooterSubmit) formFooterSubmit.addEventListener("click", validationFooterForm);
		if (formOurPlatformSubmit) formOurPlatformSubmit.addEventListener("click", validationOurPlatformForm);
		if (formExpertNeedSubmit) formExpertNeedSubmit.addEventListener("click", validationNeedExpertForm);
	});
})



