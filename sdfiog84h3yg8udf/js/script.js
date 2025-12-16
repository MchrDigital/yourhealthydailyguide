(function () {
  const viewerNumberEl = document.getElementById("viewer-number");

  const baseNumber = 600;
  const variationLimit = 50;
  let currentCount = baseNumber;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function updateViewerCount() {
    // Gera um número aleatório entre 1 e 5
    const changeAmount = getRandomInt(1, 5);

    // Define o sinal: +1 ou -1 (random)
    const sign = Math.random() < 0.5 ? -1 : 1;

    // Atualiza o contador com limite
    currentCount += sign * changeAmount;

    // Garante que o valor fique dentro dos limites (base ± variationLimit)
    if (currentCount > baseNumber + variationLimit) {
      currentCount = baseNumber + variationLimit;
    } else if (currentCount < baseNumber - variationLimit) {
      currentCount = baseNumber - variationLimit;
    }

    // Atualiza no HTML
    viewerNumberEl.textContent = currentCount;

    // Próxima atualização: entre 3000 e 5000 ms
    const nextUpdateInMs = getRandomInt(3000, 5000);
    setTimeout(updateViewerCount, nextUpdateInMs);
  }

  // Inicializa o contador com valor base
  viewerNumberEl.textContent = currentCount;

  // Inicia o loop
  setTimeout(updateViewerCount, getRandomInt(3000, 5000));
})();

(function () {
  // Seleciona o container do cronômetro e o elemento que mostra o tempo
  const timerContainer = document.getElementById("countdown-timer");
  const timerDisplay = document.getElementById("timer-display");

  // Total de segundos para 30 minutos
  const totalSeconds = 30 * 60;

  // Variável para armazenar o tempo restante (inicialmente 30 minutos)
  let timeLeft = totalSeconds;

  let countdownInterval = null;

  // Função para formatar segundos em MM:SS
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  // Função que inicia o cronômetro
  function startCountdown() {
    if (countdownInterval !== null) return; // evita múltiplos timers

    countdownInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        timerDisplay.textContent = "00:00";
        return;
      }

      timeLeft--;
      timerDisplay.textContent = formatTime(timeLeft);
    }, 1000);
  }

  // Função para observar mudanças na classe do container
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.attributeName === "class" &&
        !timerContainer.classList.contains("esconder")
      ) {
        // Quando a classe esconder for removida, inicia o timer
        startCountdown();
      }
    }
  });

  // Começa a observar o elemento pelo atributo class
  observer.observe(timerContainer, { attributes: true });
})();

// Interactive FAQ behavior

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const parent = button.parentElement;
    const isActive = parent.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });

    if (!isActive) {
      parent.classList.add("active");
    }
  });

  button.addEventListener("mouseenter", () => {
    button.parentElement.classList.add("hover");
  });

  button.addEventListener("mouseleave", () => {
    button.parentElement.classList.remove("hover");
  });
});
