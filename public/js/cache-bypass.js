if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (var registration of registrations) {
      registration.unregister().then(function(boolean) {
        console.log('Orphaned Service Worker unregistered in head:', boolean);
        if (boolean) {
          window.location.reload();
        }
      });
    }
  });
}
if ('caches' in window) {
  caches.keys().then(function(names) {
    for (var name of names) {
      caches.delete(name).then(function(success) {
        console.log('Persistent Cache Storage purged:', name, success);
      });
    }
  });
}
