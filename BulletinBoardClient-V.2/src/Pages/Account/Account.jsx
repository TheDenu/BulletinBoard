import React, { useState } from 'react';
import AccountList from "./AccountList";
import AccountFormAdd from "./AccountFormAdd"; 


export function Account() {
    const [activeTab, setActiveTab] = useState('myAds');

    const handleMyAds = () => setActiveTab('myAds');
    const handleAddAd = () => setActiveTab('addAd');
    const handleFavoriteAds = () => setActiveTab('favoriteAds');

    const handleAdCreated = () => {
        setActiveTab('myAds');
    };

    return (
        <main className="container" style={{ height: '90vh' }}>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='container-fluid'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <button
                                className={`btn ${activeTab === 'myAds' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                                onClick={handleMyAds}
                            >
                                Мои объявления
                            </button>
                        </li>
                        <li className='nav-item'>
                            <button
                                className={`btn ${activeTab === 'addAd' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                                onClick={handleAddAd}
                            >
                                Добавить объявление
                            </button>
                        </li>
                        <li className='nav-item'>
                            <button
                                className={`btn ${activeTab === 'favoriteAds' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                                onClick={handleFavoriteAds}
                            >
                                Избранные объявления
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            {activeTab === 'myAds' && <AccountList />}
            {activeTab === 'addAd' && <AccountFormAdd onAdCreated={handleAdCreated} />}
            {activeTab === 'favoriteAds' && <FavoriteAds />}
        </main>
    );
}
