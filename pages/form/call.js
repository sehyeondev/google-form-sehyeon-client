import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Sample({landingCourses}) {
  const [landingCourses, setLandingCourses] = useState([]);
  // const [categories, setCategories] = useState([]);

  useEffect(() => {
    const url = "https://api.ringleplus.com/api/v4/student/landing/course?locale=en";
    
    axios.get(url)
    .then(function (response) {
      console.log(response.data)
      setLandingCourses(response.data.categories)
    })
    .catch(function (error) {

    })

  }, [])

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