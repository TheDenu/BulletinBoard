import React from 'react'

function AccountItem({ ad, onDelete }) {
    return (
        <div className='card mb-2 shadow'>
            <div className='card-header border-0'>
                <img className='w-100 card-img-top rounded-top' src={ad.photos[0].photo_path} alt={'Фотография'} />
            </div>
            <div className='card-body'>
                <div className="row align-items-center">
                    <div className="col-md-6 mb-3">
                        <h3 className='mb-0 card-title fw-bold'>{ad.name}</h3>
                    </div>
                    <div className="col-md-6 mb-3">
                        <p className='fs-5 fw-bold'>{ad.price} $</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button
                            className='btn btn-danger btn-sm'
                            onClick={() => onDelete(ad.id)}
                        >
                            Удалить
                        </button>
                    </div>
                    <div className="col-md-6 mb-3">
                        <button
                            className='btn btn-primary btn-sm'
                            onClick={() => onEdit(ad.id)}
                        >
                            Редактировать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountItem
