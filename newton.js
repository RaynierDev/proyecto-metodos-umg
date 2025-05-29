function crearCamposNewton() {
  const num = parseInt(document.getElementById('numPuntos').value);
  const contenedor = document.getElementById('puntosContainer');
  contenedor.innerHTML = '';

  if (isNaN(num) || num < 2) {
    contenedor.innerHTML = '<p class="text-red-600">Por favor, ingresa un número válido de puntos (mínimo 2).</p>';
    return;
  }

  for (let i = 0; i < num; i++) {
    contenedor.innerHTML += `
      <div class="flex gap-2">
        <input type="number" placeholder="x${i}" id="x${i}" class="flex-1 p-2 border border-gray-300 rounded-md">
        <input type="number" placeholder="y${i}" id="y${i}" class="flex-1 p-2 border border-gray-300 rounded-md">
      </div>`;
  }
}

function calcularNewton() {
  const num = parseInt(document.getElementById('numPuntos').value);
  const xVal = parseFloat(document.getElementById('xCalcular').value);
  let xs = [], ys = [];

  for (let i = 0; i < num; i++) {
    const x = parseFloat(document.getElementById(`x${i}`).value);
    const y = parseFloat(document.getElementById(`y${i}`).value);
    if (isNaN(x) || isNaN(y)) {
      document.getElementById('resultado').textContent = 'Por favor, completa todos los campos correctamente.';
      return;
    }
    xs.push(x);
    ys.push(y);
  }

  // Calcular diferencias divididas
  let coef = ys.slice(); // Copia de ys
  for (let j = 1; j < num; j++) {
    for (let i = num - 1; i >= j; i--) {
      coef[i] = (coef[i] - coef[i - 1]) / (xs[i] - xs[i - j]);
    }
  }

  // Evaluar el polinomio en xVal
  let resultado = coef[num - 1];
  for (let i = num - 2; i >= 0; i--) {
    resultado = resultado * (xVal - xs[i]) + coef[i];
  }

  document.getElementById('resultado').textContent = `P(${xVal}) = ${resultado.toFixed(4)}`;
}
