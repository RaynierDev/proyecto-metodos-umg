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

  let expr = new algebra.Expression(0);

  for (let i = 0; i < num; i++) {
    let term = new algebra.Expression(ys[i]);
    for (let j = 0; j < num; j++) {
      if (i !== j) {
        let numerator = new algebra.Expression('x').subtract(xs[j]);
        let denominator = xs[i] - xs[j];
        term = term.multiply(numerator.divide(denominator));
      }
    }
    expr = expr.add(term);
  }

  let simplified = expr.simplify();
  let evaluated = expr.eval({ x: xVal });

  document.getElementById('resultado').innerHTML = `
    <span class="block font-bold text-gray-700 mt-4">P(${xVal}) = ${evaluated}</span>
    <span class="block text-sm text-gray-700 mt-2">Función generada:</span>
    <span class="block text-sm text-gray-800 mt-1 p-2 bg-gray-100 rounded-md">${simplified.toString()}</span>
  `;
}
