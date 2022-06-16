document.addEventListener('DOMContentLoaded', () => {
    fetchDogs ()
    formSubmit ()
})
let dogId;
      
      function fetchDogs() {
        fetch("http://localhost:3000/dogs")
        .then(resp => resp.json())
        .then(dogData => dogData.forEach(renderDogs))
      }
      
      function renderDogs(dog) {
        const form = document.querySelector("#dog-form")
        const table = document.querySelector("#table-body")
        const tr = document.createElement("tr")
        tr.innerHTML = `
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button id = ${dog.id}Button>Edit Dog</button></td>
        `
        table.append(tr)
      
        document.getElementById(`${dog.id}Button`).addEventListener("click", () => {
          form.name.value = dog.name
          form.breed.value = dog.breed
          form.sex.value = dog.sex
          dogId = dog.id
        })
      }
      
      function formSubmit() {
        document.querySelector("#dog-form").addEventListener("submit", event => {
          event.preventDefault()
      
          let updatedDog = {
            name: event.target.name.value,
            breed: event.target.breed.value,
            sex: event.target.sex.value
          }
      
          event.target.name.value = ""
          event.target.breed.value = ""
          event.target.sex.value = ""
      
          document.querySelector("#table-body").innerText = ""
          updateDogs(updatedDog, dogId)
        })
      }
      
      function updateDogs(updatedDog, dogId) {
        fetch(`http://localhost:3000/dogs/${dogId}`, {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(updatedDog)
        })
        .then(resp => resp.json())
        .then(fetchDogs)
      }