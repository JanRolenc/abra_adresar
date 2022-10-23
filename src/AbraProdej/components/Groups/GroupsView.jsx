
const GroupsView = ({ filterFirms, reloadList }) => {
  return (
    <div className="abra-prodej-app__container__kohorta">
      <p onClick={() => filterFirms("1")}>kohorta_1</p>
      <p onClick={() => filterFirms("2")}>kohorta_2</p>
      <p onClick={() => filterFirms("3")}>kohorta_3</p>
      <p onClick={() => filterFirms("4")}>kohorta_4</p>
      <p onClick={() => filterFirms("")}>kohorta_5</p>
      <button onClick={reloadList}>RELOAD</button>
    </div>
  )
}

export default GroupsView