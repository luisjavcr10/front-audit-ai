import styles from './page.module.scss';
import { PreviewFile } from '@/components/Private/load-file/PreviewFile';

export default function LoadFile() {

    return (
        <div className={styles.page}>
            
            <h1>Carga el archivo a auditar</h1>

            <PreviewFile/>
            
        </div>
    );
}
