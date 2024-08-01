import styles from "../assets/Main.module.css"

type Props = {
  children: JSX.Element
}

export default function Main({ children }: Props ) {

  return (
    <div className={styles.container}>
      {children} 
    </div>
  )
}
