function crearCamposNeville() {
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

function calcularNeville() {
  const num = parseInt(document.getElementById('numPuntos').value);
  const xVal = parseFloat(document.getElementById('xCalcular').value);
  let xs = [], ys = [];

  for (let i = 0; i < num; i++) {
    const x = parseFloat(document.getElementById(`x${i}`).value);
    const y = parseFloat(document.getElementById(`y${i}`).value);
    if (isNaN(x) || isNaN(y)) {
      document.getElementById('resultado').textContent = 'Por favor, completa todos los campos correctamente.';
      document.getElementById('funcionGenerada').textContent = '';
      return;
    }
    xs.push(x);
    ys.push(y);
  }

  // Método de Neville
  let P = Array(num).fill(0).map(() => Array(num).fill(0));
  for (let i = 0; i < num; i++) {
    P[i][0] = ys[i];
  }

  for (let j = 1; j < num; j++) {
    for (let i = 0; i < num - j; i++) {
      P[i][j] = ((xVal - xs[i + j]) * P[i][j - 1] + (xs[i] - xVal) * P[i + 1][j - 1]) / (xs[i] - xs[i + j]);
    }
  }

  const resultado = P[0][num - 1];
  document.getElementById('resultado').innerHTML = `P(${xVal}) = ${resultado.toFixed(6)}`;

  // Mostrar función generada estilo Lagrange (simplificada)
  document.getElementById('funcionGenerada').textContent = generarFuncionLagrangeSimplificada(xs, ys);
}

function generarFuncionLagrangeSimplificada(xs, ys) {
  const algebra = window.algebra;
  let total = new algebra.Expression();

  for (let i = 0; i < xs.length; i++) {
    let Li = new algebra.Expression(1);
    let den = 1;

    for (let j = 0; j < xs.length; j++) {
      if (i !== j) {
        Li = Li.multiply(new algebra.Expression('x').subtract(xs[j]));
        den *= (xs[i] - xs[j]);
      }
    }

    const termino = Li.divide(den).multiply(ys[i]);
    total = total.add(termino);
  }

  return total.simplify().toString();
}
