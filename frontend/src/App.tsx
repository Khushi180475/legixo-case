import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { CaseListPage } from './pages/CaseListPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { CaseFormPage } from './pages/CaseFormPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/cases" element={<CaseListPage />} />
          <Route path="/cases/new" element={<CaseFormPage />} />
          <Route path="/cases/:id" element={<CaseDetailPage />} />
          <Route path="/cases/:id/edit" element={<CaseFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
