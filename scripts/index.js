function createMovieListItem(movie) {
	const parentDiv = document.createElement("div");
	const imgDiv = document.createElement("div");
	const newImg = document.createElement("img");
	const actionLink = document.createElement("a");
	const itemContentDiv = document.createElement("div");

	parentDiv.className = "list__item";
	imgDiv.className = "list__image";
	actionLink.classList.add("list__action");
	newImg.className = "list__image__item";
	itemContentDiv.className = "list__item__content";

	newImg.src = movie.poster_image_url;
	newImg.alt = movie.title;

	actionLink.href = `html/movie-detail.html?id=${movie.id}`;
	actionLink.innerHTML = cleanHTML(
		`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg><p>Reserve</p>`
	);

	imgDiv.addEventListener("mouseover", () => {
		actionLink.style = "opacity: 100;";
	});

	imgDiv.addEventListener("mouseout", () => {
		actionLink.style = "opacity: 0;";
	});
	imgDiv.appendChild(newImg);
	imgDiv.appendChild(actionLink);

	const title = document.createElement("h5");
	title.className = "list__item__title";
	title.textContent = movie.title;
	itemContentDiv.appendChild(title);

	const ratingContainer = document.createElement("div");
	const starIconContainer = document.createElement("div");
	ratingContainer.classList.add("list__rating__container");
	starIconContainer.className = "list__item__rating";
	const roundedRating = Math.round(movie.rating * 2) / 2;
	for (let i = 0; i < roundedRating; i++) {
		let cleanSVG;
		if (i + 0.5 === roundedRating) {
			cleanSVG = cleanHTML(
				'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-half rating__item"><path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" /></svg>'
			);
		} else {
			cleanSVG = cleanHTML(
				'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star rating__item"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>'
			);
		}

		const starIcon = document.createElement("div");
		starIcon.innerHTML = cleanSVG;
		starIconContainer.appendChild(starIcon);
	}

	ratingContainer.appendChild(starIconContainer);

	const ratingInNumEl = document.createElement("p");
	const ratingInNum = parseFloat(movie.rating).toFixed(1);
	ratingInNumEl.innerText = ratingInNum;

	ratingContainer.appendChild(ratingInNumEl);
	itemContentDiv.appendChild(ratingContainer);

	parentDiv.appendChild(imgDiv);
	parentDiv.appendChild(itemContentDiv);
	return parentDiv;
}

function createCarousel(movies) {
	const carouselWrapper = document.querySelector(".carousel__wrapper");
	const carImage = document.createElement("div");
	const infoDiv = document.createElement("div");
	const infoContent = document.createElement("div");

	infoDiv.classList.add("carousel__info");
	carImage.className = "carousel__image";

	let currentMovieIndex = 0;

	// Function to display a movie in carousel
	function displayCarouselImage() {
		const movie = movies[currentMovieIndex];
		carImage.innerHTML = "";
		infoContent.innerHTML = "";

		const newImg = document.createElement("img");
		newImg.src = movie.poster_image_url;
		newImg.alt = movie.title;
		newImg.loading = "lazy";
		carImage.appendChild(newImg);

		const infoTitle = document.createElement("p");
		infoTitle.textContent = movie.title;
		infoContent.classList.add("carousel__info__content");
		infoContent.appendChild(infoTitle);

		const infoAction = document.createElement("a");
		infoAction.className = "btn btn-primary";
		infoAction.style.fontWeight = 700;
		infoAction.href = `html/movie-detail.html?id=${movie.id}`;
		infoAction.textContent = "Reserve";
		infoContent.appendChild(infoAction);

		infoDiv.appendChild(infoContent);

		const prevButton = carouselWrapper.querySelector(".carousel__prev");
		const nextButton = carouselWrapper.querySelector(".carousel__next");

		if (prevButton) prevButton.remove();
		if (nextButton) nextButton.remove();

		if (movies.length > 1) {
			if (currentMovieIndex !== 0) {
				const prevButton = document.createElement("button");
				prevButton.className = "carousel__nav carousel__prev";
				prevButton.innerHTML = cleanHTML(
					'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>'
				);
				prevButton.addEventListener("click", () => {
					currentMovieIndex =
						(currentMovieIndex - 1 + movies.length) % movies.length;
					displayCarouselImage();
				});
				carouselWrapper.appendChild(prevButton);
			}

			if (currentMovieIndex !== movies.length - 1) {
				const nextButton = document.createElement("button");
				nextButton.className = "carousel__nav carousel__next";
				nextButton.innerHTML = cleanHTML(
					'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>'
				);
				nextButton.addEventListener("click", () => {
					currentMovieIndex = (currentMovieIndex + 1) % movies.length;
					displayCarouselImage();
				});
				carouselWrapper.appendChild(nextButton);
			}
		}
	}

	displayCarouselImage();

	carouselWrapper.appendChild(carImage);
	carouselWrapper.appendChild(infoDiv);
}

function displayMovieList(movies) {
	const sectionItem = document.getElementById("section__item");
	sectionItem.innerHTML = "";

	movies.forEach((movie) => {
		sectionItem.appendChild(createMovieListItem(movie));
	});
}

function renderModal(type) {
	const modal = document.getElementById("modal");
	const form = document.querySelector(".form");
	const closeButton = document.querySelector(".modal__close");
	const overlay = document.querySelector(".overlay");

	modal.classList.add("show-modal");
	overlay.classList.add("show-modal");

	if (type === "login") {
		const formBtn = document.getElementById("form__submit");
		formBtn.textContent = "";
		modalTitle.textContent = "Sign in";
		formBtn.textContent = "Submit";
		form.style.display = "block";
		form.reset();
	} else {
		const formBtn = document.getElementById("form__submit");
		formBtn.textContent = "";
		modalTitle.textContent = "Cart";
		formBtn.textContent = "Checkout";
		form.style.display = "none";
	}

	closeButton.addEventListener("click", () => {
		modal.classList.remove("show-modal");
		overlay.classList.remove("show-modal");
	});

	overlay.addEventListener("click", () => {
		modal.classList.remove("show-modal");
		overlay.classList.remove("show-modal");
	});

	form.addEventListener("submit", (e) => {
		console.log("hello world");
	});
}

function renderDropdown() {
	const menu = document.querySelector(".menu");
	const dropdown = document.querySelector(".dropdown");
	const menuSvg = menu.querySelector(".lucide.lucide-menu");
	const closeSvg = menu.querySelector(".lucide.lucide-x");

	menu.addEventListener("click", () => {
		dropdown.classList.toggle("show-dropdown");
		menuSvg.classList.toggle("hidden");
		closeSvg.classList.toggle("hidden");
	});
}

// DOMContentLoaded -  Initialize everything together
document.addEventListener("DOMContentLoaded", async () => {
	const { data: movies } = await fetchData(
		"https://rich-gold-crow-hem.cyclic.app/movies"
	);
	renderDropdown();
	displayMovieList(movies);
	createCarousel(movies);

	const loginBtns = document.querySelectorAll("#sign-in");
	loginBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			renderModal("login");
		});
	});
	const cartBtns = document.querySelectorAll("#cart");
	cartBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			renderModal("cart");
		});
	});
});
