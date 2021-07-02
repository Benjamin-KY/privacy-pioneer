import React, { useEffect, useState } from "react";
import Scaffold from "../../components/scaffold";
import { Collapse } from "bootstrap";
import {
  SAnswer,
  SBody,
  SQuestion,
  STitle,
  SContainer,
  SSubtitle,
  SQuestionCard,
  SArrow,
} from "./style";
import Questions from "./faq.json";
import { ArrowDown } from "../../../libs/icons";
/**
 * About page view
 */
const AboutView = () => {
  console.log();
  const QuestionCard = ({ question, answer }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      var faqCollapse = document.getElementById(question);
      var collapse = new Collapse(faqCollapse, { toggle: false });
      open ? collapse.show() : collapse.hide();
    });

    return (
      <SQuestionCard onClick={() => setOpen(!open)}>
        <SQuestion>
          {question}
          <SArrow>
            <ArrowDown size={24} />
          </SArrow>
        </SQuestion>

        <div className="collapse" id={question}>
          <SAnswer>{answer}</SAnswer>
        </div>
      </SQuestionCard>
    );
  };

  return (
    <Scaffold>
      <SContainer>
        <STitle>About</STitle>
        <SSubtitle>Learn more about our extension</SSubtitle>
        <SBody>
          ____ makes it transparent which websites are tracking you and which
          data they collect.
        </SBody>
        <STitle>FAQ</STitle>
        {Object.entries(Questions.FAQ).map(([question, answer], index) => (
          <QuestionCard question={question} answer={answer} key={index} />
        ))}
      </SContainer>
    </Scaffold>
  );
};

export default AboutView;
