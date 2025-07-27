import { Card, Image, Title, Text, Div, Progress, SimpleCell, Spacing } from '@vkontakte/vkui';
import { CatBreed } from '../../types/cats';
import styles from './CatCard.module.css';

interface Props {
  breed: CatBreed;
  onClick?: () => void;
}

const characteristicLabels = {
  energy: 'Энергичность',
  friendliness: 'Дружелюбие',
  shedding: 'Линька',
  playfulness: 'Игривость',
  vocality: 'Голосистость',
  independence: 'Независимость',
  grooming: 'Уход',
  childFriendly: 'Дружелюбие к детям',
  petFriendly: 'Дружелюбие к животным',
  intelligence: 'Интеллект'
};

const CatCard = ({ breed, onClick }: Props) => {
  return (
    <Card className={styles.card} onClick={onClick}>
      <div className={styles.imageContainer}>
        <Image src={breed.image} alt={breed.name} className={styles.image} />
      </div>
      <Div>
        <Title level="2" className={styles.title}>{breed.name}</Title>
        <Text className={styles.description}>{breed.description}</Text>
        
        <Spacing size={12} />
        
        <SimpleCell disabled>
          <div className={styles.info}>
            <Text weight="2">Размер:</Text> {breed.size === 'small' ? 'Маленький' : breed.size === 'medium' ? 'Средний' : 'Большой'}
          </div>
        </SimpleCell>
        
        <SimpleCell disabled>
          <div className={styles.info}>
            <Text weight="2">Вес:</Text> {breed.weight}
          </div>
        </SimpleCell>
        
        <SimpleCell disabled>
          <div className={styles.info}>
            <Text weight="2">Продолжительность жизни:</Text> {breed.lifespan}
          </div>
        </SimpleCell>
        
        <Spacing size={16} />
        
        <div className={styles.characteristics}>
          {Object.entries(breed.characteristics).slice(0, 5).map(([key, value]) => (
            <div key={key} className={styles.characteristic}>
              <Text className={styles.characteristicLabel}>
                {characteristicLabels[key as keyof typeof characteristicLabels]}
              </Text>
              <Progress value={value * 20} className={styles.progress} />
            </div>
          ))}
        </div>
      </Div>
    </Card>
  );
};

export default CatCard;