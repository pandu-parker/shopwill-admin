import React from 'react'
import AdminCategories from '../components/AdminCategories'
import GoBack from '../components/GoBack'

const CategoriesScreen = () => {
    return (
        <div className='container'>
             <GoBack />
            <AdminCategories />
        </div>
    )
}

export default CategoriesScreen
