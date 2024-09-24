document.getElementById('get-location').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationDiv = document.getElementById('location');
        locationDiv.innerHTML = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
      },
      () => {
        alert('Erro ao obter a localização.');
      },
    );
  } else {
    alert('Geolocalização não é suportada por este navegador.');
  }
});

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photoDiv = document.getElementById('photo');

document.getElementById('take-photo').addEventListener('click', () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.style.display = 'block';
        video.play();

        const context = canvas.getContext('2d');
        setTimeout(() => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          video.style.display = 'none';
          canvas.style.display = 'block';
          photoDiv.innerHTML = `<img src="${canvas.toDataURL()}" alt="Foto capturada"/>`;
        }, 1000);
      })
      .catch((err) => {
        console.log('Erro ao acessar a câmera: ' + err);
      });
  } else {
    alert('Câmera não é suportada por este navegador.');
  }
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}
