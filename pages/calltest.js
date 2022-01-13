import axios from 'axios'

export default function Sample({landingCourses}) {

  return(
    <div>
      <div> valley.sehyeon.com Call test page </div>
      
    </div>
  )
}

export async function getServerSideProps(context) {
  // const res = await axios.get("http://valley.sehyeondev.com/");
  const res = await axios.get("https://api.ringleplus.com/api/v4/student/landing/course?locale=en");

  console.log(res);
  
  const data = res.data

  return {
    props: {
      data: data
    }
  }
}