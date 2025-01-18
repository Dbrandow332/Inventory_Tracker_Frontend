import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from '../API/axios'; // Import the Axios instance

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', count: 0 });

  // Fetch inventory data
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('/inventory'); // Base URL is already set
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const addItem = async () => {
    try {
      console.log('Sending data:', newItem); // Log the payload
      await axios.post('/inventory', newItem);
      fetchInventory();
      setNewItem({ name: '', count: 0 });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };  

  const removeItem = async (id) => {
    try {
      await axios.delete(`/inventory/${id}`);
      fetchInventory();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const updateItemCount = async (id, newCount) => {
    try {
      await axios.put(`/inventory/${id}`, { count: newCount });
      fetchInventory();
    } catch (error) {
      console.error('Error updating item count:', error);
    }
  };

  return (
    <div>
      <h2>Inventory</h2>

      <h3>Add Item</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addItem();
        }}
      >
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Item Count"
          value={newItem.count || ''}
          onChange={(e) => setNewItem({ ...newItem, count: parseInt(e.target.value, 10) })}
          required
        />
        <button type="submit">Add Item</button>
      </form>

      <h3>Manage Inventory</h3>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            {item.name}: {item.count}
            <button onClick={() => removeItem(item.id)}>Remove</button>
            <button onClick={() => updateItemCount(item.id, item.count + 1)}>+1</button>
            <button onClick={() => updateItemCount(item.id, item.count - 1)}>-1</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;