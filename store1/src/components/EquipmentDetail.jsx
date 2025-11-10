
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'https://recensa.ru/api/equipments/';

export default function EquipmentDetail() {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => String(item.id) === String(id));
        setEquipment(found);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!equipment) return <p>Оборудование не найдено</p>;

  return (
    <div className="equipment-detail">
      <Link to="/" className="back-link">← Назад к списку</Link>
      <h1>{equipment.name}</h1>
      <img
        src={equipment.image_card}
        alt={equipment.image_card_alt}
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
      />

     
      <div
        className="equipment-description"
        dangerouslySetInnerHTML={{ __html: equipment.description }}
      />

      
      {equipment.extra_description && (
        <div
          className="equipment-extra-description"
          dangerouslySetInnerHTML={{ __html: equipment.extra_description }}
        />
      )}
    </div>
  );
}