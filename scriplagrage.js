function crearCampos() {
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

function calcularLagrange() {
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

  let resultado = 0;
  for (let i = 0; i < num; i++) {
    let Li = 1;
    for (let j = 0; j < num; j++) {
      if (i !== j) {
        Li *= (xVal - xs[j]) / (xs[i] - xs[j]);
      }
    }
    resultado += ys[i] * Li;
  }

  document.getElementById('resultado').textContent = `P(${xVal}) = ${resultado.toFixed(4)}`;
}
