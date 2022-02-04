import React from 'react'
import AdminBanner from '../components/AdminBanner'
import GoBack from '../components/GoBack'

const BannerScreen = () => {
    return (
        <div className='container'>
            <GoBack />
            <AdminBanner />
        </div>
    )
}

export default BannerScreen
