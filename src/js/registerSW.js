export default function registerSW(){
  document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {

      navigator.serviceWorker.register('sw.js')
        .then(function (registration) {
          // console.log('Service worker registered');

          registration.addEventListener('updatefound', function() {
            const installingWorker = registration.installing;
            // console.log('A new service worker is being installed:', installingWorker);

            installingWorker.addEventListener("statechange", () => {
              if ( installingWorker.state == 'installed' ){
                // console.log('status: instalado');
                installingWorker.postMessage({ action: "skipWaiting" });
              }
            }); 

          });

        })
        .catch(function () {
          console.warn('Service worker failed');
        });

      navigator.serviceWorker.addEventListener("controllerchange", function() {
        window.location.reload();
      });

    }
  });
}