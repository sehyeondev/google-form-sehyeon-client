import axios from 'axios'

export default function Sample({landingCourses}) {

  return(
    <div>
      <div>Sample page</div>
      <br/>
      <div> {
        landingCourses.map((courseObj) => {
          return(
            <div>
              <span styles={{display: "flex", flexDirection:"row"}}> {courseObj.title} </span>
              {courseObj.courses.map((course) => {
                return (
                  <div key={course.id} styles={{display: "flex", flexDirection: "row"}}>
                    <img src={course.image_url} style={{width:200, height:300}}></img>
                    <br/>
                    <span>{course.category}</span>
                    <br/>
                    <span>{course.title}</span>
                    <br/>
                    <span>{course.subtitle}</span>
                  </div>
                )
              })}
          </div>
          )
        })
      }</div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await axios.get("https://api.ringleplus.com/api/v4/student/landing/course?locale=en");
  console.log(res);
  
  const data = res.data

  return {
    props: {
      landingCourses: data.categories
    }
  }
}