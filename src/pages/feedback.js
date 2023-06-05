import { useRef, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "./api/feedback";

function Feedback(props) {
  // const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    // {email: 'kodepatra@gmail.com', feedback: 'Website ini sangat bagus'}
    const reqBody = { email: enteredEmail, feedback: enteredFeedback };

    fetch("http://localhost:3000/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  // function loadFeedbackHandler() {
  //   fetch("http://localhost:3000/api/feedback")
  //     .then((response) => response.json())
  //     .then((data) => setFeedbackItems(data.feedback));
  // }

  return (
    <div>
      <h1>Form Feedback</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      {/* <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul> */}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default Feedback;
