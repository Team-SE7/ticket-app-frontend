// Helper Functions
function createMovieListItem(movie) {
	const parentDiv = document.createElement("div");
	const imgDiv = document.createElement("div");
	const newImg = document.createElement("img");
	const itemContentDiv = document.createElement("div");

	parentDiv.className = "list__item";
	imgDiv.className = "list__image";
	newImg.className = "list__image__item";
	itemContentDiv.className = "list__item__content";

	newImg.src = movie.poster_image_url;
	newImg.alt = movie.title;
	imgDiv.appendChild(newImg);

	const title = document.createElement("h5");
	title.className = "list__item__title";
	title.textContent = movie.title;
	itemContentDiv.appendChild(title);

	const ratingContainer = document.createElement("div");
	ratingContainer.className = "list__item__rating";
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
		ratingContainer.appendChild(starIcon);
	}

	itemContentDiv.appendChild(ratingContainer);

	const button = document.createElement("button");
	button.className = "list__item__button";
	button.textContent = "Reserve";
	itemContentDiv.appendChild(button);

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

		const infoAction = document.createElement("button");
		infoAction.className = "btn btn-primary";
		infoAction.style.fontWeight = 700;
		infoAction.textContent = "Reserve";
		infoContent.appendChild(infoAction);

		infoDiv.appendChild(infoContent);

		// Create prev/next buttons only if necessary
		const prevButton = carouselWrapper.querySelector(".carousel__prev"); // Find if it exists
		const nextButton = carouselWrapper.querySelector(".carousel__next");

		if (prevButton) prevButton.remove(); // Remove if it exists
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

	// Initial image display
	displayCarouselImage();

	carouselWrapper.appendChild(carImage);
	carouselWrapper.appendChild(infoDiv);
}

// Initialize page elements
function displayMovieList(movies) {
	const sectionItem = document.getElementById("section__item");
	sectionItem.innerHTML = "";

	movies.forEach((movie) => {
		sectionItem.appendChild(createMovieListItem(movie));
	});
}

function addEventListeners() {
	const menu = document.querySelector("#menu");
	const menuListContainer = document.querySelector(".menu__list");

	// Menu Toggle
	menu.addEventListener("click", () => {
		if (menuListContainer) {
			menuListContainer.remove();
		} else {
			createMenuList();
		}
	});

	// Function to create the menu list
	function createMenuList() {
		const menuList = document.createElement("div");
		menuList.className = "menu__list";
		menuList.id = "menu__list";

		// Close Button
		const closeButton = document.createElement("div");
		closeButton.id = "close-btn";
		closeButton.innerHTML = cleanHTML(
			'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>'
		);
		closeButton.addEventListener("click", () => menuList.remove());
		menuList.appendChild(closeButton);

		// Menu Buttons
		const signInButton = document.createElement("button");
		signInButton.className = "btn btn-primary";
		signInButton.textContent = "Sign In";
		menuList.appendChild(signInButton);

		const cartButton = document.createElement("button");
		cartButton.className = "btn btn-secondary";
		cartButton.textContent = "Cart";
		menuList.appendChild(cartButton);

		menu.appendChild(menuList);
	}
}

// DOMContentLoaded -  Initialize everything together
document.addEventListener("DOMContentLoaded", async () => {
	const movies = await fetchData(
		"https://odd-cyan-crow-shoe.cyclic.app/movies"
	);
	displayMovieList(movies);
	createCarousel(movies);
	addEventListeners();
});