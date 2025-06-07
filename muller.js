function calcularMuller() {
  const fxStr = document.getElementById('funcion').value;
  let x0 = parseFloat(document.getElementById('x0').value);
  let x1 = parseFloat(document.getElementById('x1').value);
  let x2 = parseFloat(document.getElementById('x2').value);
  const tol = parseFloat(document.getElementById('tol').value);
  const maxIter = parseInt(document.getElementById('maxIter').value);

  document.getElementById('funcionMostrada').textContent = fxStr;

  const f = math.compile(fxStr);
  let pasos = `Iteraciones:\n`;
  let i = 0;
  let error = tol + 1;

  while (error > tol && i < maxIter) {
    let f0 = f.evaluate({ x: x0 });
    let f1 = f.evaluate({ x: x1 });
    let f2 = f.evaluate({ x: x2 });

    let h1 = x1 - x0;
    let h2 = x2 - x1;
    let d1 = (f1 - f0) / h1;
    let d2 = (f2 - f1) / h2;
    let a = (d2 - d1) / (h2 + h1);
    let b = a * h2 + d2;
    let c = f2;

    let disc = Math.sqrt(b * b - 4 * a * c);
    let den = Math.abs(b + disc) > Math.abs(b - disc) ? b + disc : b - disc;
    if (den === 0) {
      pasos += `División por cero en iteración ${i}\n`;
      break;
    }

    let dx = -2 * c / den;
    let x3 = x2 + dx;

    error = Math.abs(dx);
    pasos += `i=${i} | x=${x3.toFixed(6)} | f(x)=${f.evaluate({ x: x3 }).toFixed(6)} | error=${error.toFixed(6)}\n`;

    x0 = x1;
    x1 = x2;
    x2 = x3;
    i++;
  }

  document.getElementById('resultado').innerHTML = `Raíz encontrada: <strong>x = ${x2.toFixed(6)}</strong>`;
  document.getElementById('pasos').textContent = pasos;
}
