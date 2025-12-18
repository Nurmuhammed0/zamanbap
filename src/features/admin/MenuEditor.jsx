import React, { useState } from 'react';
import { useMenuStore } from '../../store/menuStore';

function MenuEditor() {
  const categories = useMenuStore((state) => state.categories);
  const items = useMenuStore((state) => state.items);
  const { addItem, updateItem, deleteItem, toggleItemAvailability } = useMenuStore.getState();
  const [formState, setFormState] = useState({ name: '', price: '', categoryId: '', description: '', imageUrl:'' });
  const [isEditing, setIsEditing] = useState(null);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = { 
        ...formState, 
        price: Number(formState.price), 
        isAvailable: true, 
        imageUrl: formState.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop', 
        options: [] 
    };
    if (isEditing) {
      updateItem(isEditing, itemData);
    } else {
      addItem(itemData);
    }
    handleCancel();
  };

  const handleEdit = (item) => {
    setIsEditing(item.id);
    setFormState({ name: item.name, price: item.price, categoryId: item.categoryId, description: item.description, imageUrl: item.imageUrl });
  };
  
  const handleCancel = () => {
    setIsEditing(null);
    setFormState({ name: '', price: '', categoryId: '', description: '', imageUrl: '' });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Менюну өзгөртүү</h1>

      {/* Add/Edit Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">{isEditing ? "Тамакты өзгөртүү" : "Жаңы тамак кошуу"}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={formState.name} onChange={handleInputChange} placeholder="Аты" className="p-2 border rounded" required />
          <input name="price" value={formState.price} onChange={handleInputChange} placeholder="Баасы" type="number" className="p-2 border rounded" required />
          <select name="categoryId" value={formState.categoryId} onChange={handleInputChange} className="p-2 border rounded" required>
            <option value="">Категорияны тандаңыз</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <input name="imageUrl" value={formState.imageUrl} onChange={handleInputChange} placeholder="Сүрөттүн URL дареги" className="p-2 border rounded" />
          <textarea name="description" value={formState.description} onChange={handleInputChange} placeholder="Сүрөттөмөсү" className="p-2 border rounded md:col-span-2" />
          <div className="md:col-span-2 flex flex-wrap justify-end space-x-0 sm:space-x-2">
            {isEditing && <button type="button" onClick={handleCancel} className="w-full sm:w-auto px-4 py-2 bg-gray-300 rounded mb-2 sm:mb-0">Артка</button>}
            <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded">{isEditing ? "Сактоо" : "Кошуу"}</button>
          </div>
        </form>
      </div>
      
      {/* Menu List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Менюдагы тамактар</h2>
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex flex-col md:flex-row justify-between items-center p-2 border-b hover:bg-gray-50">
              <div className="flex items-center space-x-4 mb-2 md:mb-0">
                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded object-cover"/>
                <div>
                  <p className={`font-semibold ${!item.isAvailable && 'line-through text-gray-400'}`}>{item.name}</p>
                  <p className="text-sm text-gray-500">{item.price} сом</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-2 w-full sm:w-auto">
                <button onClick={() => toggleItemAvailability(item.id)} className={`px-3 py-1 text-white text-sm rounded mb-1 sm:mb-0 w-full sm:w-auto ${item.isAvailable ? 'bg-gray-400' : 'bg-green-500'}`}>{item.isAvailable ? 'Жашыруу' : 'Көрсөтүү'}</button>
                <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-blue-500 text-white text-sm rounded mb-1 sm:mb-0 w-full sm:w-auto">Өзгөртүү</button>
                <button onClick={() => deleteItem(item.id)} className="px-3 py-1 bg-red-500 text-white text-sm rounded w-full sm:w-auto">Өчүрүү</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuEditor;
