import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {forEach} from 'p-iteration'
import {cloneDeep} from "lodash"
import Question from '../../src/components/question'
import styles from '../../styles/Home.module.css'
import {v4 as uuidv4} from 'uuid'
import Button from '@material-ui/core/Button';
import SendIcon from '@mui/icons-material/Send';


export default function Form() {
    const router = useRouter()
    
    const [questions, setQuestions] = useState([])
    const [formTitle, setFormTitle] = useState("Untitled form")
    const [formDesc, setFormDesc] = useState("")
    const [answers, setAnswers] = useState({})

    useEffect(async () => {
      if (!router.isReady) return;
      const {id} = router.query
      const url = `https://valley.sehyeondev.com/api/form/${id}`
      // const url = "http://valley.sehyeondev.com/"
      const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const content = await rawResponse.json()

      console.log(content)
      
      const cp = [...questions]

      const formQuestions = content.formQuestions;
      formQuestions.forEach((question, index) => {
        console.log(question.FormQuestionOptions)
        cp.push({
          title: question.title,
          desc: question.desc,
          qType: question.qType,
          id: question.id,
          formId: question.formId,
          selectOptions: question.FormQuestionOptions,
        })
      })
      console.log(cp)
      setQuestions(cp)
      setFormTitle(content.title)
      setFormDesc(content.desc)
    },[router.isReady])

    const submit = async () => {
      const {id} = router.query
      console.log('user submit')
      const url = "https://valley.sehyeondev.com/api/result/create"

      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userUuid:uuidv4(), answers: answers})
      })
    const content = await rawResponse.json();
    window.location.href=`/result/${id}`
    }

    const onTextChange = (text, questionId) => {
      const cp = {...answers}
      cp[questionId] = text
      setAnswers(cp)
    }

    const onOptionClicked = (clicked, oType, questionId, optionTitle) => {
      const cp = {...answers}

      if (!(questionId in answers)) {
        cp[questionId] = []
      }

      if (oType === "checkbox") {
        if (clicked) {
          cp[questionId].push(optionTitle)
        } else {
          const array = cp[questionId];
          const index = array.indexOf(optionTitle);
          array.splice(index, 1)
        }
      } else if (oType === "radio") {
        if (cp[questionId].length !== 0) {
          cp[questionId].pop();
          cp[questionId].push(optionTitle);
        } else {
          cp[questionId].push(optionTitle);
        }
        
      }
      setAnswers(cp)
    }

    return (
      <div className={styles.page}>
        {/* {
          Object.keys(answers).map((questionId, index) => {
            return (
              <div>
                {answers[questionId]}
              </div>
            )
          })
        } */}
        <div className={styles.formTitle}> {formTitle} </div>

        <div className={styles.info}>
          <div className={styles.solidBar}></div>
          <div className={styles.formTitle}> {formTitle} </div>
          <div className={styles.formTitle}> {formDesc} </div>
        </div>

        {
        questions.map((question, index) => {
          return <div key = {index} className={styles.card}>
            <div className={styles.title}>{question.title}</div>
            <br/>
            <div className={styles.title}>{question.desc}</div>
            {
              ((question.qType === "checkbox") || (question.qType === "radio"))  &&
              <div className={styles.optionContainer}>
              {
                question.selectOptions.map((option, index) => {
                  return <div key = {index} className={styles.option}>
                    <input className={styles.optionBtn} 
                      type={question.qType} 
                      onClick={ e => onOptionClicked(e.target.checked, question.qType, question.id, option.title)} 
                      name = "option"/>
                    <div className={styles.optionTitle}> {option.title} </div>
                  </div>
                })
              }
              </div>
            }

            {
              ((question.qType === "text") || (question.qType === "longText"))  &&
              <div>
                <textarea className={styles.customTextarea} 
                  placeholder="type answer here" 
                  value={answers[question.id]} 
                  onChange={e => onTextChange(e.target.value, question.id)}/>
              </div>
            }
          </div>
        })
      }
        

        <Button variant="contained" color="primary" endIcon={<SendIcon/>} style={{marginTop:10,}} onClick= {e => submit()}>Send</Button>
      </div>
    )
  }
  