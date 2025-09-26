const jokeDisplaySection = document.getElementById("app");

async function fetchJokes() {
  const response = await fetch("http://localhost:8080/jokes");
  const jokes = await response.json();
  console.log(jokes);

  createJokes(jokes);
}
fetchJokes();

function createJokes(jokesArray) {
  jokesArray.forEach((singleJoke) => {
    const div = document.createElement("div");

    console.log(singleJoke);
    const jokeElement = document.createElement("p");
    const punchlineElement = document.createElement("p");

    jokeElement.innerText = singleJoke.joke;
    punchlineElement.innerText = singleJoke.punchline;

    div.setAttribute("class", "joke-container");
    div.append(jokeElement, punchlineElement);
    jokeDisplaySection.append(div);
  });
}

const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const userJoke = Object.fromEntries(data);
  console.log(userJoke);

  const response = await fetch("http://localhost:8080/jokes", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userJoke),
  });
});
