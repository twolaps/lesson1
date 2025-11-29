import { Link } from "@mui/material"
import styles from '@/styles/header.module.css';

export const LinkView = ()=>{
    return (
        <div className={styles.link_view}>
            <Link style={{margin: "0rem 1rem"}} href="/">
                <h1>WAGAMI HOME</h1>
            </Link>
            <Link style={{margin: "0rem 1rem"}} href="/ethers_home">
                <h1>ETHERS HOME</h1>
            </Link>
            <Link style={{margin: "0rem 1rem"}} href="/stake">
                <h1>STAKE</h1>
            </Link>
            <Link style={{margin: "0rem 1rem"}} href="/withdraw">
                <h1>WITHDRAW</h1>
            </Link>
        </div>
    )
}