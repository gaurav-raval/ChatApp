import React, { useState, useEffect } from "react";

import client,{
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";

import { ID,Query,Role,Permission } from 'appwrite'

import { Trash2 } from "react-feather";

import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";

function Room() {

  const {user} = useAuth()
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState('')

  console.log('message',messages)
  console.log('messageBody',messageBody);

  const[counter,setCounter] = useState(0) 


  useEffect(() => {
    getMessage();
  
    const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {

        if(response.events.includes("databases.*.collections.*.documents.*.create")){
            console.log('A MESSAGE WAS CREATED')
            setMessages(prevState => [response.payload, ...prevState])
        }

        if(response.events.includes("databases.*.collections.*.documents.*.delete")){
            console.log('A MESSAGE WAS DELETED!!!')
            setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
        }
    });

    // console.log('unsubscribe:', unsubscribe)
  
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect((
    
  ) => {
    getMessage()
  },[counter])

  const getMessage = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(20),
      ]
    );

    console.log('getMessage',response);
    setMessages(response.documents);
  };


  const handleSubmit = async (e) =>{
    e.preventDefault();
    

    let payload = {

      user_id :user.$id,

      username : user.name,

        body: messageBody


    }


    let permissions = [
      Permission.write(Role.user(user.$id))

    ]
    let  response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_MESSAGES,
        ID.unique() ,
        payload,
        permissions
        
       
    );

    setMessageBody('')
    setCounter(counter + 1)

    // console.log('response',response);

    // setMessages((prev)=>[response,...prev,])

  }

 

  const deleteMessage = async(message_id) =>{
    const result = await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      message_id
    
  );

  // setMessages(prev=> prev.filter(message => message.$id !== message_id))
  // getMessage()
  setCounter(counter + 1)
  }

  return (
    <main className="container">
      <Header/>
      <div className="room--container">

      <form onSubmit={handleSubmit} id="message--from">
        <div>
          <textarea 
          required
          maxLength='1000'
          placeholder="Say something..."
          onChange={(e)=> setMessageBody(e.target.value)}
          value={messageBody}
          ></textarea>
        </div>

         <div className="send-btn--wrapper">
          <input className="btn btn--secondary" type="submit" value='Send' />
         </div>



      </form>



        <div>
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper" >
              
              <div className="message--header">
                
              <p>{
                    message?.username ?(<span>{message.username}</span>):<span>Anonymous</span>

                }
                                                    <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>


                </p>


                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                            <Trash2 className="delete--btn" onClick={() => {deleteMessage(message.$id)}}/>
                            
                        )}              
              </div>
              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Room;
