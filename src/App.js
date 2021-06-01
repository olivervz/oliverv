import Main from './components/sections/Main'
import Portfolio from './components/sections/Portfolio'
import styled from 'styled-components'

const StyledContainer = styled.div`
  position:relative;
  top:0;
  left:0;
  bottom:0;
  right:0;
  height: 100vh;
  width: 100vw;
  background: #3B5954;
  margin: 0;
`
function App() {
  return (
    <>
      <StyledContainer>
        <Main />
      </StyledContainer>
      <StyledContainer>
        <Portfolio />
      </StyledContainer>
    </>
  );
}

export default App;
