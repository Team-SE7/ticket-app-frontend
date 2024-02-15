document.addEventListener("DOMContentLoaded", async () => {
	const movies = await fetchData("http://localhost:8000/movies");
	const modal = document.getElementById("movieModal");
	const overlay = document.querySelector(".overlay");
	const closeButton = document.querySelector(".modal__close");
	const modalTitle = document.getElementById("modalTitle");
	const addForm = document.querySelector(".add__form");
	const dataWrapper = document.querySelector(".data__wrapper");

	movies.forEach((movie) => {
		const newMovie = document.createElement("div");
		const imgWrapper = document.createElement("div");
		const newImg = document.createElement("img");
		const title = document.createElement("h5");

		newMovie.className = "movie__wrapper";
		imgWrapper.className = "movie__img";
		title.className = "movie__title";
		newImg.src = movie.poster_image_url;
		newImg.alt = movie.id;
		title.textContent = movie.title;

		imgWrapper.appendChild(title);
		imgWrapper.appendChild(newImg);
		newMovie.appendChild(imgWrapper);

		const buttonsWrapper = document.createElement("div");
		buttonsWrapper.className = "buttons__wrapper";
		const editButton = document.createElement("button");
		editButton.textContent = "Edit";
		editButton.className = "btn edit-button";
		buttonsWrapper.appendChild(editButton);

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className = "btn delete-button";
		buttonsWrapper.appendChild(deleteButton);

		newMovie.appendChild(buttonsWrapper);
		dataWrapper.appendChild(newMovie);
	});

	const addButton = document.querySelector(".add-button");

	function openModal(movieData = null, type) {
		modal.classList.add("show-modal");
		overlay.classList.add("show-modal");

		if (!movieData) {
			modalTitle.textContent = "Add Movie";
			addForm.reset();
		} else {
			const addButton = document.getElementById("form__add");
			modalTitle.textContent = "Edit Movie";
			addForm.elements["title"].value = movieData.title;
			addForm.elements["genre"].value = movieData.genre;
			addForm.elements["release_date"].value = movieData.release_date;
			addForm.elements["runtime"].value = movieData.runtime;
			addForm.elements["rating"].value = movieData.rating;
			addForm.elements["age__rating"].value = movieData.age__rating;
			addForm.elements["synopsis"].value = movieData.synopsis;
			addForm.elements["poster_image_url"].value = movieData.poster_image_url;
			addButton.textContent = "Save changes";
		}

		addForm.addEventListener(
			"submit",
			async (e) => await submitHandler({ e, movieData, type })
		);
	}

	async function submitHandler({ e, movieData, type }) {
		e.preventDefault();
		let formData = {};

		for (let i = 0; i < addForm.elements.length - 1; i++) {
			if (addForm.elements[i].value.trim() === "") {
				alert("Data is not completely filled yet.");
			}

			if (
				addForm.elements[i].id !== "rating" &&
				addForm.elements[i].id !== "runtime"
			) {
				formData[addForm.elements[i].id] = addForm.elements[i].value;
			} else {
				formData[addForm.elements[i].id] = parseInt(addForm.elements[i].value);
			}
		}

		switch (type) {
			case "add":
				await addMovie(formData);
				break;
			case "edit":
				await editMovie(formData, movieData.id);
				break;
		}

		modal.classList.remove("show-modal");
		overlay.classList.remove("show-modal");
		formData = {};
	}

	async function addMovie(formData) {
		try {
			await fetchData("http://localhost:8000/movies", {
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
				},
			});
			alert("Movie added!");
		} catch (error) {
			alert("Error adding movie:", error);
		}
	}

	async function editMovie(formData, movieId) {
		try {
			await fetchData(`http://localhost:8000/movies/${movieId}`, {
				method: "PUT",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
				},
			});
			alert("Movie updated!");
		} catch (error) {
			alert("Error updating movie:", error);
		}
	}

	async function deleteMovie(movieId) {
		try {
			const confirmed = confirm("Are you sure you want to delete this movie?");
			if (!confirmed) return;

			await fetchData(`http://localhost:8000/movies/${movieId}`, {
				method: "DELETE",
			});
			alert("Movie deleted!");
		} catch (error) {
			alert("Error deleting movie:", error);
		}
	}

	addButton.addEventListener("click", () => {
		openModal(null, "add");
	});

	closeButton.addEventListener("click", () => {
		modal.classList.remove("show-modal");
		overlay.classList.remove("show-modal");
	});

	overlay.addEventListener("click", () => {
		modal.classList.remove("show-modal");
		overlay.classList.remove("show-modal");
	});

	dataWrapper.addEventListener("click", (event) => {
		if (event.target.classList.contains("edit-button")) {
			const movieWrapper = event.target.closest(".movie__wrapper");
			const movieId = parseInt(movieWrapper.querySelector("img").alt);

			const movieToEdit = movies.find((movie) => movie.id === movieId);
			openModal(movieToEdit, "edit");
		} else if (event.target.classList.contains("delete-button")) {
			const movieWrapper = event.target.closest(".movie__wrapper");
			const movieId = parseInt(movieWrapper.querySelector("img").alt);
			deleteMovie(movieId);
		}
	});
});
