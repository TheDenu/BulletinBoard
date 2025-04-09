/*import { useEffect } from 'react';
import Echo from 'laravel-echo';

const usePusherChannel = (channelName, eventHandler) => {
    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel(channelName);
            channel.listen('NewAdvertisementCreated', eventHandler);

            return () => {
                window.Echo.leave(channelName);
            };
        }
    }, [channelName, eventHandler]);
};

export default usePusherChannel;*/
