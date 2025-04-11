import React, { useState, useEffect } from 'react';
import AdvertisementItem from './AdvertisementItem.jsx';
import { loadAd, likeAd } from '../../utils/api.jsx';


function AdvertisementList() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleLikeAd = async (id) => {
        setLoading(true)
        const response = await likeAd(id);

        if (response.status !== 201) {
            const data = response.text()
            alert(data);
        }
        setLoading(false)
    };

    const sortPriceAds = (ads, order) => {
        if (order === 'asc') {
            return [...ads].sort((a, b) => a.price - b.price);
        } else {
            return [...ads].sort((a, b) => b.price - a.price);
        }
    };

    const sortDataAds = (ads, order) => {
        if (order === 'asc') {
            return [...ads].sort((a, b) => a.id - b.id);
        } else {
            return [...ads].sort((a, b) => b.id - a.id);
        }
    };

    const handleSortPriceAsc = () => {
        const sortedAds = sortPriceAds(ads, 'asc');
        setAds(sortedAds);
    };

    const handleSortPriceDesc = () => {
        const sortedAds = sortPriceAds(ads, 'desc');
        setAds(sortedAds);
    };

    const handleSortDataArc = () => {
        const sortedAds = sortDataAds(ads, 'asc');
        setAds(sortedAds);
    };

    const handleSortDataDesc = () => {
        const sortedAds = sortDataAds(ads, 'desc');
        setAds(sortedAds);
    };

    if (loading) return <p className='text-center'>Загрузка...</p>;
    if (error) return <p className='text-danger text-center'>Ошибка: {error}</p>;

    return (
        <div className='container'>
            <h2 className='m-4'>Объявления для вас</h2>
            <div className="d-flex gap-2 p-2">
                <button className='btn btn-outline-primary btn-sm' onClick={handleSortPriceAsc}>Сортировать по цене ↑</button>
                <button className="btn btn-outline-primary btn-sm" onClick={handleSortPriceDesc}>Сортировать по цене ↓</button>
                <button className="btn btn-outline-primary btn-sm" onClick={handleSortDataArc}>Сортировать по дате ↑</button>
                <button className="btn btn-outline-primary btn-sm" onClick={handleSortDataDesc}>Сортировать по дате ↓</button>
            </div>
            {ads.length === 0 ? (
                <p className='text-center fst-italic text-muted'>Нет объявлений.</p>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                    {ads.map(ad => (
                        <div key={ad.id} className="col">
                            <AdvertisementItem ad={ad} onLike={handleLikeAd} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


export default AdvertisementList;
