import Echo from 'laravel-echo';
 
import Pusher from 'pusher-js';
window.Pusher = Pusher;
 
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
});

//Mostrar en consola el estatus de la conexión
window.Echo.connector.pusher.connection.bind('connected', () => {
    console.log('Conectado a Pusher');
});

//Mostrar en consola el estatus de la conexión
window.Echo.connector.pusher.connection.bind('disconnected', () => {
    console.log('Desconectado de Pusher');
});
