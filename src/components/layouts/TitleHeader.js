
function TitleHeader() {
  const headerStyle = {
    backgroundColor: '#494f51',
    // minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: '#fff',
  }

  return (
    <div style={headerStyle}>
      <h1>Echo Champ!</h1>
    </div>
  );
}

export default TitleHeader;
