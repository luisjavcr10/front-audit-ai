import styles from './page.module.scss';
import { Hero } from '@/components/Private/home/Hero';
import { FeatureCard } from '@/components/Private/home/FeatureCard';

const infoCards=[
  {title:'Fast', subtitle: 'Audits large data volumes in seconds'},
  {title:'Precision', subtitle: 'Detects patterns and anomalies with advanced AI technology'},
  {title:'Security', subtitle: 'Protects your information with encryption'},
]

export default function Home() {
  return (
    <main className={styles.page}>
      <Hero />  

      <div className={styles.page__Grid}>
        {infoCards.map((card, index)=>(
          <FeatureCard key={index} title={card.title} subtitle={card.subtitle} />
        ))}
      </div>
      
    </main>
  );
}
