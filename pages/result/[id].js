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
    const url = `https://valley.sehyeondev.com/api/result/${id}`
    // const url = `http://localhost:8000/api/result/${id}`
    
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content = await rawResponse.json()

    setFormTitle(content.form.title);
    setFormDesc(content.form.desc);
    setQuestions(content.formQuestions);
    setAnswers(content.answers);
    console.log("answers of content")
    console.log(content.answers);
    
    let _answers = {}
    Object.keys(content.answers).forEach((formQuestionId, index) => {
      if (!(formQuestionId in _answers)){
        _answers[formQuestionId] = {}
      }
      let answerObjArray = content.answers[formQuestionId]
      answerObjArray.forEach((answerObj) => {
        if (answerObj.answerText) return;
        answerObj.FormQuestionAnswerOptions.forEach((option) => {
          if (!(option.title in _answers[formQuestionId])){
            _answers[formQuestionId][option.title] = 0
          }
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
              p: '24px',
            }}>
              <Question question={question} />
              {
                Object.keys(answers).map((formQuestionId, index) => {
                  if (parseInt(formQuestionId) === question.id){
                    return (
                      <AnswerWrapper key={index} answers={answers} answerObjArray={answers[formQuestionId]} question={question} />
                    )}
                })
              }
              {/* {
                (question.qType === "radio" || question.qType === "checkbox") && 
                <Box>
                {
                  Object.keys(myAnswers[question.id]).map((title, index) => {
                    return (
                      <Box sx={{
                        width: '432px',
                        height: '24px',
                        m: '10px',
                        pl: '10px',
                        bgcolor: 'rgba(0,0,0,0.05)',
                      }}>
                        {title} - {myAnswers[question.id][title]}
                      </Box>
                    )
                  })
                }
                </Box>
              } */}
              
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
      bgcolor: 'rgba(0,0,0,0.1)',
      color: 'black',
      m: '10px',
      borderRadius: '4px',
      pl: '10px',
      width: '432px',
      height: '56px',
      fontSize: '20px',
    }}>
      <Box sx={{
        width: '432px',
        height: '56px',
      }}> {question.title} </Box>
      <Box sx={{
        width: '432px',
        height: '56px',
      }}> {question.desc} </Box>
    </Box>
  )
}

const AnswerWrapper = ({answers, answerObjArray, question}) => {
  return (
    answerObjArray.map((answer, index) => {
      return (
        <Box key={index}>
          <Answer answers={answers} answer={answer} question={question} />
        </Box>
      )
    })
  )
}

const Answer = ({answers, answer, question}) => {
  // check how many options are answered.. how?
  // object key: option.title, value: number
  // value/totAnswers * 100 => show in graph (css)
  
  
  return (
    <Box>
     {
      ((question.qType === "text") || (question.qType === "longText")) &&
      <Box> 
        <Box sx={{
          p:'16px',
          width: '70%',
          ml: '10px',
          mt: '10px',
          bgcolor: 'rgba(0,0,0,0.05)',
        }}> {answer.answerText} </Box>
        </Box>
    }
   
    <Box>
        {
          ((question.qType === "radio") || (question.qType === "checkbox")) &&
            answer.FormQuestionAnswerOptions.map((option, index) => {
            return (
              <Box key={index} 
                sx={{
                width: '432px',
                height: '24px',
                m: '10px',
                pl: '10px',
                bgcolor: 'rgba(0,0,0,0.05)',
              }}>
                {option.title}
              </Box>
            )
            })
        }
      </Box>
      {/* <Box>
        {
          Object.keys(myAnswers[question.id]).map((title, index) => {
            return (
              <Box key={index}>
                {title} - {myAnswers[question.id][title]}
              </Box>
            )
          })
        }
      </Box>  */}
      
      
    </Box>
  )
}
