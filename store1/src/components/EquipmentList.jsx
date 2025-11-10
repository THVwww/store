// src/components/EquipmentList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://recensa.ru/api/equipments/';

export default function EquipmentList() {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setEquipments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки оборудования:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;

  const visibleEquipments = showAll ? equipments : equipments.slice(0, 6);

  return (
    <section className="equipment-section">
      <h2>Оборудование</h2>
      <div className="equipment-grid">
        {visibleEquipments.map(item => (
          <Link to={`/equipment/${item.id}`} key={item.id} className="equipment-card">
            <img src={item.image_card} alt={item.image_card_alt} title={item.image_card_alt} />
            <h3>{item.name}</h3>
          </Link>
        ))}
      </div>
      {!showAll && equipments.length > 6 && (
        <button onClick={() => setShowAll(true)} className="show-all-btn">
          Смотреть все
        </button>
      )}
    </section>
  );
}