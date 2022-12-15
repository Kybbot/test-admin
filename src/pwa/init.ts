if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);

        if (registration.active) {
          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            console.log('SW registered - new version found');

            installingWorker?.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed') {
                console.log('SW registered - new version installed');
                window.location.reload();
              }
            });
          });
        }
      })
      .catch((registrationError) => console.log('SW registration failed: ', registrationError));
  });
}
