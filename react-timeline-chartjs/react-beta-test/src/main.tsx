import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App.tsx'
import ChartComponent from './components/Chart.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ChartComponent />
	</StrictMode>
);
