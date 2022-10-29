
const GroupsView = ({ filterFirms, reloadList, loadList, makeKohorts, kohorts }) => {
  // console.log("kohorts v group", kohorts)
  return (
    <div className="abra-prodej-app__container__kohorta">
      <button onClick={loadList}>NAČTI DATA</button>
      {kohorts.length > 0 ?
        <div>
          {kohorts.map((koh, index) => (
            <p key={index} onClick={(e) => filterFirms(e)} id={Object.keys(koh)}>
              {Object.keys(koh)}: {`${Object.values(koh)[0].toString().substring(0, 2).padEnd(5, "x")}`}</p>
          ))}
          <button onClick={reloadList}>RELOAD</button>
        </div>
        : null
      }
    </div>
  )
}

export default GroupsView

