const profiles = [
        { name: "Luan", power: "Fazer patos",  image: "imgs/Luan.jpg" },
        { name: "Jocal", power: "Dar hate", image: "imgs/Jocal.jpg" },
        { name: "Gbz", power: "Sorte do Cu", image: "imgs/Gbz.jpg" },
        {name: "Eduardo", power: "Dar hate nas pessoas", image: "imgs/Eduardo.jpeg" },
        {name: "Tuti", power: "Vai te fuder", image: "imgs/Tuti.jpg" },
        {name: "Febem", power: "Aura", image: "imgs/Febem.jpg"}
    ];
    

const profilesContainer = document.getElementById('profiles');

profiles.forEach(profile => {
    const card = document.createElement('div');
    card.classList.add('profile-card');
    card.innerHTML = `
        <img src="${profile.image}" alt="${profile.name}" width="100">
        <h3>${profile.name}</h3>
        <p>${profile.power}</p>
        <button onclick="applyProfile('${profile.name}')">Marcar</button>
    `;
    profilesContainer.appendChild(card);
});

function applyProfile(name) {
    alert(`Perfil ${name} Marcado!`);
}
