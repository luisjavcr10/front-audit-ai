import { Dashboard } from "@/components/Dashboard";
import styles from './page.module.scss';

export default function Test (){
    return(
        <div className={styles.page}>
            <Dashboard/>
        </div>
    );
}