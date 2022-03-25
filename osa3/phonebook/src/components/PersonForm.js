const PersonForm = (props) => {
  return (
    <>
      <h3>add a new</h3>
      <form onSubmit={props.handleAdd}>
        <div>
          name: <input
            value={props.nameValue}
            onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input
            value={props.numberValue}
            onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
  