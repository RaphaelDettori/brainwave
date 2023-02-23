// Sélectionner l'élément du bouton
const btnG = document.getElementById('btnGenerer')
const btnR = document.getElementById('btnRandom')

// Sélectionner la div parent
const container = document.querySelector('.containerSVG');

let increment = 5;
let numbers = getRandomNumbers();

// Ajouter un écouteur d'événements au clic sur le bouton
btnG.addEventListener('click', function() {
  container.innerHTML = '';

  // Récupérer la valeur du champ "number"
  for (let i = 0; i < 100; i++) {
    const [newValue1, newValue2, newValue3, newValue4, newValue5, newValue6, newValue7, newValue8] = calculateNewValues(i);

    const d = `M ${newValue1} ${newValue2} Q ${newValue3} ${newValue4}, ${newValue5} ${newValue6} T ${newValue7} ${newValue8}`;

    // Créer un nouvel élément SVG pour chaque forme
    const svg = createSVGElement();

    // Créer un nouvel élément path pour chaque forme
    const path = createPathElement(d);

    // Ajouter le path à l'élément SVG
    svg.appendChild(path);

    // Ajouter l'élément SVG à la div parent
    container.appendChild(svg);
  }
});

// Ajouter un écouteur d'evenements au clic
btnR.addEventListener('click', function() {
  container.innerHTML = '';

  numbers = getRandomNumbers();

  // Ajouter 5 à chaque coordonnée pour incrémenter les valeurs
  for (let i = 0; i < 100; i++) {
    const [newNumber1, newNumber2, newNumber3, newNumber4, newNumber5, newNumber6, newNumber7, newNumber8] = calculateNewNumbers(i);

    const d2 = `M ${newNumber1} ${newNumber2} Q ${newNumber3} ${newNumber4}, ${newNumber5} ${newNumber6} T ${newNumber7} ${newNumber8}`;

    // Créer un nouvel élément SVG pour chaque forme
    const svg = createSVGElement();

    // Créer un nouvel élément path pour chaque forme
    const path = createPathElement(d2);

     // Ajouter la classe pour la transition
  path.classList.add('path-transition');

    // Ajouter le path à l'élément SVG
    svg.appendChild(path);

    // Ajouter l'élément SVG à la div parent
    container.appendChild(svg);
  }
  
});

// Fonction pour récupérer des nombres aléatoires
function getRandomNumbers() {
  return [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 1000)
  ];
}

// Fonction pour calculer les nouvelles valeurs des coordonnées
function calculateNewValues(i) {
  return [
    parseInt(document.getElementById('value1').value) + (increment * i),
    parseInt(document.getElementById('value2').value) + (increment * i),
    parseInt(document.getElementById('value3').value) + (increment * i),
    parseInt(document.getElementById('value4').value) + (increment * i),
    parseInt(document.getElementById('value5').value) + (increment * i),
    parseInt(document.getElementById('value6').value) + (increment * i),
parseInt(document.getElementById('value7').value) + (increment * i),
parseInt(document.getElementById('value8').value) + (increment * i)
];
}

// Fonction pour calculer les nouvelles valeurs aléatoires
function calculateNewNumbers(i) {
    return [
    numbers[0] + (increment * i),
    numbers[1] + (increment * i),
    numbers[2] + (increment * i),
    numbers[3] + (increment * i),
    numbers[4],
    numbers[5] + (increment * i),
    numbers[6] + (increment * i),
    numbers[7] + (increment * i)
    ];
    }
    
    // Fonction pour créer un nouvel élément SVG
function createSVGElement() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1000 1000');
    svg.setAttribute('width', '100%'); // ajouter une valeur width
    svg.setAttribute('height', '100%'); // ajouter une valeur height
    return svg;
    }
    
    // Fonction pour créer un nouvel élément path
    function createPathElement(d) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#000000");
    path.setAttribute("stroke-width", "1");
    return path;
    }

    // Fonction pour combiner tous les chemins SVG en un seul chemin
function combinePaths() {
    let combinedPath = '';
    const paths = document.querySelectorAll('.containerSVG path');
    paths.forEach((path) => {
      combinedPath += path.getAttribute('d');
    });
    return combinedPath;
  }
  

// Ajouter un écouteur d'événements au clic sur le bouton de téléchargement
const downloadBtn = document.getElementById('btnDownload');
downloadBtn.addEventListener('click', function() {
  // Récupérer le chemin combiné
  const combinedPath = combinePaths();
  
  // Créer un nouvel élément SVG pour le chemin combiné
  const svg = createSVGElement();
  
  // Créer un nouvel élément path pour le chemin combiné
  const path = createPathElement(combinedPath);
  
  // Ajouter le path à l'élément SVG
  svg.appendChild(path);
  
  // Convertir le contenu SVG en une chaîne de texte
  const svgData = new XMLSerializer().serializeToString(svg);
  
  // Créer un objet Blob à partir de la chaîne de texte SVG
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  
  // Créer une URL à partir du Blob
  const url = URL.createObjectURL(blob);
  
  // Créer un élément de lien pour télécharger le fichier
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', url);
  downloadLink.setAttribute('download', 'combined.svg');
  
  // Ajouter l'élément de lien à la page et cliquer dessus pour déclencher le téléchargement
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(url);
});



/*
// Sélectionner le bouton "moove"
const btnMoove = document.getElementById('btnMoove');
const btnStop = document.getElementById('btnStop');

btnMoove.addEventListener('click', function(){
// Définir la fonction qui sera exécutée toutes les 50ms
    const moveShapes = setInterval(function() {
    // Parcourir les formes SVG existantes
        for(let i = 0; i < shapes.length; i++){
            const svg = shapes[i];
            const path = svg.querySelector('path');

            // Récupérer les coordonnées actuelles du path
            const pathCoord = path.getAttribute('d').split(/[ ,]/);
            const newValue1 = parseInt(pathCoord[1]) + (i/2);
            const newValue2 = parseInt(pathCoord[2]) + (0);
            const newValue3 = parseInt(pathCoord[4]) + (0);
            const newValue4 = parseInt(pathCoord[5]) + (0);
            const newValue5 = parseInt(pathCoord[7]) + (0);
            const newValue6 = parseInt(pathCoord[8]) + (0);
            const newValue7 = parseInt(pathCoord[10]) + (0);
            const newValue8 = parseInt(pathCoord[11]) + (i/2);

            // Générer un nouveau chemin avec les coordonnées incrémentées
            const d = `M ${newValue1} ${newValue2} Q ${newValue3} ${newValue4}, ${newValue5} ${newValue6} T ${newValue7} ${newValue8}`;

            // Mettre à jour le chemin du path
            path.setAttribute('d', d);
        }
    }, 100);
  // Arrêter l'animation après 10 secondes
    btnStop.addEventListener('click', function(){
        clearInterval(moveShapes);
    })
});
*/
