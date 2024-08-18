import React  from 'react'

const TodoInput = ({ input, onSubmit, onChange }) => {

  return (
    <div>
        <form className='form'>
            <input placeholder='할 일 입력'
                   className='input'
                   onChange = {onChange}
                   value = {input} />
            <button type='submit'
                    className='btn'
                    onClick={onSubmit}>추가</button> 
        </form>
    </div>
  )
}

export default TodoInput
