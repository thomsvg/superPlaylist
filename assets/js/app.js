const playlist = document.getElementById("playlist");
const lecteur = document.querySelector("#lecteur");
const cover = document.getElementById("cover");
const disque = document.getElementById("disque");

const config = {
    urlCover : "uploads/covers/",
    urlSound : "uploads/musics/",
}

const dbMusic = [
  {
    id: 1,
    cover: "harry_styles-watermelon_sugar.jpg",
    sound: "Harry_Styles-Watermelon_Sugar.mp3",
    title: "Harry Styles - Watermelon Sugar",
    category: "pop",
  },
  {
    id: 2,
    cover: "bakermat-baiana.jpg",
    sound: "Bakermat-Baiana.mp3",
    title: "Bakermat - Baianá",
    category: "electro",
  },
  {
    id: 3,
    cover: "maroon_5-lost.jpg",
    sound: "Maroon_5-Lost.mp3",
    title: "Maroon 5 - Lost",
    category: "pop",
  },
  {
    id: 4,
    cover: "jonas_blue-dont_call_it_love.jpg",
    sound: "Jonas_Blue-Dont_Call_It_Love.mp3",
    title: "Jonas Blue, EDX ft. Alex Mills - Don't Call It Love",
    category: "electro",
  },
];

/*
dbMusic.forEach((music) => {
  playlist.innerHTML += `<li id="${music.id}"><h2>${music.title}</h2><img src="${config.urlCover}${music.cover}" alt="${music.title}" /><div><small>${music.category}</small></div></li>`;
});
*/

dbMusic.forEach((music) => {
  playlist.innerHTML += `<li id="${music.id}"><h2>${music.title}</h2><div><small>${music.category}</small></div></li>`;
});

const allLi = document.querySelectorAll("li");

allLi.forEach((li) => {
    li.addEventListener("click", function(elem){
        const id = parseInt(li.id);
        const searchById = dbMusic.find((element) => element.id === id);
        //console.log(searchById);
        //alert(`Veux-tu écouter le titre : ${searchById.title}`);
        lecteur.src = `${config.urlSound}${searchById.sound}`;
        lecteur.play();
        cover.src = `${config.urlCover}${searchById.cover}`;
        if(disque.classList.contains("pause"))
        {
          disque.classList.remove("pause");
        }
    });
})