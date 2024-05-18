
//Засунути в успішну відправку
// getGtag(form)

function getGtag(form) {
	const gtagEvent = form.getAttribute('data-gtag')
	const event = new CustomEvent('formDone', { detail: { formEvent: gtagEvent ? gtagEvent : 'Form-done' } });
	window.dispatchEvent(event);
}
