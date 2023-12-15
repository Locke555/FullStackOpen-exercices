const PersonForm = ({onSubmit, nameValue, onNameChange, numberValue, onNumberChange}) => {


    return(
    <form onSubmit={onSubmit}>
        <div>
          <div>name: <input value={nameValue} onChange={onNameChange}/></div>
          <div>number: <input value={numberValue} onChange={onNumberChange}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm