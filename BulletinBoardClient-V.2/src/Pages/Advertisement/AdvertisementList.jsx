import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdvertisementItem from './AdvertisementItem.jsx';
import { loadAd, deleteAd } from '../../utils/api.jsx';
//import usePusherChannel from '../../utils/usePusherChannel.jsx';

function AdvertisementList() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [sort, setSort] = useState('asc');
    const [field, setField] = useState('price');

    useEffect(() => {
        handleLoadAd();
    },[]);
    /*
        useEffect(() => {
            console.log(window.Echo.connector.pusher.connection.state);
    
            if (window.Echo) {
                const channel = window.Echo.channel('advertisements');
                channel.listen('NewAdvertisementCreated', handleNewAdvertisement);
    
                return () => {
                    window.Echo.leave('advertisements');
                };
            }
        }, []);
    */
    const handleLoadAd = async () => {
        setLoading(true);
        try {
            const response = await loadAd();
            console.log(response);
            setAds(response);
        } catch (err) {
            setError(err.message);
            setLoading(false); 
        }
    };

    const handleDeleteAd = async (id) => {
        await deleteAd(id);

        setAds(ads.filter(ad => ad.id !== id));

        handleLoadAd();
    };

    const handleSortPriceAsc = () => {
        setSort('asc');
        setField('price');
    };

    const handleSortPriceDesc = () => {
        setSort('desc');
        setField('price');
    };

    const handleSortDateDesc = () => {
        setSort('desc');
        setField('created_at');
    };

    /*
    const handleNewAdvertisement = (e) => {
        console.log('Событие получено:', e);
        setAds(prevAds => [...prevAds, e.advertisement]);
        alert('Новое объявление добавлено!');
    };
*/
    //usePusherChannel('advertisements', handleNewAdvertisement);

    if (loading) return <p className='text-center'>Загрузка...</p>;
    if (error) return <p className='text-danger text-center'>Ошибка: {error}</p>;

    return (
        <div className='container'>
            <h2 className='text-center mb-4'>Список объявлений</h2>
            <button
                className='btn btn-primary mb-3'
                onClick={() => navigate('/create')}
            >
                Добавить объявление
            </button>
            <div>
                <button onClick={handleSortPriceAsc}>Сортировать по цене ↑</button>
                <button onClick={handleSortPriceDesc}>Сортировать по цене ↓</button>
                <button onClick={handleSortDateDesc}>Сортировать по дате ↓</button>
            </div>
            {ads.length === 0 ? (
                <p className='text-center fst-italic text-muted'>Нет объявлений.</p>
            ) : (
                ads.map(ad => (
                    <AdvertisementItem
                        key={ad.id}
                        ad={ad}
                        onDelete={handleDeleteAd}
                    />
                ))
            )}
        </div>
    );
}


export default AdvertisementList;
