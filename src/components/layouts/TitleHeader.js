
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
      <h1>
          {/* <img src="https://media.tenor.com/O6T25ctlsk0AAAAi/alien-dance.gif" width="40" height="60" alt="Alien Dance Sticker - Alien Dance Alien Dancing Stickers" ></img> */}
              Echo Champ!
          {/* <img src="https://media.tenor.com/O6T25ctlsk0AAAAi/alien-dance.gif" width="40" height="60" alt="Alien Dance Sticker - Alien Dance Alien Dancing Stickers" ></img> */}
      </h1>
    </div>
  );
}

export default TitleHeader;
