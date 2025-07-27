import {
  ModalPageHeader,
  Image,
  Title,
  Text,
  Div,
  Progress,
  SimpleCell,
  Spacing,
  Group
} from '@vkontakte/vkui';
import { AppModalCloseBtn } from '../';
import { CatBreed } from '../../types/cats';
import styles from './CatDetailModal.module.css';

interface Props {
  breed: CatBreed;
  onClose: () => void;
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

const CatDetailModal = ({ breed, onClose }: Props) => {
  return (
    <>
      <ModalPageHeader after={<AppModalCloseBtn onClose={onClose} />}>
        {breed.name}
      </ModalPageHeader>
      
      <Div>
        <div className={styles.imageContainer}>
          <Image src={breed.image} alt={breed.name} className={styles.image} />
        </div>
        
        <Spacing size={16} />
        
        <Title level="2">{breed.name}</Title>
        <Text className={styles.description}>{breed.description}</Text>
        
        <Spacing size={16} />
        
        <Group header="Основная информация">
          <SimpleCell disabled>
            <div className={styles.info}>
              <Text weight="2">Происхождение:</Text> {breed.origin}
            </div>
          </SimpleCell>
          
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
        </Group>
        
        <Group header="Характеристики">
          <div className={styles.characteristics}>
            {Object.entries(breed.characteristics).map(([key, value]) => (
              <div key={key} className={styles.characteristic}>
                <Text className={styles.characteristicLabel}>
                  {characteristicLabels[key as keyof typeof characteristicLabels]}
                </Text>
                <div className={styles.progressContainer}>
                  <Progress value={value * 20} className={styles.progress} />
                  <Text className={styles.progressValue}>{value}/5</Text>
                </div>
              </div>
            ))}
          </div>
        </Group>
        
        <Spacing size={20} />
      </Div>
    </>
  );
};

export default CatDetailModal;