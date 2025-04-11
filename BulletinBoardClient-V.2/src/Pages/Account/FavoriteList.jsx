import React, { useState, useEffect } from 'react';
import AccountItem from './AccountItem.jsx';
import { loadFavoriteAd } from '../../utils/api.jsx';


function FavoriteList() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        handleLoadYourAd();
    }, []);

    const handleLoadYourAd = async () => {
        setLoading(true)
        const response = await loadFavoriteAd();
        const data = await response.json()

        if (response.status !== 200) {
            const data = response.text()
            setError(data);
        } else {
            setAds(data);
        }
        setLoading(false)
    };

    if (loading) return <p className='text-center'>Загрузка...</p>;
    if (error) return <p className='text-danger text-center'>Ошибка: {error}</p>;

    return (
        <div className='container'>
            <h2 className='m-4'>Избранное</h2>
            {ads.length === 0 ? (
                <p className='text-center fst-italic text-muted'>Нет объявлений.</p>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                    {ads.map(ad => (
                        <div key={ad.id} className="col">
                            <AccountItem ad={ad} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


export default FavoriteList;
