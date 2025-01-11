import React,{useState,useEffect} from 'react'
import '../Stock/stock.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchStock } from '../../redux/slices/stockSlice';// Adjust path if needed
import axios from 'axios';

function Stock() {

  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.stock);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedStock, setUpdatedStock] = useState('');
  
  useEffect(() => {
    dispatch(fetchStock());
  }, [dispatch]);
  
  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setUpdatedStock(product.stock);
    setShowForm(true);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.put(`http://localhost:3000/api/stock/${selectedProduct.id}`, {
        stock: updatedStock,
      });
  
      dispatch(fetchStock());
      setShowForm(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to update stock:', error);
    }
  };
  
  if (status === 'loading') return <p>Loading stock data...</p>;
  if (status === 'failed') return <p>Failed to load stock data.</p>;
  

  return (
    <div className='stock-page'>
      <h1 className='stock-heading'>STOCK</h1>
      <div className='stock-table-flex'>
        <div className='stock-table-container'>
          <div className='stock-table-head'>
            <div className='product-id table-heading'>ID:</div>
            <div className='product-name table-heading table-heading2'>Product Name:</div>
            <div className='product-stock table-heading table-heading2'>Stock Available:</div>
          </div>
          {items.map((product) => (
              <div key={product.id} className="stock-row">
                <div className="product-id-data product-data">{product.id}</div>
                <div className="product-name-data product-data product-data2">{product.name}</div>
                <div className="product-stock-data product-data product-data2">{product.stock}</div>
              </div>
          ))}
        </div>
      </div>
      <div className='update-btn'>
        <button>Update stock</button>
      </div>
    </div>

  )
}

export default Stock;
