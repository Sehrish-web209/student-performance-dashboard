import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import StudentDashboard from './StudentDashboard'
import data from 'src/students-100.json';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentDashboard students={data} />
  </StrictMode>,
)
