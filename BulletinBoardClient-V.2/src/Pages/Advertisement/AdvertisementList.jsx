import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdvertisementItem from './AdvertisementItem.jsx';
import { loadAd, deleteAd } from '../../utils/api.jsx';


function AdvertisementList() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        handleLoadAd();
    }, []);

    const handleLoadAd = async () => {
        setLoading(true)
        const response = await loadAd();
        const data = await response.json()
        console.log(data);

        if (response.status !== 200) {
            const data = response.text()
            setError(data);
        } else {
            setAds(data);
        }
        setLoading(false)

    };

    const handleDeleteAd = async (id) => {
        await deleteAd(id);

        setAds(ads.filter(ad => ad.id !== id));

        handleLoadAd();
    };

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
                <button >Сортировать по цене ↑</button>
                <button >Сортировать по цене ↓</button>
                <button >Сортировать по дате ↓</button>
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
