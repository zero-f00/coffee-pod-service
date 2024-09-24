import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import ProductDetail from './views/ProductDetail';
import About from './views/About';
import FAQ from './views/FAQ';
import Contact from './views/Contact';
import Survey from './views/Survey';
import Login from 'views/Login';
import MyPage from 'views/MyPage';
import Subscription from 'views/Subscription';
import Order from './views/Order';

const App = () => {
  const productsSectionRef = useRef<HTMLElement | null>(null);

  // 商品セクションへのスクロール関数
  const scrollToProducts = () => {
    if (productsSectionRef.current) {
      const offsetTop = productsSectionRef.current.getBoundingClientRect().top + window.scrollY;
      const headerOffset = window.innerWidth <= 676 ? 50 : 80; // 676px以下の時に調整
      window.scrollTo({
        top: offsetTop - headerOffset,
        behavior: 'smooth',
      });
    }
  };


  return (
    <Router>
      <div className="App">
        <Header scrollToProducts={scrollToProducts} scrollToFAQ={() => { }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/" element={<Home productsSectionRef={productsSectionRef} />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/order/:productId" element={<Order />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
