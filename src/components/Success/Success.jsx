import {React, useContext} from 'react'
import "./Success.css"
import { Context } from '../../utils/context'
function Success() {
  
  const{auth} = useContext(Context);
  const data = JSON.stringify(auth);
  console.log(auth);
  return (
    <div>
      <h1>{`${data}`}</h1>
    </div>
  )
}

export default Success