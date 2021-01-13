import { useState } from 'react'

function EditableText (props) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(props.text)

  const handleChange = function (evt) {
    setText(evt.target.value)
  }
  const handleFocus = function () {
    setEditing(true)
  }
  const handleBlur = function () {
    setEditing(false)
    if (props.onChange) props.onChange(text)
  }

  const className = editing ? 'is-editing' : 'not-editing'
  return (
    <input 
    type="text" 
    value={text} 
    onChange={handleChange} 
    onFocus={handleFocus} 
    onBlur={handleBlur} 
    className={className}
    style={{
      fontSize:'inherit'
    }} />
  )  
}

export default EditableText
