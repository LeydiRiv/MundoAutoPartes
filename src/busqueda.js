document.addEventListener("keyup", e => {
  if (e.target.matches("#buscador")) {
    const searchText = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    let noResults = true; // Variable para rastrear si no se encontraron resultados

    cards.forEach(card => {
      const cardText = card.querySelector(".text-product h3").textContent.toLowerCase();
      const isMatch = cardText.includes(searchText);

      if (isMatch) {
        card.style.display = "block";
        noResults = false; // Se encontró al menos un resultado
      } else {
        card.style.display = "none";
      }
    });

    // Muestra un mensaje si no se encontraron resultados
    const noResultsMessage = document.getElementById("noResultsMessage");
    if (noResults) {
      alert('Este producto no existe');
      noResultsMessage.style.display = "block";
    } else {
      noResultsMessage.style.display = "none";
    }
  }
});

  