/*
   FUNCIÓN PRINCIPAL: generarTablas()
   1. Lee los valores de los 3 inputs.
   2. Valida que los datos sean correctos.
   3. Limpia el área de resultados.
   4. Por cada número en el rango [inicio..fin]:
      a. Crea una tarjeta (.tabla-card).
      b. Crea un <table> HTML con filas para cada multiplicación.
      c. Aplica un color de cabecera rotativo.
      d. Inserta la tarjeta en el grid.
   5. Muestra la sección de resultados con animación.
*/
function generarTablas() {
  // --- 1 LEER INPUTS ---
  const inicio  = parseInt(document.getElementById('tablaInicio').value, 10);
  const fin     = parseInt(document.getElementById('tablaFin').value,    10);
  const hasta   = parseInt(document.getElementById('hasta').value,       10);
  const errorEl = document.getElementById('errorMsg');

  // --- 2 VALIDACIÓN ---
  errorEl.classList.remove('visible');

  if (isNaN(inicio) || isNaN(fin) || isNaN(hasta)) {
    mostrarError('Por favor completa todos los campos con números válidos.');
    return;
  }
  if (inicio < 1 || fin < 1 || hasta < 1) {
    mostrarError('Los valores deben ser mayores a 0.');
    return;
  }
  if (inicio > fin) {
    mostrarError('La tabla inicial no puede ser mayor que la tabla final.');
    return;
  }
  if (fin - inicio > 49) {
    mostrarError('El rango máximo permitido es de 50 tablas a la vez.');
    return;
  }

  // --- 3. LIMPIAR ÁREA DE RESULTADOS ---
  const grid = document.getElementById('tablesGrid');
  grid.innerHTML = '';

  // --- 4. GENERAR CADA TABLA ---
  for (let num = inicio; num <= fin; num++) {
    const colorIndex = (num - 1) % 10; // ciclo de 10 colores

    // 4a. Contenedor principal de la tarjeta
    const card = document.createElement('div');
    card.className = 'tabla-card';
    card.style.animationDelay = ((num - inicio) * 0.06) + 's';

    // 4b. Cabecera coloreada
    const header = document.createElement('div');
    header.className = `tabla-card-header color-${colorIndex}`;
    header.textContent = `Tabla del ${num}`;
    card.appendChild(header);

    // 4c. Crear <table> HTML
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (let i = 1; i <= hasta; i++) {
      const resultado = num * i;
      const tr = document.createElement('tr');

      // Celda con la expresión
      const tdExpr = document.createElement('td');
      tdExpr.textContent = `${num} × ${i}`;
      tr.appendChild(tdExpr);

      // Celda con el símbolo igual
      const tdEq = document.createElement('td');
      tdEq.textContent = '=';
      tdEq.style.textAlign = 'center';
      tdEq.style.color = '#aaa';
      tdEq.style.width = '30px';
      tr.appendChild(tdEq);

      // Celda con el resultado (resaltado)
      const tdRes = document.createElement('td');
      tdRes.textContent = resultado;
      tr.appendChild(tdRes);

      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    card.appendChild(table);

    // 4d. Insertar en el grid
    grid.appendChild(card);
  }

  // --- 5. MOSTRAR SECCIÓN CON ANIMACIÓN ---
  const section = document.getElementById('results-section');
  section.style.display = 'block';

  document.getElementById('resultsTitle').textContent =
    `Tablas del ${inicio} al ${fin}`;
  document.getElementById('resultsSubtitle').textContent =
    `${fin - inicio + 1} tabla(s) generadas · multiplicaciones del 1 al ${hasta}`;

  // Scroll suave hacia los resultados
  setTimeout(() => {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/* Muestra mensaje de error */
function mostrarError(msg) {
  const el = document.getElementById('errorMsg');
  el.textContent = msg;
  el.classList.add('visible');
}

// Generar al cargar la página con valores por defecto
window.addEventListener('DOMContentLoaded', generarTablas);
