import { ThemeProvider } from 'react-bootstrap';
import { CustomThemeProvider } from './providers';
import { Root } from './pages';


function App() {
  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
      <CustomThemeProvider>
        <Root />
      </CustomThemeProvider>
    </ThemeProvider>
  );
}

// const container = document.getElementById('app');
// render(<App tab="home" />, container, () => {
//   console.log('rendered');
// });

// After


export default App;
