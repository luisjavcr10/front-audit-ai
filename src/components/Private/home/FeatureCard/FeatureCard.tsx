import styles from './FeatureCard.module.scss';

export const FeatureCard = ({title, subtitle}: Readonly<{title: string; subtitle: string}>) => {
    return(
        <div className={styles.FeatureCard}>
            <h1 className={styles.FeatureCard__Title}>
                {title}
            </h1>
            <h2 className={styles.FeatureCard__Subtitle}>
                {subtitle}
            </h2>
        </div>
    );
}