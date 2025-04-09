import React from 'react'

function AdvertisementItem({ ad, onDelete }) {
    return (
        <div className='card mb-2'>
            <div className='card-header'>
                <h3 className='mb-0'>{ad.name}</h3>
            </div>
            <div className='card-body'>
                <p>Цена: {ad.price}</p> 
                <p>
                    Описание: {ad.description} 
                </p>
                <p>
                    Количество лайков: {ad.number_likes} 
                </p>

                {ad.photos && ad.photos.length > 0 && (
                    <div className="row">
                        {ad.photos.map((photo, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <img className='w-50' src={photo.image_path} alt={`Фотография ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                )}

                <button
                    className='btn btn-danger btn-sm'
                    onClick={() => onDelete(ad.id)} 
                >
                    Лайкнуть
                </button>
            </div>
        </div>
    )
}

export default AdvertisementItem
