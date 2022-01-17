import styles from '../../styles/Home.module.css'

export default function Question ({
  question, 
  updateQuestion,
  deleteQuestion, 
  addSelectOption, 
  updateOptionTitle,
  updateOptionDesc, 
  deleteSelectOption,
  }) {
  return <div className={styles.card}>
    {/* common area for all qTypes */}
    {/* <div>{question.qType} - {question.title} - {question.desc}</div> */}
    <div>
      <input className={styles.title} placeholder='Question Title' value={question.title} onChange={e => updateQuestion("title", e.target.value, question.uuid)}/>
      <br/>
      <input className={styles.title} placeholder='Question Description' value={question.desc} onChange={e => updateQuestion("desc", e.target.value, question.uuid)}/>

      <select className={styles.select} value={question.qType} onChange={e => updateQuestion("qType", e.target.value, question.uuid)}>
        <option value="checkbox">checkbox</option>
        <option value="radio">radio</option>
        <option value="text">text</option>
        <option value="longText">long text</option>
      </select>

      <button className={styles.delete} onClick={e => deleteQuestion(question.uuid)}>delete</button>
    </div>
    {/* <input placeholder='Question Description' value={question.desc} onChange={e => updateQDesc(e.target.value, question.uuid)}/> */}
    

    {/* qType: checkbox or radio*/}
    {
      ((question.qType === "checkbox") || (question.qType === "radio"))  &&
      <div className={styles.optionContainer}>
        {question.selectOptions.map((option, index) => {
          return (
            <Option key={index} qType={question.qType} uuid={option.uuid} title={option.title} desc={option.desc} question={question} 
                            updateOptionDesc={updateOptionDesc} updateOptionTitle={updateOptionTitle} deleteSelectOption={deleteSelectOption} />
          )
        })}
        <button className={styles.addOption} onClick={e => addSelectOption(question.uuid)}>add option</button>
      </div>
    }

    {/* qType: text or longText*/}
    {
      ((question.qType === "text") || (question.qType === "longText")) &&
      <Text question={question} updateQuestion={updateQuestion} />
    }
    <div className={styles.cardLeftBar}></div>
    
    
  </div>
}

function Option(props){
  return (
    <div className={styles.option}>
      <input className={styles.optionBtn} type={props.qType} name = "option"/>
      <input className={styles.optionTitle} placeholder='Option Title' value={props.title} onChange={e => props.updateOptionTitle(e.target.value, props.question.uuid, props.uuid)}/>
      {/* <input className={styles.desc} placeholder='Option Description' value={props.desc} onChange={e => props.updateOptionDesc(e.target.value, props.question.uuid, props.uuid)}/> */}
      <button className={styles.optionDelete} onClick={e => props.deleteSelectOption(props.question.uuid, props.uuid)}>x</button>
    </div>
  )
}

function Text(props){
  return (
    <div>
      <textarea className={styles.customTextarea} placeholder={props.question.qType} value={props.question.text} onChange={e => props.updateQuestion("text", e.target.value, props.question.uuid)}/>
    </div>
  )
}