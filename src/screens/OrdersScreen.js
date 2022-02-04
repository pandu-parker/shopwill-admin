import React from 'react'

import AdminOrders from '../components/AdminOrders'
import GoBack from '../components/GoBack'

const OrdersScreen = () => {
    return (
        <div className='container'>
             <GoBack />
             
            <AdminOrders />
        </div>
    )
}

export default OrdersScreen
