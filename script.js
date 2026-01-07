const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");
const input = document.getElementById("wordInput");

searchBtn.addEventListener("click", searchWord);

input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    searchWord();
  }
});

function searchWord() {
  const word = input.value.trim();
  result.innerHTML = "";

  if (word === "") {
    alert("Please enter a word");
    return;
  }

  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      if (!Array.isArray(data)) {
        result.innerHTML = "Word not found. Please try another word.";
        return;
      }

      const meaning = data[0].meanings[0];
      const definition = meaning.definitions[0];

      const example = definition.example
        ? definition.example
        : "Example not available";

      const phonetic = data[0].phonetic
        ? data[0].phonetic
        : "Not available";

      let audioHTML = "";
      if (data[0].phonetics[0] && data[0].phonetics[0].audio) {
        audioHTML = `<audio controls src="${data[0].phonetics[0].audio}"></audio>`;
      }

      result.innerHTML = `
        <h2>${data[0].word}</h2>
        <p><b>Part of Speech:</b> ${meaning.partOfSpeech}</p>
        <p><b>Meaning:</b> ${definition.definition}</p>
        <p><b>Example:</b> ${example}</p>
        <p><b>Phonetic:</b> ${phonetic}</p>
        ${audioHTML}
      `;
    })
    .catch(function () {
      result.innerHTML = "Word not found. Please try another word.";
    });
}