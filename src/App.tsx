import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Features from './pages/Features';
import Shop from './pages/Shop';
import Showroom from './pages/Showroom';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/funcionalidades" element={<Features />} />
        <Route path="/comprar" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/showroom" element={<Showroom />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
