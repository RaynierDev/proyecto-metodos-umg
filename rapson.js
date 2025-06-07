function calcularNewtonModificado() {
  const fxStr = document.getElementById('funcion').value;
  const dfxStr = document.getElementById('derivada').value;
  let x = parseFloat(document.getElementById('x0').value);
  const tol = parseFloat(document.getElementById('tol').value);
  const maxIter = parseInt(document.getElementById('maxIter').value);

  document.getElementById('funcionMostrada').textContent = fxStr;

  const f = math.compile(fxStr);
  const df = math.compile(dfxStr);
  let pasos = `Iteraciones:\n`;
  let i = 0;
  let error = tol + 1;

  const dfx0 = df.evaluate({ x }); // Derivada evaluada una vez
  if (dfx0 === 0) {
    pasos += `Derivada inicial es cero.\n`;
    document.getElementById('resultado').textContent = 'Error: derivada cero en el punto inicial.';
    document.getElementById('pasos').textContent = pasos;
    return;
  }

  while (error > tol && i < maxIter) {
    let fx = f.evaluate({ x });
    let x1 = x - fx / dfx0;
    error = Math.abs(x1 - x);
    pasos += `i=${i} | x=${x.toFixed(6)} | f(x)=${fx.toFixed(6)} | error=${error.toFixed(6)}\n`;
    x = x1;
    i++;
  }

  document.getElementById('resultado').innerHTML = `Raíz encontrada: <strong>x = ${x.toFixed(6)}</strong>`;
  document.getElementById('pasos').textContent = pasos;
}
