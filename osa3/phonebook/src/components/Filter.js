const Filter = (props) => {
  return (
    <div>
    filter shown with <input
      value={props.filter}
      onChange={props.handleChange} />
    </div>
  )
}

export default Filter