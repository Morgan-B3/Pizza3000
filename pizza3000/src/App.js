import React from 'react'
import "./stylesheets/App.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NewOrder from './pages/NewOrder';
import Orders from './pages/Orders';
import Payment from './pages/Payment';
import Header from './components/Header';

const App = () => {

  return (
    <BrowserRouter>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/nouvelle-commande/:id" element={<NewOrder/>} />
          <Route path="/commandes" element={<Orders/>} />
          <Route path="/paiement" element={<Payment/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
