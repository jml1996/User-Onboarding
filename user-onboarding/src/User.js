import React from 'react'

function User({ details }) {
  if (!details) {
    return <h3>Working fetching your friend&apos;s details...</h3>
  }

  return (
    <div className='friend container'>
      <h2 name="cardName">{details.name}</h2>
      <p name="cardEmail">Email: {details.email}</p>
      <p name="cardPass">Password: {details.password}</p>
      <p name="agreed">Agreed to terms of service.</p>

      {/* {
        !!details.hobbies && !!details.hobbies.length &&
        <div>
          Hobbies:
          <ul>
            {details.hobbies.map((like, idx) => <li key={idx}>{like}</li>)}
          </ul>
        </div>
      } */}
    </div>
  )
}

export default User
