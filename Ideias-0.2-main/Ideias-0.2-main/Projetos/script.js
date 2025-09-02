const profiles = [
    { 
        name: "Luan", 
        power: "Fazer patos",  
        image: "imgs/Luan.jpg",
        stats: { forca: 5, velocidade: 4, flexibilidade: 5, rank: 8 }
    },
    { 
        name: "Jocal", 
        power: "Dar hate", 
        image: "imgs/Jocal.jpg",
        stats: { forca: 6, velocidade: 5, flexibilidade: 4, rank: 6 }
    },
    { 
        name: "Gbz", 
        power: "Sorte do Cu", 
        image: "imgs/Gbz.jpg",
        stats: { forca: 3, velocidade: 5, flexibilidade: 4, rank: 8 }
    },
    { 
        name: "Eduardo", 
        power: "Dar hate nas pessoas", 
        image: "imgs/Eduardo.jpeg",
        stats: { forca: 5, velocidade: 5, flexibilidade: 5, rank: 9 }
    },
    { 
        name: "Tuti", 
        power: "Vai te fuder", 
        image: "imgs/Tuti.jpg",
        stats: { forca: 4, velocidade: 3, flexibilidade: 2, rank: 8 }
    },
    { 
        name: "Febem", 
        power: "Aura", 
        image: "imgs/Febem.jpg",
        stats: { forca: 7, velocidade: 6, flexibilidade: 8, rank: 9 }
    }
];

const profilesContainer = document.getElementById('profiles');
const rankingList = document.getElementById('ranking-list');

// Função para criar barra de progresso
function createProgressBar(value) {
    const bar = document.createElement("div");
    bar.classList.add("progress-bar");

    const fill = document.createElement("div");
    fill.classList.add("progress-fill");
    fill.style.width = "0%"; // começa vazio
    bar.appendChild(fill);

    // Animação
    setTimeout(() => {
        fill.style.width = value + "%";
    }, 100);

    return bar;
}

// Monta os cards dos perfis
profiles.forEach(profile => {
    const card = document.createElement('div');
    card.classList.add('profile-card');
    card.innerHTML = `
        <img src="${profile.image}" alt="${profile.name}" width="100">
        <h3>${profile.name}</h3>
        <p>${profile.power}</p>
    `;

    // Adiciona stats com barras
    Object.entries(profile.stats).forEach(([stat, val]) => {
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

    alert(
        `Perfil ${name} Marcado!\n\n` +
        `Força: ${profile.stats.forca}\n` +
        `Velocidade: ${profile.stats.velocidade}\n` +
        `Flexibilidade: ${profile.stats.flexibilidade}\n` +
        `Poder Rank: ${profile.stats.rank}`
    );
}

// Função para gerar ranking visual
function compararPor(categoria) {
    const sorted = [...profiles].sort((a, b) => b.stats[categoria] - a.stats[categoria]);

    rankingList.innerHTML = ""; // limpa antes de atualizar

    sorted.forEach((p, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${i + 1}. ${p.name} - ${categoria}: ${p.stats[categoria]}</span>
        `;
        
        // barra no ranking
        const bar = createProgressBar(p.stats[categoria]);
        li.appendChild(bar);

        rankingList.appendChild(li);
    });
}
function compararPor(categoria) {
    const sorted = [...profiles].sort((a, b) => b.stats[categoria] - a.stats[categoria]);

    rankingList.innerHTML = ""; // limpa antes de atualizar

    sorted.forEach((p, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${i + 1}. ${p.name} - ${categoria}: ${p.stats[categoria]}</span>
        `;
        
        // barra no ranking
        const bar = createProgressBar(p.stats[categoria]);
        li.appendChild(bar);

        rankingList.appendChild(li);

        // Pega a imagem do card original
        const cardImg = document.querySelector(`img[alt="${p.name}"]`);
        if (cardImg) {
            cardImg.classList.remove("loser"); // remove efeito anterior
            if (i > 0) { // se NÃO for o primeiro colocado
                cardImg.classList.add("loser");
            }
        }
    });
}
function compararPor(categoria) {
    const sorted = [...profiles].sort((a, b) => b.stats[categoria] - a.stats[categoria]);

    rankingList.innerHTML = ""; // limpa antes de atualizar

    sorted.forEach((p, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${i + 1}. ${p.name} - ${categoria}: ${p.stats[categoria]}</span>
        `;
        
        // barra no ranking
        const bar = createProgressBar(p.stats[categoria]);
        li.appendChild(bar);

        rankingList.appendChild(li);

        // Pega a imagem do card original
        const cardImg = document.querySelector(`img[alt="${p.name}"]`);
        if (cardImg) {
            cardImg.classList.remove("loser", "winner"); // limpa efeitos anteriores
            if (i === 0) {
                cardImg.classList.add("winner"); // vencedor verde
            } else {
                cardImg.classList.add("loser"); // perdedor vermelho
            }
        }
    });
}
// Popula selects de comparação
const select1 = document.getElementById("person1");
const select2 = document.getElementById("person2");
profiles.forEach(p => {
    const option1 = document.createElement("option");
    option1.value = p.name;
    option1.textContent = p.name;
    select1.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = p.name;
    option2.textContent = p.name;
    select2.appendChild(option2);
});

// Função para comparar duas pessoas
function compararDuas() {
    const name1 = select1.value;
    const name2 = select2.value;
    if (name1 === name2) {
        alert("Escolha duas pessoas diferentes!");
        return;
    }

    const p1 = profiles.find(p => p.name === name1);
    const p2 = profiles.find(p => p.name === name2);

    const categorias = ["forca", "velocidade", "flexibilidade", "rank"];
    const resultadoDiv = document.getElementById("compare-result");
    resultadoDiv.innerHTML = "";

    categorias.forEach(cat => {
        const div = document.createElement("div");
        let vencedor = p1.stats[cat] > p2.stats[cat] ? p1 : (p2.stats[cat] > p1.stats[cat] ? p2 : null);

        div.innerHTML = `<strong>${cat.toUpperCase()}</strong>: ${p1.name}(${p1.stats[cat]}) vs ${p2.name}(${p2.stats[cat]})`;
        
        // aplica efeito nas imagens
        document.querySelectorAll("img").forEach(img => img.classList.remove("winner","loser"));
        if (vencedor) {
            document.querySelector(`img[alt="${vencedor.name}"]`).classList.add("winner");
            const perdedor = vencedor === p1 ? p2 : p1;
            document.querySelector(`img[alt="${perdedor.name}"]`).classList.add("loser");
        }

        resultadoDiv.appendChild(div);
    });
}

