
//Buscador con archivo Json

/// Obtener una referencia al formulario y al contenedor de resultados
const searchForm = document.getElementById('searchForm');
const resultsContainer = document.getElementById('resultsContainer');

// Agregar un manejador de eventos al formulario para manejar la búsqueda
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita la recarga de la página al enviar el formulario

  // Obtener el término de búsqueda del usuario
  const searchTerm = document.querySelector('input[type="search"]').value;

  // Cargar el archivo JSON
  const data = await fetch('./data.json').then(response => response.json());

  // Buscar el término de búsqueda en los datos
  const results = search(searchTerm, data);

  // Mostrar los resultados al usuario
  resultsContainer.innerHTML = '';
  for (const result of results) {
    // Crear un elemento HTML para cada resultado
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');

    // Añadir el contenido del resultado al elemento HTML
    resultElement.innerHTML = result.title + '<br>' + result.description;

    // Añadir el elemento HTML al contenedor de resultados
    resultsContainer.appendChild(resultElement);
  }
});

// Función para buscar el término de búsqueda en los datos
function search(searchTerm, data) {
  const results = [];
  for (const item of data) {
    if (item.title.includes(searchTerm) || item.description.includes(searchTerm)) {
      results.push(item);
    }
  }
  return results;
}