import axios from "axios"

export default function Test () {
  const submit = async() => {
    const url = "https://valley.sehyeondev.com"
    axios.post(url)
    .then(
      res => {
        console.log(res)
      }
    )
  }
  
  return (
    <div>
      <button onClick={()=>submit()}>submit</button>
    </div>
  )
}