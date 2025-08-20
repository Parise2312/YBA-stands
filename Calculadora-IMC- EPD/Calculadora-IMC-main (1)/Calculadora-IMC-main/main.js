function calcular() {
  const pesoInput = document.getElementById("peso");
  const alturaInput = document.getElementById("altura");

  const peso = parseFloat(pesoInput.value);
  const altura = parseFloat(alturaInput.value);

  // Verificação de valores inválidos
  if (isNaN(peso) || isNaN(altura) || altura <= 0) {
    document.getElementById("result").innerHTML = "ingressar um valor válido";
    return;
  }

  const imc = peso / Math.pow(altura, 2);
  const imcRedondeado = imc.toFixed(2);

  document.getElementById("result").innerHTML = `Seu IMC é ${imcRedondeado}`;

  const imagen = document.querySelector("img");

  imagen.src = imc >= 25
  ? "img/barriga.webp"
  : imc >= 20
    ? "img/saudavel.jpg"
    : imc <= 18.5
      ? "img/magro.jpg"
      : imc > 0
        ? "gato2.jpg"
        : "gato2.jpg";
}
