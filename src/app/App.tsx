import { Suspense } from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';

function App() {
    return (
        <div className="min-h-screen bg-cover bg-slate-100">
            <Navbar />
            <Suspense fallback="">
                <div className="flex relative">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
