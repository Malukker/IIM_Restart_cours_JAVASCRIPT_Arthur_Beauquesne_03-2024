function fetchCharacter(character) {
    return fetch('https://hp-api.lainocs.fr/characters/'+character)
        .then((response) => response.json())
}

async function displayCharacter(character) {
    const data = await fetchCharacter(character)
    document.getElementById(character).innerHTML = 
    `
    <img src="${data.image}" alt="${data.name}" />
    <h1>${data.name}</h1>
    <h2>${data.role}</h2>
    <h3>${data.blood}</h3>
    `

}

displayCharacter("minerva-mcgonagall")
displayCharacter("sirius-black")
displayCharacter("alastor-moody")