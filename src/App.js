import logo from './logo.svg';
import './App.css';
import ListProductComponent from './components/ListProductComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateProductComponent from './components/CreateProductComponent';
import UpdateProductComponent from './components/UpdateProductComponent';
import ViewProductComponent from './components/ViewProductComponent';


function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" exact element={<ListProductComponent />}></Route>
            <Route path="/products" exact element={<ListProductComponent />}></Route>
            <Route path="/add-products" exact element={<CreateProductComponent />}></Route>
            <Route path="/update-products/:id" exact element={<UpdateProductComponent />}></Route>
            <Route path="/view-products/:id" exact element={<ViewProductComponent />}></Route>

          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
