import { useState } from "react";
import QuestionComponent from "../components/Questions/Question1";
import LastQuestionComponet from "../components/Questions/Question2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

const radioOptions = [
  {
    radioOptions: [
      { label: "Less than 10", value: "less-than-10" },
      { label: "11 - 50", value: "11-50" },
      { label: "51 - 200", value: "51-200" },
      { label: "201 - 1000", value: "201-1000" },
      { label: "1001 - 5000", value: "1001-5000" },
    ],
    mainTitle:
      "Thanks for trust hiring through bolo before we started we’d like to ask you questions to better understand your bussiness",
    title: "How many people are employed at your company",
    nextLabel: "Get started",
    //prviousLabel: "Prev",
  },
  {
    radioOptions: [
      { label: "Developers", value: "Developers" },
      { label: "Designers", value: "Designers" },
      { label: "Project Managers", value: "Project-Managers" },
      { label: "Product Managers", value: "Product-Managers" },
      { label: "Finance Experts", value: "Finance-Experts" },
    ],
    mainTitle:
      "Thanks for trust hiring through bolo before we started we’d like to ask you questions to better understand your bussiness",
    title: "What role would you like to hire?",
    nextLabel: "Next",
    prviousLabel: "Prev",
  },
  {
    radioOptions: [
      { label: "New idea or project", value: "new" },
      {
        label: "Existing project that needs more resources",
        value: "existing",
      },
      {
        label: "Ongoing assistance or consultation",
        value: "ongoing",
      },
      {
        label: "None of the above, i'm just looking to learn more about Toptal",
        value: "none",
      },
    ],
    mainTitle:
      "Thanks for trust hiring through bolo before we started we’d like to ask you questions to better understand your bussiness",
    title: "What type of project are you hiring for?",
    nextLabel: "Next",
    prviousLabel: "Prev",
  },
  {
    radioOptions: [
      { label: "Less than 1 week", value: "less-than-1-week" },
      { label: "1 to 4 weeks", value: "1-to-4-weeks" },
      { label: "1 to 3 months", value: "1-to-3-months" },
      { label: "3 to 6 months", value: "3-to-6-months" },
      { label: "Longer than 6 months", value: "longer-than-6-months" },
    ],
    mainTitle:
      "Thanks for trust hiring through bolo before we started we’d like to ask you questions to better understand your bussiness",
    title: "How long do you need the developer?",
    nextLabel: "Next",
    prviousLabel: "Prev",
  },
  {
    radioOptions: [
      { label: "Full time (40 or more hrs/week)", value: "full-time" },
      { label: "Part time (Less than 40 hrs/week)", value: "part-time" },
      { label: "Hourly", value: "hourly" },
      { label: "I'll decide later", value: "later" },
    ],
    mainTitle:
      "Thanks for trust hiring through bolo before we started we’d like to ask you questions to better understand your bussiness",
    title: "What level of time commitment will you require from the developer?",
    nextLabel: "Next",
    prviousLabel: "Prev",
  },
  {
    radioOptions: [
      { label: "Immediately", value: "immediately" },
      { label: "In 1 to 2 weeks", value: "in-1-to-2-weeks" },
      { label: "More than 2 weeks from now", value: "more-than-2-weeks" },
      { label: "I'll decide later", value: "later" },
    ],
    mainTitle:
      "Thanks for trust hiring through bolo before we started we’d like to ask you questions to better understand your bussiness",
    title: "When do you need the developer to start?",
    nextLabel: "Next",
    prviousLabel: "Prev",
  },
  {
    radioOptions: [
      { label: "yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "I'm not sure", value: "not-sure" },
    ],
    mainTitle:
      "Thanks for trust hiring through bolo before we started we’d like to ask you questions to better understand your bussiness",
    title: "Are you open to working with a remote developer?",
    nextLabel: "Next",
    prviousLabel: "Prev",
  },
  {
    radioOptions: [
      { label: "Less than $70/hr", value: "less-than-70" },
      { label: "$70 - $90/hr", value: "70-90" },
      { label: "$91 - $110/hr", value: "91-110" },
      { label: "More than $110/hr", value: "more-than-110" },
      { label: "Not sure on budget yes", value: "not-sure" },
    ],
    mainTitle:
      "Thanks for trust hiring through bolo before we started we’d like to ask you questions to better understand your bussiness",
    title: "What is your budget for this role?",
    nextLabel: "Next",
    prviousLabel: "Prev",
  },
];

const initialState = {
  question1: { label: "Less than 10", value: "less-than-10" },
  question2: { label: "Developers", value: "Developers" },
  question3: { label: "New idea or project", value: "new" },
  question4: { label: "Less than 1 week", value: "less-than-1-week" },
  question5: { label: "Full time (40 or more hrs/week)", value: "full-time" },
  question6: { label: "Immediately", value: "immediately" },
  question7: { label: "yes", value: "yes" },
  question8: { label: "Less than $70/hr", value: "less-than-70" },
};

const getAnswer = (values) => {
  const result = Object.keys(values).map((key, index) => {
    return { question: radioOptions[index].title, answer: values[key].label };
  });
  return result;
};

const Question = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [formPage, setFormPage] = useState(false);
  const [values, setValues] = useState(initialState);
  const [formData, setFormData] = useState({
    email: "",
    company_name: "",
    contact_name: "",
    phone: "",
    answers: [],
  });
  const onChangeFormData = (name, value) => {
    setFormData({
      ...formData,
      [name]: value.target.value,
    });
  };
  const onChange = (index, value) => {
    setValues({
      ...values,
      [`question${index + 1}`]: value,
    });
  };

  const [formerrors, setFormErrors] = useState({});
  const validate = () => {
    console.log("Validate the form....");
    let errors = {};

    //email field
    if (!formData.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    //company name field
    if (!formData.company_name) {
      errors.company_name = "Company name is required";
    }

    //contact name field
    if (!formData.contact_name) {
      errors.contact_name = "Contact name is required";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [submitResult, setSubmitResult] = useState({
    state: "success",
    message: "",
  });
  const onSubmit = () => {
    if (validate()) {
      setSubmitResult({
        state: "success",
        message: "",
      });
      setIsSubmiting(true);
      const answers = getAnswer(values);
      const finalData = {
        ...formData,
        answers: answers,
      };
      axios
        .post(`${BASE_URL}/api/questions/`, finalData, {
          headers: {
            accessTokenOcr: localStorage.getItem("accessTokenBolo")
              ? localStorage.getItem("accessTokenBolo")
              : null,
          },
        })
        .then((res) => {
          if (!res.data.error) {
            setSubmitResult({
              state: "success",
              message: "Form submitted successfully!",
            });
            setIsSubmiting(false);
            navigate("/");
          } else {
            setSubmitResult({
              state: "error",
              message: "Something went wrong while submiting form!",
            });
            setIsSubmiting(false);
          }
        })
        .catch((error) => {
          setSubmitResult({
            state: "error",
            message: "Something went wrong while submitting form!",
          });
          setIsSubmiting(false);
        });
    }
  };

  const onClickNext = () => {
    if (currentPage < radioOptions.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setFormPage(true);
      console.log("last result", values);
    }
  };
  const onClickPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      {formPage ? (
        <LastQuestionComponet
          onChangeFormData={onChangeFormData}
          onSubmit={onSubmit}
          isSubmiting={isSubmiting}
          submitResult={submitResult}
          formerrors={formerrors}
        />
      ) : (
        <QuestionComponent
          radioOptions={radioOptions[currentPage].radioOptions}
          mainTitle={radioOptions[currentPage].mainTitle}
          title={radioOptions[currentPage].title}
          nextLabel={radioOptions[currentPage].nextLabel}
          prviousLabel={radioOptions[currentPage].prviousLabel}
          value={values[`question${currentPage + 1}`]}
          onChange={(value) => {
            onChange(currentPage, value);
          }}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      )}
    </>
  );
};
export default Question;
