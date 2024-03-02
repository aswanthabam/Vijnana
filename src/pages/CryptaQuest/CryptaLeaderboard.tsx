import { useEffect, useState } from "react";
import { LeaderboardResponse, leaderboard } from "../../apis/cryptaquest";
import styles from "./CryptaQuest.module.css";
import { useNavigate } from "react-router-dom";

export const Leaderboard = () => {
    const [leaderboardList, setLeaderboardList] = useState<LeaderboardResponse[] | null>(null);
    const redirect = useNavigate();
    useEffect(()=>{
        leaderboard().then((res)=>{
            if(res){
                setLeaderboardList(res);
            }
        });
    })
    return (
        <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.one}></div>
        <div className={styles.two}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.namePage}>
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        leaderboardList?.map((item, index)=>{
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.level}</td>
                                    <td>{new Date(item.time).toLocaleTimeString()}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <button onClick={()=>redirect("/cq")} className={styles.switchButton}> Go Back</button></div></div>
        </div>
    );};