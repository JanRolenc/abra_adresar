
const GroupsView = ({ filterFirms, reloadList, loadList, kohorts, loadFirmsToggler }) => {
  return (
    <div className="abra-prodej-app__container__functions">
      {!loadFirmsToggler &&
        <button onClick={loadList}>NAČTI DATA</button>}
      {kohorts.length > 0 ?
        <div className="abra-prodej-app__container__functions__kohorts">
          <h3>Třídění dle PSČ</h3>
          {kohorts.map((koh, index) => (
            <p key={index} onClick={(e) => filterFirms(e)} id={Object.keys(koh)}>
              {Object.keys(koh)}:&nbsp;&nbsp; {`${Object.values(koh)[0].toString().substring(0, 2).padEnd(8, " x")}`}</p>
          ))}
          <button onClick={reloadList}>RELOAD</button>
        </div>
        : null
      }
    </div>
  )
}

export default GroupsView

