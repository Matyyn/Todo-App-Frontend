import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewModal from "./viewModal";
import { Link } from "react-router-dom";

const Table = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/");
        console.log("Exams retrieved successfully:", response.data);
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchData();
  }, [refresh]);

  const onView = (exam) => {
    setSelectedExam(exam);
    setIsViewModalOpen(true);
  };

  const onUpdate = (exam) => {
    const examString = JSON.stringify(exam);
    localStorage.setItem("exam", examString);
  };

  const onDelete = async (id) => {
    try {
      let response = await axios.delete(`http://localhost:3002/${id}`);
      alert("Exam Deleted Successfully!");
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const onCloseModal = () => {
    setIsViewModalOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Exams Todo List App</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          marginBottom: "20px",
        }}
      >
        <Link to="/add-exam">
          <button
            type="button"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              marginRight: "5px",
              backgroundColor: isHovered ? "lightgreen" : "green",
              color: isHovered ? "black" : "white",
              border: "none",
              borderRadius: "3px",
              fontSize: "20px",
              padding: "8px 10px",
              cursor: "pointer",
            }}
          >
            Add Exam
          </button>
        </Link>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: "10px", fontSize: "20px", width: "20%" }}
        />
      </div>

      <table
        style={{
          width: "90%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              Number
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              Thumbnail
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              Title
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              Exam Date
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredExams.length > 0 ? (
            exams.map((exam, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    fontSize: "20px",
                  }}
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    fontSize: "20px",
                  }}
                >
                  <img
                    src={exam.thumbnail}
                    alt="Description"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "10px",
                    }}
                  />
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    fontSize: "20px",
                  }}
                >
                  {exam.title}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    fontSize: "20px",
                  }}
                >
                  {new Date(exam.examDate).toLocaleString()}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    fontSize: "20px",
                  }}
                >
                  <button
                    onClick={() => onView(exam)}
                    style={{
                      marginRight: "15px",
                      marginTop: "5px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "3px",
                      fontSize: "20px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>
                  <Link to={"/update-exam"}>
                    <button
                      onClick={() => onUpdate(exam)}
                      style={{
                        marginRight: "15px",
                        marginTop: "5px",
                        backgroundColor: "#ffc107",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => onDelete(exam._id)}
                    style={{
                      marginRight: "15px",
                      marginTop: "5px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "3px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{ border: "1px solid #ddd", padding: "10px" }}
              >
                No exams currently added.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ViewModal
        isOpen={isViewModalOpen}
        onClose={onCloseModal}
        exam={selectedExam}
      />
    </div>
  );
};

export default Table;
