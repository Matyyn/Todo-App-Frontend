import React from "react";

const Modal = ({ isOpen, onClose, exam }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "5px",
          maxWidth: "30%",
          width: "100%",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={exam.thumbnail}
            alt="Thumbnail"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "20%",
              border: "2px solid #ccc",
              backgroundColor: "#f0f0f0",
            }}
          />
        </div>
        <h2 style={{ color: "#333", marginBottom: "20px" }}>
          Title: {exam.title}
        </h2>
        <h3 style={{ color: "#666", marginBottom: "20px" }}>
          Exam Date: {new Date(exam.examDate).toLocaleDateString()}
        </h3>
        <h3 style={{ color: "#333", marginBottom: "20px" }}>Questions</h3>
        <div
          style={{
            maxHeight: "350px",
            overflowY: "auto",
            marginBottom: "20px",
          }}
        >
          {exam.questions.map((question, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <p style={{ color: "#333" }}>
                <strong>Question {index + 1}:</strong> {question.question}
              </p>

              <ol style={{ color: "#666", marginBottom: "10px" }}>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ol>
              <p style={{ color: "#333" }}>
                <strong>Correct Option:</strong> {question.correctOption}
              </p>
              <p style={{ color: "#333" }}>
                <strong>Domain:</strong> {question.domain}
              </p>
              <p style={{ color: "#333" }}>
                <strong>Subdomain:</strong> {question.subdomain}
              </p>
              <p style={{ color: "#333" }}>
                <strong>Topic:</strong> {question.topic}
              </p>
              <p style={{ color: "#333" }}>
                <strong>Subtopic:</strong> {question.subtopic}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            textAlign: "right",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007BFF",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
