function changeFiltersPage() {

	const filtersPagesContainers = document.querySelectorAll('[data-filters-pages]')
	filtersPagesContainers.forEach(filtersPagesContainer => {
		let currentPageIndex = 0
		const filtersPages = Array.from(filtersPagesContainer.querySelectorAll('[data-filters-page]'))
		if (filtersPages.length === 0) return

		hiddenAllPages()
		showPage(filtersPages[currentPageIndex])

		filtersPagesContainer.addEventListener('click', (e) => {
			const target = e.target
			if (target.hasAttribute('data-filter-next')) {
				showNextPage()
			} else if (target.hasAttribute('data-filter-prev')) {
				showPrevPage()
			}
		})

		function showNextPage() {
			if (currentPageIndex < filtersPages.length - 1) {
				hiddenAllPages()
				currentPageIndex++
				showPage(filtersPages[currentPageIndex])
			}
		}

		function showPrevPage() {
			if (currentPageIndex > 0) {
				hiddenAllPages()
				clearPageInputs(filtersPages[currentPageIndex])
				clearPageInputs(filtersPages[currentPageIndex - 1])
				currentPageIndex--
				showPage(filtersPages[currentPageIndex])
			}
		}

		function hiddenAllPages() {
			filtersPages.forEach(hiddenPage)
		}

		function hiddenPage(page) {
			page.setAttribute('hidden', '')
		}

		function showPage(page) {
			page.removeAttribute('hidden')
		}

		function watchFilters() {
			filtersPages.forEach(onePage => {
				onePage.addEventListener('change', (e) => {
					const isChecked = Array.from(onePage.querySelectorAll('input')).some(inp => inp.checked)

					if (isChecked) {
						onePage.classList.add('checked-filter')
					} else {
						onePage.classList.remove('checked-filter')
					}

					updateNextButtonState(onePage)
				})
			})
		}

		function updateNextButtonState(page) {
			const nextButton = page.querySelector('button[data-filter-next]')
			if (nextButton) {
				if (page.classList.contains('checked-filter')) {
					nextButton.removeAttribute('disabled')
				} else {
					if (!nextButton.closest('[data-start]')) {
						nextButton.setAttribute('disabled', '')
					}

				}
			}
		}

		function clearPageInputs(page) {
			Array.from(page.querySelectorAll('input')).forEach(input => {
				input.checked = false
			})
			page.classList.remove('checked-filter')
			updateNextButtonState(page)
		}

		watchFilters()

		filtersPages.forEach(page => {
			updateNextButtonState(page)
		})

		document.addEventListener("afterPopupClose", function (e) {
			currentPageIndex = 0
			hiddenAllPages()
			showPage(filtersPages[currentPageIndex])
		});
	});
}
window.addEventListener("load", changeFiltersPage)