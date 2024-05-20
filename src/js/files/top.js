
const goTop = document.querySelector('.top');
if (goTop) {
	window.addEventListener('scroll', function (e) {
		window.scrollY > window.innerHeight / 2 ? goTop.classList.add('back-to-top-show') : goTop.classList.remove('back-to-top-show');
	});
}