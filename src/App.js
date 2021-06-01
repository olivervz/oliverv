import Main from './components/sections/Main'
import styled, {css} from 'styled-components'

const StyledMainContainer = styled.div`
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  height: 100vh;
  width: 100vw;
  background: #3B5954;
`

function App() {
  return (
    <StyledMainContainer>
      <Main />
    </StyledMainContainer>
  );
}

export default App;
