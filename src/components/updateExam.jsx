import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../firebase";
import "../AddExam.css";
import { useNavigate } from "react-router-dom";

const UpdateExam = () => {
  const [updatedValues, setUpdateValues] = useState();
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let examData = JSON.parse(localStorage.getItem("exam"));
    setUpdateValues(examData);
    setImageUrl(examData.thumbnail);
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    thumbnail: Yup.string()
      .url("Invalid URL")
      .required("Thumbnail URL is required"),
    examDate: Yup.date().required("Exam date is required"),
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
        options: Yup.array()
          .of(Yup.string().required("Option is required"))
          .min(4, "At least 4 options are required"),
        correctOption: Yup.string().required("Correct option is required"),
        domain: Yup.string().required("Domain is required"),
        subdomain: Yup.string().required("Subdomain is required"),
        topic: Yup.string().required("Topic is required"),
        subtopic: Yup.string().required("Subtopic is required"),
      })
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3002/${updatedValues._id}`,
        values
      );
      alert("Exam Updated Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
          setFieldValue("thumbnail", url);
          console.log("Image upload success!");
        });
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Update Exam</h2>
      <Formik
         initialValues={{
          title: updatedValues?.title || "",
          thumbnail: updatedValues?.thumbnail || "",
          examDate: updatedValues?.examDate || "",
          questions: updatedValues?.questions || [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values,setFieldValue }) => (
          <Form className="form">
            <div className="form-group">
            <div className="image-container">
                <div className="image-preview">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Thumbnail"
                      className="round-image"
                    />
                  ) : (
                    <div className="round-image"></div>
                  )}
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    onChange={(event) =>
                      handleImageChange(event, setFieldValue)
                    }
                    accept="image/jpeg,image/jpg,image/png"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="thumbnail" className="pick-image-button">
                    Pick an Image
                  </label>
                </div>
              </div>
              <ErrorMessage name="thumbnail" component="div" />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field
                type="text"
                id="title"
                name="title"
                style={{ fontSize: "16px" }}
                placeholder={updatedValues?.title || ""}
              />
              <ErrorMessage name="title" component="div" />
            </div>

            <div className="form-group">
              <label htmlFor="examDate">Exam Date</label>
              <Field
                type="date"
                id="examDate"
                name="examDate"
                style={{ fontSize: "16px" }}
                placeholder={updatedValues?.examDate || ""}
              />
              <ErrorMessage name="examDate" component="div" />
            </div>
            <div className="question-container">
              <h3>Questions</h3>
              <div className="question-scroll">
                <FieldArray name="questions">
                  {({ push }) => (
                    <>
                      {updatedValues?.questions.map((question, index) => (
                        <div key={index} className="question-group">
                          <div className="form-group">
                            <label htmlFor={`questions[${index}].question`}>
                              Question {index + 1} :
                            </label>
                            <Field
                              type="text"
                              id={`questions[${index}].question`}
                              name={`questions[${index}].question`}
                              style={{ fontSize: "16px" }}
                              placeholder={question.question || ""}
                            />
                            <ErrorMessage
                              name={`questions[${index}].question`}
                              component="div"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor={`questions[${index}].options`}>
                              Options
                            </label>
                            <FieldArray
                              name={`questions[${index}].options`}
                              render={(arrayHelpers) => (
                                <>
                                  {question.options.map(
                                    (option, optionIndex) => (
                                      <div
                                        key={optionIndex}
                                        className="option-group"
                                      >
                                        <Field
                                          style={{
                                            fontSize: "16px",
                                            marginTop: "15px",
                                          }}
                                          type="text"
                                          id={`questions[${index}].options[${optionIndex}]`}
                                          name={`questions[${index}].options[${optionIndex}]`}
                                          placeholder={option || ""}
                                        />
                                      </div>
                                    )
                                  )}
                                </>
                              )}
                            />
                          </div>

                          <div className="form-group">
                            <label
                              htmlFor={`questions[${index}].correctOption`}
                            >
                              Correct Option
                            </label>
                            <Field
                              type="text"
                              style={{ fontSize: "16px" }}
                              id={`questions[${index}].correctOption`}
                              name={`questions[${index}].correctOption`}
                              placeholder={question.correctOption || ""}
                            />
                            <ErrorMessage
                              name={`questions[${index}].correctOption`}
                              component="div"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor={`questions[${index}].domain`}>
                              Domain
                            </label>
                            <Field
                              type="text"
                              style={{ fontSize: "16px" }}
                              id={`questions[${index}].domain`}
                              name={`questions[${index}].domain`}
                              placeholder={question.domain || ""}
                            />
                            <ErrorMessage
                              name={`questions[${index}].domain`}
                              component="div"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor={`questions[${index}].subdomain`}>
                              Subdomain
                            </label>
                            <Field
                              type="text"
                              style={{ fontSize: "16px" }}
                              id={`questions[${index}].subdomain`}
                              name={`questions[${index}].subdomain`}
                              placeholder={question.subdomain || ""}
                            />
                            <ErrorMessage
                              name={`questions[${index}].subdomain`}
                              component="div"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor={`questions[${index}].topic`}>
                              Topic
                            </label>
                            <Field
                              type="text"
                              style={{ fontSize: "16px" }}
                              id={`questions[${index}].topic`}
                              name={`questions[${index}].topic`}
                              placeholder={question.topic || ""}
                            />
                            <ErrorMessage
                              name={`questions[${index}].topic`}
                              component="div"
                              style={{   color: 'red',
                                marginTop: '5px' }}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor={`questions[${index}].subtopic`}>
                              Subtopic
                            </label>
                            <Field
                              style={{ fontSize: "16px" }}
                              type="text"
                              id={`questions[${index}].subtopic`}
                              name={`questions[${index}].subtopic`}
                              placeholder={question.subtopic || ""}
                            />
                            <ErrorMessage
                              name={`questions[${index}].subtopic`}
                              component="div"
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
              </div>
            </div>
            <div className="button-container">
              <Link to="/">
                <button
                  type="button"
                  style={{
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                    fontSize: "20px",
                    marginRight: "20px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Back
                </button>
              </Link>
           
                <button
                  type="submit"
                  style={{
                    backgroundColor: "green",
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                    fontSize: "20px",
                    marginRight: "20px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
           
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateExam;
