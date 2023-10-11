import { useParams } from "react-router-dom";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import DashboardCard from "../components/DashboardCard";
import axiosClient from "../axios.js";

const ViewSurveyAnswers = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/survey/${id}/answers`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [id]);

  return (
    <PageComponent
      title={"Answers"}
      buttons={
        <TButton color="green" to="/surveys">
          <ArrowLeftIcon className="h-6 w-6 mr-2" />
          Go to surveys
        </TButton>
      }
    >
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && data && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">{data.title}</h2>
          <div className="grid grid-cols-1 gap-4">
            {data.questions ? (
              data.questions.map((question) => (
                <div
                  key={question.id}
                  className="p-4 border border-gray-200 rounded shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {question.question}
                  </h3>
                  {question.answers && question.answers.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {question.answers.map((answer) => (
                        <li key={answer.id} className="mb-2">
                          {answer.answer}
                          <span className="text-gray-500 text-sm ml-2">
                            {new Date(answer.created_at).toLocaleDateString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">
                      Pas de réponses pour cette question
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">Pas de questions disponibles</p>
            )}
          </div>
        </div>
      )}
    </PageComponent>
  );
};

export default ViewSurveyAnswers;
