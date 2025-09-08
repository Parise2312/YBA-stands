const profiles = [
    { name: "Jotaro PT3", power: "Star Platinum", image: "imgs/download (1).jpg", stats: { forca: 9, velocidade: 8, defesa: 6, poder: 6, rank: 7 } },           
    { name: "Jotaro PT4", power: "Star Platinum O mundo", image: "imgs/download (2).jpg", stats: { forca: 10, velocidade: 9, poder: 7, defesa: 7, rank: 8 } },
    { name: "Dio", power: "Vampirismo", image: "imgs/download (5).jpg", stats: { forca: 7, velocidade: 6, defesa: 3, poder: 5, rank: 8 } },
    { name: "Dio", power: "The World", image: "imgs/download (4).jpg", stats: { forca: 9, velocidade: 9, defesa: 4, poder: 6, rank: 6 } },
    { name: "Giorno", power: "Golden experience", image: "imgs/download (3).jpg", stats: { forca: 5, velocidade: 6, poder: 9, defesa: 8, rank: 6 } },
    { name: "Giorno", power: "Golden experience-Requiem", image: "imgs/download.jpg", stats: { forca: 10, velocidade: 10, poder: 10, defesa: 10, rank: 9 } },
    { name: "Diavlo", power: "King Crinsom", image: "imgs/download (6).jpg", stats: { forca: 8, velocidade: 8, poder: 9,   defesa: 9, rank: 8 } },
    { name: "Okuyaso", power: "The Hand", image: "imgs/download (8).jpg", stats: { forca: 4, velocidade: 5, poder: 8,   defesa: 4, rank: 6 } },
    { name: "Cool Ice", power: "Cream", image: "imgs/download (9).jpg", stats: { forca: 5, velocidade: 6, poder: 9,   defesa: 4, rank: 7 } },
    { name: "Funni Valentine", power: "D-4-C", image: "imgs/download (10).jpg", stats: { forca: 6, velocidade: 7, poder: 9,   defesa: 6, rank: 8 } },
    { name: "Diego Brando/Dio", power: "Scary Monsters", image: "imgs/download (7).jpg", stats: { forca: 7, velocidade: 8, poder: 9,   defesa: 6, rank: 7 } },
    { name: "Diego Brando/Scary Monsters", power: "Scary Monsters", image: "imgs/dinoo.jpg", stats: { forca: 9, velocidade: 9, poder: 10,  defesa: 8, rank: 8 } },
];

const profilesContainer = document.getElementById('profiles');
const rankingList = document.getElementById('ranking-list');

// Cria barra de progresso animada
function createProgressBar(value) {
    const bar = document.createElement("div");
    bar.classList.add("progress-bar");
    const fill = document.createElement("div");
    fill.classList.add("progress-fill");
    fill.style.width = "0%";
    bar.appendChild(fill);
    setTimeout(() => fill.style.width = value + "%", 100);
    return bar;
}

// Monta cards
profiles.forEach(profile => {
    const card = document.createElement('div');
    card.classList.add('profile-card');
    card.innerHTML = `<img src="${profile.image}" alt="${profile.name}" width="100"><h3>${profile.name}</h3><p>${profile.power}</p>`;
    Object.entries(profile.stats).forEach(([stat,val]) => {
        const statContainer = document.createElement("div");
        statContainer.classList.add("stat-container");
        statContainer.innerHTML = `<strong>${stat.toUpperCase()}: ${val}</strong>`;
        statContainer.appendChild(createProgressBar(val));
        card.appendChild(statContainer);
    });
    card.innerHTML += `<button onclick="applyProfile('${profile.name}')">Marcar</button>`;
    profilesContainer.appendChild(card);
});

function applyProfile(name) {
    const profile = profiles.find(p => p.name === name);
    if (!profile) return;
    alert(`${name} marcado!\nForça: ${profile.stats.forca}\nVelocidade: ${profile.stats.velocidade}\nDefesa: ${profile.stats.defesa}\nPoder Rank: ${profile.stats.rank}`);
}

// Ranking visual
function compararPor(categoria) {
    const sorted = [...profiles].sort((a,b)=>b.stats[categoria]-a.stats[categoria]);
    rankingList.innerHTML = "";
    document.querySelectorAll("img").forEach(img => img.classList.remove("winner","loser"));
    sorted.forEach((p,i)=>{
        const li = document.createElement("li");
        li.innerHTML = `<span>${i+1}. ${p.name} - ${categoria}: ${p.stats[categoria]}</span>`;
        li.appendChild(createProgressBar(p.stats[categoria]));
        rankingList.appendChild(li);
        const cardImg = document.querySelector(`img[alt="${p.name}"]`);
        if (cardImg) {
            if(i===0) cardImg.classList.add("winner"); else cardImg.classList.add("loser");
        }
    });
}

// Perfil x Perfil
const select1 = document.getElementById("person1");
const select2 = document.getElementById("person2");
profiles.forEach(p=>{
    const o1 = document.createElement("option"); o1.value=p.name; o1.textContent=p.name; select1.appendChild(o1);
    const o2 = document.createElement("option"); o2.value=p.name; o2.textContent=p.name; select2.appendChild(o2);
});

function compararDuas(){
    const name1 = select1.value, name2 = select2.value;
    if(name1===name2){ alert("Escolha dois perfis diferentes!"); return; }
    const p1 = profiles.find(p=>p.name===name1), p2 = profiles.find(p=>p.name===name2);
    const categorias=["forca","velocidade","flexibilidade","rank"];
    const resultadoDiv = document.getElementById("compare-result");
    resultadoDiv.innerHTML="";
    document.querySelectorAll("img").forEach(img=>img.classList.remove("winner","loser"));
    categorias.forEach(cat=>{
        const div = document.createElement("div");
        let vencedor=null, perdedor=null;
        if(p1.stats[cat]>p2.stats[cat]){ vencedor=p1; perdedor=p2; }
        else if(p2.stats[cat]>p1.stats[cat]){ vencedor=p2; perdedor=p1; }
        div.innerHTML=`<strong>${cat.toUpperCase()}</strong>: ${p1.name}(${p1.stats[cat]}) vs ${p2.name}(${p2.stats[cat]})`;
        resultadoDiv.appendChild(div);
        if(vencedor){ document.querySelector(`img[alt="${vencedor.name}"]`).classList.add("winner"); document.querySelector(`img[alt="${perdedor.name}"]`).classList.add("loser"); }
    });
}
