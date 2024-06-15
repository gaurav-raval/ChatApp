import React ,{useEffect,useState}from 'react'
import { useAuth } from '../utils/AuthContext'

import { useNavigate ,Link} from 'react-router-dom';

function LoginPage() {

const { user,handleUserLogin } = useAuth();

const navigate = useNavigate()

const [credentials,setCredentials] = useState({
  email:'',
  password:''
})


const handleInputChange = (e) => {
  let name = e.target.name
  let value = e.target.value 

  setCredentials({...credentials, [name]:value})
  // console.log('CREDS:', credentials)
}
useEffect(() => {
  if(user){
    navigate('/')
  }
},[])

  return (
    <div>
      
      <div className='auth--container'>
        <div className='form--wrapper'>
<form onSubmit={(e) => {handleUserLogin(e,credentials)}} >
  <div className="field--wrapper">
    <label htmlFor="">Email:</label>
    <input type="email" 
    required
    name='email'
    placeholder='Enter your email...'

    value={credentials.email}

    onChange={handleInputChange}
    />
    </div>

     <div className="field--wrapper">
    <label htmlFor="">Password:</label>
    <input type="password" 
    required
    name='password'
    placeholder='Enter password...'

    value={credentials.password}

    onChange={handleInputChange}
    />
  </div>
  <div className="field--wrapper">
    <input type="submit" 
    className='btn btn--lg btn--main'
    value="login"

    />
  </div>
</form>
<p>Dont have an account? Register <Link to="/register" className = 'underline' >here</Link></p>

        </div>
      </div>
    </div>
  )
}

export default LoginPage