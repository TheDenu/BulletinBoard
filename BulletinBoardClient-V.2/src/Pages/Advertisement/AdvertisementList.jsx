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

    const sortAds = (ads, order) => {
        if (order === 'asc') {
            return [...ads].sort((a, b) => a.price - b.price);
        } else {
            return [...ads].sort((a, b) => b.price - a.price);
        }
    };

    const handleSortPriceAsc = () => {
        const sortedAds = sortAds(ads, 'asc');
        setAds(sortedAds);
    };

    const handleSortPriceDesc = () => {
        const sortedAds = sortAds(ads, 'desc');
        setAds(sortedAds);
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
            <div className="d-flex gap-2 p-2">
                <button className="btn btn-outline-primary btn-sm" onClick={handleSortPriceAsc}>Сортировать по цене ↑</button>
                <button className="btn btn-outline-primary btn-sm" onClick={handleSortPriceDesc}>Сортировать по цене ↓</button>
            </div>
            <h2>Объявления для вас</h2>
            {ads.length === 0 ? (
                <p className='text-center fst-italic text-muted'>Нет объявлений.</p>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                    {ads.map(ad => (
                        <div key={ad.id} className="col">
                            <AdvertisementItem ad={ad} onDelete={handleDeleteAd} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


export default AdvertisementList;
