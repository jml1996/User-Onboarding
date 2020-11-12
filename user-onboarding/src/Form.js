import React from 'react'


export default function Form(props) {
  const {
    values,
    change,
    submit,
    disabled,
    errors,
  } = props

//   onSubmit
  const formSubmit = evt => {
    evt.preventDefault()
    submit()
  }

//   onChange
  const formChange = evt => {
    const { name, value, type, checked } = evt.target
    // debugger;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  }

  return (
    <form className='form container' onSubmit={formSubmit}>
      <div className='form-group submit'>
        <h2>Add a User</h2>

        <button disabled={disabled}>submit</button>

        <div className='errors'>
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div>
      </div>

      <div className='form-group inputs'>
        <h4>General information</h4>

        <label>Name&nbsp;
          <input
            value={values.name}
            onChange={formChange}
            name='name'
            type='text'
          />
        </label>

        <label>Email
          <input
            value={values.email}
            onChange={formChange}
            name='email'
            type='text'
          />
        </label>

        <label>Password
          <input
            value={values.password}
            onChange={formChange}
            name='password'
            type='text'
          />
        </label>

      <div className='form-group checkboxes'>
        <h4>Terms of Service</h4>
        <label>I agree
          <input
            type="checkbox"
            name="terms"
            checked={values.terms}
            onChange={formChange}
          />
        </label>
       </div>
      </div>
    </form>
  )
}
