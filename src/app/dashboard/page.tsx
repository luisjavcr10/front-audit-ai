import styles from './page.module.scss';
import Dashboard from "@/components/Shared/Dashboard/Dashboard"

export default function Page() {
  return (
    <div className={styles.page}>
      <Dashboard/>
    </div>
  )
}