import {AddGoalModal} from './components/AddGoalModal.tsx';
import {ViewGoals} from './components/ViewGoals.tsx';

import './App.scss';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Apgar Score</h1>
            </header>
            <AddGoalModal/>
            <div className='container centered-content'>
                <ViewGoals/>
            </div>
        </div>
    );
}

export default App;
