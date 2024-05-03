const playlist = document.getElementById("playlist");
const lecteur = document.querySelector(".lecteur");
const cover = document.getElementById("cover");
const disque = document.getElementById("disque");
const categorySelect = document.getElementById("category-select");
let dbMusic; // Déclarer dbMusic en dehors de la fonction init()

const config = {
    urlCover: "uploads/covers/",
    urlSound: "uploads/musics/",
};

// Fonction pour mettre en surbrillance la piste sélectionnée
function highlightTrack(li) {
    // Ajoute la classe "current-track" au titre en cours d'écoute
    li.classList.add("current-track");

    // Retire la classe "current-track" des autres titres
    const allLi = document.querySelectorAll("li");
    allLi.forEach((otherLi) => {
        if (otherLi !== li) {
            otherLi.classList.remove("current-track");
        }
    });
}

// Fonction pour charger les données et initialiser les fonctionnalités
async function init() {
    // Récupérer les données à partir du fichier JSON
    const req = await fetch("https://api-44cg.onrender.com/api/v1/musics");
    dbMusic = await req.json(); // Assigner les données à dbMusic

    // Créer la liste de lecture
    dbMusic.result.forEach((music) => {
        const li = document.createElement("li");
        li.innerHTML = `<h2>${music.title}</h2><div><small>${music.category}</small></div>`;
        li.dataset.category = music.category; // Ajouter un attribut dataset pour la catégorie
        playlist.appendChild(li);

        // Ajouter un événement de clic à chaque élément de la liste de lecture
        li.addEventListener("click", function () {
            // Récupérer les informations sur la musique correspondant à l'ID de cet élément li
            const selectedMusic = dbMusic.find((m) => m.id === music.id);

            // Mettre à jour le lecteur audio avec les informations de la musique sélectionnée
            lecteur.src = config.urlSound + selectedMusic.sound;
            cover.src = config.urlCover + selectedMusic.cover;

            // Mettre en surbrillance la piste sélectionnée
            highlightTrack(li);

            // Démarrer la lecture automatiquement
            lecteur.play();
        });
    });

    // Ajouter une option pour afficher toutes les catégories dans la liste déroulante
    const allCategoriesOption = document.createElement("option");
    allCategoriesOption.value = "Toutes";
    allCategoriesOption.textContent = "Toutes les catégories";
    categorySelect.appendChild(allCategoriesOption);

    // Obtenir toutes les catégories uniques à partir des données
    const categories = [...new Set(dbMusic.map((music) => music.category))];
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Appeler la fonction init pour initialiser les fonctionnalités
init();

// Sélectionner le bouton "aléatoire"
const boutonAleatoire = document.getElementById("aleatoire");

// Modifier la logique pour choisir une musique aléatoire et la lire
boutonAleatoire.addEventListener("click", function () {
    // Logique pour choisir une musique aléatoire et la lire
    const randomIndex = Math.floor(Math.random() * dbMusic.length);
    const randomMusic = dbMusic[randomIndex];
    lecteur.src = config.urlSound + randomMusic.sound;
    cover.src = config.urlCover + randomMusic.cover;

    // Trouver et mettre en surbrillance la piste aléatoire dans la liste de lecture
    const allLi = playlist.querySelectorAll("li");
    allLi.forEach((li) => {
        if (li.textContent.includes(randomMusic.title)) {
            highlightTrack(li);
        }
    });

    // Ajouter un écouteur d'événements pour l'événement canplay
    lecteur.addEventListener("canplay", function () {
        // Démarrer la lecture automatiquement une fois que le lecteur est prêt
        lecteur.play();
    });
});

// Sélectionner le bouton "Lire"
const lireBtn = document.querySelector(".playlist-container button");

// Ajouter un écouteur d'événements pour le clic sur le bouton "Tirage au sort"
lireBtn.addEventListener("click", function () {
    // Mettre ici la logique pour démarrer la lecture de la musique
    lecteur.addEventListener("pause", function () {
        disque.classList.add("pause");
    });

    lecteur.addEventListener("play", function () {
        disque.classList.remove("pause");
    });
});

// Ajouter un écouteur d'événements pour détecter les changements dans la liste déroulante
categorySelect.addEventListener("change", function () {
    const selectedCategory = categorySelect.value; // Récupérer la catégorie sélectionnée

    // Parcourir tous les éléments de la liste de lecture
    const allLi = playlist.querySelectorAll("li");
    allLi.forEach((li) => {
        // Afficher ou masquer les éléments en fonction de la catégorie sélectionnée
        if (selectedCategory === "Toutes" || li.dataset.category === selectedCategory) {
            li.style.display = "block"; // Afficher l'élément
        } else {
            li.style.display = "none"; // Masquer l'élément
        }
    });
});