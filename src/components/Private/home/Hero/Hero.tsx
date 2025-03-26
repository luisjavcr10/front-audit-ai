import Link from 'next/link';
import styles from './Hero.module.scss';

const enunciados = {
    title:'Optimize your audit with AI',
    description:'Automate data analysis with artificial inteligence. Our platform reviews files in seconds, accurately detecting inconsistencues and risks. Optimizate your audits and make confident decisions with AuditAI.',
    textButton:'Start Audit',
    href:'/load-file'
}

export const Hero = () => {
    return(
        <div className={styles.Hero}>
            <h1 className={styles.Hero__MainTitle}>
            {enunciados.title}
            </h1>
            <p className={styles.Hero__Description}>
            {enunciados.description}
            </p>
            <Link
            href={enunciados.href}
            className={styles.Hero__Button}
            >
            {enunciados.textButton}
            </Link> 
      </div>  
    );
}