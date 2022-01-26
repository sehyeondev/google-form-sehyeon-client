import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import {forEach} from 'p-iteration'
import Box from '@mui/material/Box';


export default function Result () {
  const router = useRouter();
  const {id} = router.query
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [myAnswers, setMyAnswers] = useState([]);


  useEffect(async () => {
    if (!router.isReady) return;
    const {id} = router.query
    const url = `https://sehyeondev.com/api/result/${id}`
    // const url = `http://localhost:8000/api/result/${id}`
    
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content = await rawResponse.json()
    
    let _answers = {}

    const cp = [...questions]

    const formQuestions = content.formQuestions;

    formQuestions.forEach((question, index) => {
      cp.push({
        title: question.title,
        desc: question.desc,
        qType: question.qType,
        id: question.id,
        formId: question.formId,
        selectOptions: question.FormQuestionOptions,
      })

      const selectOptions = question.FormQuestionOptions;

      selectOptions.forEach((option) => {
        if (!(question.id in _answers)){
          _answers[question.id] = {}
        }
        _answers[question.id][option.title] = 0
      })
    })

    console.log(_answers)
    setQuestions(cp)

    setFormTitle(content.form.title);
    setFormDesc(content.form.desc);
    // setQuestions(content.formQuestions);
    setAnswers(content.answers);
    console.log("answers of content")
    console.log(content.answers);
    console.log(content.formQuestions)
    
    
    Object.keys(content.answers).forEach((formQuestionId, index) => {
      if (!(formQuestionId in _answers)){
        _answers[formQuestionId] = {}
      }
      let answerObjArray = content.answers[formQuestionId]
      answerObjArray.forEach((answerObj) => {
        if (answerObj.answerText) return;
        answerObj.FormQuestionAnswerOptions.forEach((option) => {
          _answers[formQuestionId][option.title] ++
        })
      })
    })
    console.log(_answers)
    setMyAnswers(_answers)
    console.log(myAnswers)

  },[router.isReady])


  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        bgcolor: 'rgba(103,58,183, 0.1)'
    }}>
      <Box sx={{
        alignSelf: 'flex-start',
        color: 'black',
        width: '500px',
        height: '40px',
        p: '4px',
        borderRadius: '2px',
        fontSize: '2.25rem'
      }}> {formTitle}</Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        bgcolor: 'white',
        color: 'black',
        width: '500px',
        borderRadius: '10px',
      }}>
        <Box sx={{
          fontSize: '32px',
          fontWeight: '400',
          textAlign: 'center',
          width: '500px',
          m: '10px',
          p: '4px',
        }}>{formTitle}</Box>
        <Box sx={{
          fontSize: '20px',
          fontWeight: '400',
          textAlign: 'center',
          width: '500px',
          m: '10px',
          p: '4px',
        }}>{formDesc}</Box>
      </Box>
      {
        questions.map((question, index) => {
          return (
            <Box key={index}
            sx={{
              bgcolor: 'white',
              m: '10px',
              borderRadius: '8px',
              width: '500px',
              p: '5px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Question question={question} />
              {
                (question.qType === "text" || question.qType === "longText" ) &&
                  Object.keys(answers).map((formQuestionId, index) => {
                    if (parseInt(formQuestionId) === question.id){
                      return (
                        <TextAnswer key={index} answers={answers} answerObjArray={answers[formQuestionId]} question={question} />
                      )}
                  })
              }
              {
                (question.qType === "radio" || question.qType === "checkbox" ) && (Object.keys(myAnswers).length) &&
                <Box>
                {
                  Object.keys(myAnswers[question.id]).map((title, index) => {
                    return (
                      <Box key={index} sx={{
                        display: 'flex',
                        flexDirection: 'row',
                      }} >
                        <Box sx={{
                        width: '400px',
                        height: '24px',
                        m: '10px',
                        pl: '10px',
                        bgcolor: 'rgba(0,0,0,0.05)',
                        borderRadius: '4px',
                      }}>{title}</Box>
                        <Box sx={{
                        width: '32px',
                        height: '24px',
                        m: '10px',
                        pl: '10px',
                        bgcolor: 'rgba(0,0,0,0.05)',
                        borderRadius: '4px',
                      }}>{myAnswers[question.id][title]}</Box>
                         
                      </Box>
                    )
                  })
                }
                </Box>
              }
              
            </Box>
          )
        })
      }
    </Box>
  )
}

const Question = ({question}) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: 'center',
      color: 'black',
      m: '10px',
      borderRadius: '4px',
      width: '432px',
      fontSize: '19px',
    }}>
      <Box sx={{
        width: '460px',
        bgcolor: 'rgba(0,0,0,0.1)',
        borderRadius: '4px',
        pl: '10px',
        pb:'10px',
        pt: '10px',
      }}> {question.title} </Box>
      <Box sx={{
        width: '460px',
        mt:'10px',
        bgcolor: 'rgba(0,0,0,0.1)',
        borderRadius: '4px',
        pl: '10px',
        pb:'10px',
        pt: '10px',
      }}> {question.desc} </Box>
    </Box>
  )
}

const TextAnswer = ({answerObjArray}) => {
  return (
    answerObjArray.map((answer, index) => {
      return (
        <Box key={index} sx={{
          p:'16px',
          width: '432px',
          m: '10px',
          pl: '10px',
          bgcolor: 'rgba(0,0,0,0.05)',
          borderRadius: '4px',
        }}> {answer.answerText} </Box>
      )
    })
  )
}