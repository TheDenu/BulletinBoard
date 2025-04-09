import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'd41d4060fddf83f3ca23',
    cluster: 'eu',
    forceTLS: true,
});
