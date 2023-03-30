import {AddGoalModal} from './components/AddGoalModal.tsx';
import { GoalGrid } from './components/GoalGrid.tsx';

import './App.scss';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Apgar Score</h1>
            </header>
            <AddGoalModal cadence="daily"/>
            <div className='container centered-content'>
            </div>
                <GoalGrid cadence="daily"/>
                <GoalGrid cadence="weekly"/>
                <GoalGrid cadence="monthly"/>
        </div>
    );
}

export default App;
