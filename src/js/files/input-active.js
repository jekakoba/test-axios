const inputs = document.querySelectorAll('.form__input');
inputs.forEach(input => {
	input.addEventListener('input', () => {
		const formLine = input.closest('.form__line');
		if (input.value.trim() !== '') {
			formLine.classList.add('_input-active');
		} else {
			formLine.classList.remove('_input-active');
		}
	});
});


