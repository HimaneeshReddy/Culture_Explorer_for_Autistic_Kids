import React, { useState } from "react";

const IndianFoodQuiz = () => {
  const questions = [
    {
      question: "Where is Rice commonly eaten?",
      options: ["South India", "Europe", "America"],
      answer: "South India"
    },
    {
      question: "Which bread comes from North India?",
      options: ["Dosa", "Naan", "Idli"],
      answer: "Naan"
    },
    {
      question: "Which food is spicy and common in Andhra cuisine?",
      options: ["Mirchi", "Sugar", "Milk"],
      answer: "Mirchi"
    },
    {
      question: "Dosa belongs to which region?",
      options: ["South India", "North India", "West India"],
      answer: "South India"
    }
  ];

  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex, option) => {
    setUserAnswers({ ...userAnswers, [qIndex]: option });
  };

  const score = questions.filter(
    (q, i) => userAnswers[i] === q.answer
  ).length;

  return (
    <div className="food-quiz-container">
      <h2 className="food-quiz-title">🍽️ Indian Food Quiz</h2>

      {!submitted ? (
        <>
          {questions.map((q, i) => (
            <div key={i} className="quiz-question">
              <h3>{q.question}</h3>

              {q.options.map((opt) => (
                <button
                  key={opt}
                  className={`quiz-option ${
                    userAnswers[i] === opt ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(i, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          ))}

          <button
            className="submit-btn"
            onClick={() => setSubmitted(true)}
          >
            Submit Quiz
          </button>
        </>
      ) : (
        <div className="result-box">
          <h3>
            You scored {score} / {questions.length}
          </h3>
          <p>Great job learning about Indian food! 🍛</p>
        </div>
      )}

      {/* CSS */}
      <style>{`
        .food-quiz-container {
          max-width: 900px;
          margin: 40px auto;
          background: white;
          border: 4px solid #fde047;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }

        .food-quiz-title {
          font-size: 36px;
          font-weight: bold;
          text-align: center;
          color: #ca8a04;
          margin-bottom: 32px;
        }

        .quiz-question {
          margin-bottom: 28px;
        }

        .quiz-question h3 {
          font-size: 22px;
          color: #1f2937;
          margin-bottom: 12px;
        }

        .quiz-option {
          width: 100%;
          padding: 14px 18px;
          margin-bottom: 10px;
          border-radius: 14px;
          border: 2px solid #e5e7eb;
          background-color: #f9fafb;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #374151;
        }

        .quiz-option:hover {
          background-color: #fef3c7;
        }

        .quiz-option.selected {
          background-color: #22c55e;
          color: white;
          border-color: #16a34a;
        }

        .submit-btn {
          margin-top: 24px;
          padding: 16px 32px;
          background-color: #f59e0b;
          color: white;
          border-radius: 9999px;
          border: none;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        .submit-btn:hover {
          transform: scale(1.05);
        }

        .result-box {
          text-align: center;
          font-size: 24px;
          color: #1f2937;
        }
      `}</style>
    </div>
  );
};

export default IndianFoodQuiz;
