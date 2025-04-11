import React from 'react'

function AdvertisementItem({ ad, onDelete }) {
    /*
    {ad.photos && ad.photos.length > 0 && (
                    <div className="row">
                        {ad.photos.map((photo, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <img className='w-50' src={photo.photo_path} alt={`Фотография ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                )}
    */
    return (
        <div className='card mb-2'>
            <div className='card-header'>
                <img className='w-100' src={ad.photos[0].photo_path} alt={'Фотография'} />

            </div>
            <div className='card-body'>
                <div className="row justify-content-between">
                    <div className="col-md-4 mb-3">
                        <h3 className='mb-0'>{ad.name}</h3>
                    </div>
                    <div className="col-md-4 mb-3">
                        <button
                            className='btn btn-danger btn-sm'
                        >
                            Лайкнуть
                        </button>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <p><b>{ad.price} $</b></p>
                </div>

            </div>
        </div>
    )
}

export default AdvertisementItem
