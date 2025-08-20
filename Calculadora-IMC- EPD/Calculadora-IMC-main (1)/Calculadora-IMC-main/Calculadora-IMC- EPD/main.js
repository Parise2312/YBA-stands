function calcularIMC() {
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const resultado = document.getElementById('resultado');

  // Validação básica
  if (!peso || !altura || altura <= 0) {
    resultado.textContent = "Preencha os campos corretamente!";
    return;
  }

  const imc = (peso / (altura * altura)).toFixed(2);

  let classificacao = "";

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  } else if (imc < 24.9) {
    classificacao = "Peso normal";
  } else if (imc < 29.9) {
    classificacao = "Sobrepeso";
  } else if (imc < 34.9) {
    classificacao = "Obesidade grau 1";
  } else if (imc < 39.9) {
    classificacao = "Obesidade grau 2";
  } else {
    classificacao = "Obesidade grau 3 (mórbida)";
  }

  resultado.textContent = `Seu IMC é ${imc} (${classificacao})`;
}

function limpar() {
  document.getElementById('peso').value = '';
  document.getElementById('altura').value = '';
  document.getElementById('resultado').textContent = '';
}
