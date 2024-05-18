function filterCheckbox() {
	const filterListWrapper = document.querySelectorAll('[data-list-wrapper]')
	if (filterListWrapper) {
		filterListWrapper.forEach(filterList => {
			const filterSelectedList = filterList.querySelector('[data-selected-list]')
			const inputsCheckbox = filterList.querySelectorAll('input[type="checkbox"]')
			filterList.addEventListener("change", getCheckedValue);

			function getCheckedValue() {
				filterSelectedList.innerHTML = ""
				inputsCheckbox.forEach(input => {
					if (input.checked) {
						const inputValue = input.value
						const inputText = input.nextElementSibling.textContent
						createValueInput(inputValue, inputText)
					}
				});
			}
			getCheckedValue()
			function createValueInput(value, label) {
				const listItem = document.createElement('li')
				listItem.classList.add('filter__selected-item')
				listItem.innerHTML = `
				<span>${label}</span>
				<button type="button" data-value="${value}" class="filter__close" aria-label="Remove the item from the list">
					<img src="img/icons/close.svg" alt="close icon">
				</button>
				`;
				filterSelectedList.append(listItem)
			}
			filterSelectedList.addEventListener("click", function (e) {
				const target = e.target

				if (target.closest("button")) {
					const button = target.closest("button")
					const buttonValue = button.getAttribute('data-value')
					inputsCheckbox.forEach(input => {
						if (input.value === buttonValue) {
							input.click()
						}
					});
				}
			});
		});

	}
}
filterCheckbox()