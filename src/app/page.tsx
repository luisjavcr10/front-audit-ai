import styles from './page.module.scss';
import { Presentation } from '@/components/Private/home/Presentation';
import { FeatureCard } from '@/components/Private/home/FeatureCard';

const infoCards=[
  {title:'Fast', subtitle: 'Audits large data volumes in seconds'},
  {title:'Precision', subtitle: 'Detects patterns and anomalies with advanced AI technology'},
  {title:'Security', subtitle: 'Protects your information with encryption'},
]

export default function Home() {
  return (
    <main className={styles.page}>
      <Presentation/>  

      <div className={styles.page__Grid}>
        {infoCards.map((card, index)=>(
          <FeatureCard key={index} title={card.title} subtitle={card.subtitle} />
        ))}
      </div>
      
    </main>
  );
}
