import { useAuthStatus } from '../hooks/useAuthStatus';
import Tasks from './Tasks';
import Hello from './Hello';

function Home() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  return loggedIn ? <Tasks /> : <Hello />;
}

export default Home;
