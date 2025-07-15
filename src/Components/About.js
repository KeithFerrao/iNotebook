import React, { useEffect } from 'react'
import { useContext } from 'react'
import NoteContext from '../Context/notes/noteContext'

const About = () => {
  
  const a  = useContext(NoteContext);
  useEffect(()=>{
    a.update();
  },[])
  
  return (
    <div>
      This is about {a.state.name} who is in class {a.state.class}
    </div>
  )
}

export default About
