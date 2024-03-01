import React, { useEffect, useState } from "react";
import styles from "./CryptaQuest.module.css";
import Markdown from "marked-react";
// import { marked } from "marked";
import "github-markdown-css/github-markdown-light.css";
// import "./style.css";
interface CryptaQuestProps {}

export const CryptaQuest: React.FC<CryptaQuestProps> = () => {
  const [isQuestionPage, setIsQuestionPage] = useState(false);
  const [question, setQuestion] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [stepName, setStepName] = useState<string>("Coding");
  const [stepRating, setStepRating] = useState<number>(3);
  useEffect(() => {
    document.title = "Vijnana - Crypta Quest\n";
    setQuestion(
      "## Crypta Quest\n" +
        `| Header 1 | Header 2 | Header 3 |
| ---------|----------|----------|
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |
| Row 3, Col 1 | Row 3, Col 2 | Row 3, Col 3 |
` +
        "\n```python\nprint('Hello World')\na = a+b\n```"
    );
    setStep(1);
    setStepName("Coding");
    setStepRating(3);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.one}></div>
        <div className={styles.two}></div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.quest}>Crypta Quest</h1>

        {isQuestionPage ? (
          <div className={styles.submitPage}>
            <h1>Submit Your Result</h1>
            <textarea
              placeholder="Enter The results here"
              className={styles.result}
            ></textarea>
            <button className={styles.button}>Verify and Submit</button>
          </div>
        ) : (
          <div className={styles.questionPage + " " + "markdown-body"}>
            <Markdown value={question}></Markdown>
          </div>
        )}
        <button
          className={styles.switchButton}
          onClick={() => setIsQuestionPage(!isQuestionPage)}
        >
          {" "}
          <i className="bi bi-arrow-repeat"></i>
          {isQuestionPage ? "Back to question" : "Go to Submission Page"}
        </button>
        <div className={styles.info}>
          <h1> {stepName}</h1>
          <h2>
            {" "}
            Question Number: &nbsp; &nbsp; <b>{step}</b>
          </h2>
          <h2>
            {" "}
            Difficulty Rating: &nbsp; &nbsp;<b>{stepRating} / 5</b>
          </h2>
        </div>
      </div>
    </div>
  );
};
