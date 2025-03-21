import styles from './Presentation.module.scss';

const enunciados = {
    title:'Optimize your audit with AI',
    description:'Automate data analysis with artificial inteligence. Our platform reviews files in seconds, accurately detecting inconsistencues and risks. Optimizate your audits and make confident decisions with AuditAI.',
    textButton:'Start Audit',
    href:'/load-file'
}

export const Presentation = () => {
    return(
        <div className={styles.Presentation}>
            <h1 className={styles.Presentation__MainTitle}>
            {enunciados.title}
            </h1>
            <p className={styles.Presentation__Description}>
            {enunciados.description}
            </p>
            <a 
            href={enunciados.href}
            className={styles.Presentation__Button}
            >
            {enunciados.textButton}
            </a> 
      </div>  
    );
}