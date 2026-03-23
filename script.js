const cours = [
    "Introduction à la cybersécurité",
    "Sécurité des réseaux",
    "Gestion des identités et accès",
    "Cryptographie appliquée",
    "Sécurité des applications web",
    "Analyse des vulnérabilités",
    "Sécurité du cloud",
    "Gestion des incidents",
    "Sécurité des données",
    "Conformité et réglementation (RGPD, etc.)"
];

const ul = document.getElementById('cours-list');
cours.forEach(titre => {
    const li = document.createElement('li');
    li.textContent = titre;
    ul.appendChild(li);
});
