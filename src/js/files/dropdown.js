function openDropdownActions() {
	document.addEventListener("click", function (e) {
		const target = e.target
		if (target.closest('[data-dropdown-open]')) {
			const dropdownElement = target.closest('[data-dropdown]');
			dropDownOpen(dropdownElement)
		} else if (!target.closest('[data-dropdown]')) {
			const dropdownEl = document.querySelector('._open-dropdown');
			if (!dropdownEl) return
			dropDownClose(dropdownEl)
		}
	});

	function dropDownOpen(dropdownEl) {
		dropdownEl.classList.toggle('_open-dropdown')
	}
	function dropDownClose(dropdownEl) {
		dropdownEl.classList.remove('_open-dropdown')
	}
}
openDropdownActions()