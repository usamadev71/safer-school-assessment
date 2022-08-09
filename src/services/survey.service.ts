import db from "../utils/firebase.util";
import { collection, getDocs } from "firebase/firestore/lite";
import { _groupBy } from "../utils";

async function getSurveys() {
  const surveysCol = collection(db, "surveys");
  const surveySnapshot = await getDocs(surveysCol);
  const surveyList = surveySnapshot.docs.map((doc) => doc.data());
  console.log("Service Response [getSurveys]", surveyList);

  return surveyList;
}

async function getTotalResponsesByQuestion() {
  const apiRes: any = await getSurveys();
  if (!apiRes.length) {
    return {
      status: false,
      statusMsg: "No surveys found",
      data: null,
    };
  }

  const allQuestions =
    apiRes?.[0]?.completed?.map((q: any, index: number) => {
      const qID = Object.keys(q.content)[0];
      return {
        qID,
        answer: q.content[qID],
      };
    }) ?? [];

  const questionTotalResponses = _groupBy("qID", allQuestions);
  const qID = Object.keys(questionTotalResponses)[0];
  const count = questionTotalResponses[qID].length;

  console.log(
    "Service Response [questionTotalResponsesByQuestion]",
    questionTotalResponses,
    count
  );

  return {
    status: true,
    statusMsg: "Successfully fetched question responses by question",
    data: {
      responses: questionTotalResponses,
      count,
    },
  };
}

async function getTotalResponsesByUser() {
  const apiRes: any = await getSurveys();
  if (!apiRes.length) {
    return {
      status: false,
      statusMsg: "No surveys found",
      data: null,
    };
  }

  const allQuestions =
    apiRes[0]?.completed?.map((q: any) => {
      const qID = Object.keys(q.content)[0];
      return {
        qID,
        answer: q.content[qID],
        completedBy: q.completedBy,
      };
    }) ?? [];

  const questionTotalResponses = _groupBy("completedBy", allQuestions);

  let count = 0;
  Object.keys(questionTotalResponses).forEach((user: any) => {
    count += questionTotalResponses[user].length;
  });

  console.log(
    "Service Response [questionTotalResponsesByUser]",
    questionTotalResponses,
    count
  );

  return {
    status: true,
    statusMsg: "Successfully fetched question responses by user",
    data: {
      responses: questionTotalResponses,
      count,
    },
  };
}

export const SurveyService = {
  getSurveys,
  getTotalResponsesByQuestion,
  getTotalResponsesByUser,
};
