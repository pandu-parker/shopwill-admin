import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header'
import Footer from './components/Footer'

import EditProductScreen from './screens/EditProductScreen';
import BannerScreen from './screens/BannerScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import OrdersScreen from './screens/OrdersScreen';
import HNSListScreen from './screens/HSNListScreen';

import './styles/App.scss'
import DealsScreen from './screens/DealsScreen';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Route path='/' component={DashboardScreen} exact/>
        <Route path='/login' component={LoginScreen}  />
        <Route path='/admin/deals' component={DealsScreen}  />
        <Route path='/admin/banner' component={BannerScreen} />
        <Route path='/admin/categories' component={CategoriesScreen} />
        <Route path='/admin/orders' component={OrdersScreen} />
        <Route path='/admin/products/' component={ProductScreen} exact/>
        <Route path='/admin/products/edit/:id' component={EditProductScreen} />
        <Route path='/admin/hsn/' component={HNSListScreen} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
