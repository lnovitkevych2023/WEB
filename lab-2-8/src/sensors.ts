// Лабораторна №8: робота з даними з API на TypeScript

interface Sensor {
  id: string;
  name: string;
  district: string;
  noiseLevel: number;
  status: "active" | "inactive";
}

const API_URL: string = "https://6ae916991a7b15aaa50fa040.mockapi.io/liliia/WEB/sensors";

function renderSensors(sensors: Sensor[]): void {
  const container = document.querySelector<HTMLDivElement>("#sensors");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  sensors.forEach((sensor) => {
    const card = document.createElement("div");
    card.className = `sensor-card sensor-card--${sensor.status}`;

    card.innerHTML = `
      <h3>${sensor.name}</h3>
      <p>Район: ${sensor.district}</p>
      <p class="sensor-card__level">${sensor.noiseLevel} дБ</p>
      <p>Статус: ${sensor.status}</p>
    `;

    container.appendChild(card);
  });
}

function showError(message: string): void {
  const container = document.querySelector<HTMLDivElement>("#sensors");

  if (container) {
    container.innerHTML = `<p class="load-error">${message}</p>`;
  }
}

async function loadSensors(): Promise<void> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Не вдалося завантажити сенсори (HTTP ${response.status})`);
    }

    const sensors: Sensor[] = await response.json();
    console.log("Отримано сенсорів:", sensors.length);

    renderSensors(sensors);
  } catch (error) {
    console.error("Помилка:", error);
    showError("Не вдалося завантажити дані.");
  }
}

loadSensors();
