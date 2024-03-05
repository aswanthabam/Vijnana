import React, { useEffect, useState } from "react";
import styles from "./TreasureHunt.module.css";
import Markdown from "marked-react";
// import { marked } from "marked";
import "github-markdown-css/github-markdown-light.css";
import { Question, getQuestion, initializeParticipant, submitAnswer } from "../../apis/treasurehunt";
// import "./style.css";
import congratsImg from "../../assets/congrats.png";
import {  useNavigate } from "react-router-dom";
interface TreasureHuntProps {}

export const TreasureHunt: React.FC<TreasureHuntProps> = () => {
  const [isQuestionPage, setIsQuestionPage] = useState(true);
  const [question, setQuestion] = useState<Question | null>();
  const [participantId, setParticipantId] = useState<string>("");
  const [answer, setAnswer] = useState<string>(""); 
  const [won, setWon] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [isName, setIsName] = useState<boolean>(false);
  const redirect = useNavigate();
  const submitQuestionAnswer = () => {
    if (answer === "") {
      alert("Please enter the answer");
      return;
    }setLoading(true);
    submitAnswer(participantId, answer).then((res) => {
      if (res) {
        setLoading(false);
        if (res.won) {
          alert("Correct Answer!");
          setWon(true);
          return;
        }
        if (res.correct) {
          setIsQuestionPage(true);
          alert("Correct Answer!");
        } else {
          alert("Incorrect Answer! Please try again!");
        }
      }
    });
  };
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    document.title = "Vijnana - Crypta Quest\n";
    var participantId = localStorage.getItem("th_participantId")
    var name = localStorage.getItem("th_name") ?? "Unknown";
    if (participantId === null) {
      // setLoading(true);
      // initializeParticipant().then((res) => {
      //   console.log(res);
      //   if (res) {
      //     setLoading(false);
      //     setParticipantId(res.participantId);
      //     localStorage.setItem("participantId", res.participantId);
      //   } 
      // });
    }else {
      setIsName(true);
      setParticipantId(participantId);
      setName(name);
    }
  }, []);

  useEffect(() => {
    if(participantId && isQuestionPage) {
      setLoading(true);
      getQuestion(participantId).then((res) => {
        console.log(res);
        if (res) {
          setLoading(false);
          if(res.won)
          {
            alert("You have already completed the hunt!");
            setWon(true);
          }else {
            setQuestion(res.data);
          }
        }
      });
    }
  },[participantId, isQuestionPage]);
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.one}></div>
        <div className={styles.two}></div>
      </div>
        <h1 className={styles.quest}>EL TESORO CAZA</h1>
      { won ? <div className={styles.won}>
        <img src={congratsImg} alt="congrats" />
        <h1>Hu rah! You have completed the hunt!</h1>
      </div> : <div className={styles.content}>
        {loading ? <div className={styles.loading}>Loading ...</div> :(isName ? !isQuestionPage ? (
          <div className={styles.submitPage}>
            <h1>Submit Your Result</h1>
            <input
              placeholder="Enter The Code you got"
              type="number"
              className={styles.result}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={submitQuestionAnswer} className={styles.button}>Verify and Submit</button>
          </div>
        ) : (
          <div className={styles.questionPage + " " + "markdown-body"}>
            <Markdown value={question?.question}></Markdown>
          </div>
        ) : <div className={styles.namePage}>
          <h1>Enter Your Name</h1>
          <input
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button className={styles.button}
            onClick={() => {
              localStorage.setItem("th_name", name ?? "Unknown");
              setIsName(true);
              initializeParticipant(name ?? "Unknown").then((res) => {
                console.log(res);
                if (res) {
                  setLoading(false);
                  setParticipantId(res.participantId);
                  localStorage.setItem("th_participantId", res.participantId);
                } 
              });
            }}
          >
            Submit
          </button>
        </div>)}
        <button
          className={styles.switchButton}
          onClick={() => setIsQuestionPage(!isQuestionPage)}
        >
          {" "}
          <i className="bi bi-arrow-repeat"></i>
          {!isQuestionPage ? "Back to question" : "Go to Submission Page"}
        </button>
        <div className={styles.info}>
          <h2>
            {" "}
            Task Number: &nbsp; &nbsp; <b>{question?.order}</b>
          </h2>
          <p>Name : <b>{name} ({participantId})</b></p>
        </div>
      </div>
      }
      <button className={styles.leaderboardButton} onClick={()=>redirect("/th/leaderboard")}><i className="bi bi-1-circle"></i>&nbsp; Leaderboard</button>
    </div>
  );
};
