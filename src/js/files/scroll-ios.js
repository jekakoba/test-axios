// Плавна прокрутка (якір)
const body = document.querySelector('body');
document.addEventListener('click', documentActions);
function documentActions(e) {
	const target = e.target;
	//stopScrolling
	if (!target.classList.contains('.ancor') && scrol == true) {
		body.addEventListener('click', stopAnimation);
	}
}
//scroll
let stop = false;
let scrol = false;
function stopAnimation() { stop = true; }
const scrolling = (selectorBtn) => {
	const links = document.querySelectorAll(".ancor");
	let speed = 0.6;
	const headerHeight = document.querySelector('.header').offsetHeight;
	for (let i = 0; i < links.length; i++) {
		links[i].addEventListener("click", function (event) {
			event.preventDefault();
			let widthTop = Math.round(
				document.documentElement.scrollTop || document.body.scrollTop
			),
				hash = this.hash;
			let toBlock = document.querySelector(hash).getBoundingClientRect().top - headerHeight;
			let start = null;
			requestAnimationFrame(step);
			scrol = true;
			function step(time) {
				if (start === null) {
					start = time;
				}
				let progress = time - start,
					r =
						toBlock < 0
							? Math.max(widthTop - progress / speed, widthTop + toBlock)
							: Math.min(widthTop + progress / speed, widthTop + toBlock);

				let element = document.documentElement || document.body;
				element.scrollTo(0, r);

				if (r != widthTop + toBlock && !stop) {
					requestAnimationFrame(step);
				} else {
					body.removeEventListener('click', stopAnimation);
					stop = false;
					scrol = false
				}
			}
		});
	}
};

scrolling();