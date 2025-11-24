import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './App.css';

// Configurar el worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Lista de documentos PDF
  const pdfDocuments = [
    { 
      id: 1, 
      name: 'Políticas de Seguridad', 
      path: '/pdfs/documento1.pdf',
      icon: '🔒',
      description: 'Normativas y políticas de seguridad informática'
    },
    { 
      id: 2, 
      name: 'Manual de Procedimientos', 
      path: '/pdfs/documento2.pdf',
      icon: '📋',
      description: 'Guía de procedimientos técnicos'
    },
    { 
      id: 3, 
      name: 'Plan Estratégico', 
      path: '/pdfs/documento3.pdf',
      icon: '🎯',
      description: 'Planificación estratégica de TI'
    },
    { 
      id: 4, 
      name: 'Normas y Estándares', 
      path: '/pdfs/documento4.pdf',
      icon: '⚖️',
      description: 'Normativas y estándares tecnológicos'
    },
  ];

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function handlePdfClick(pdf) {
    setSelectedPdf(pdf);
    setCurrentView('pdf');
    setNumPages(null);
  }

  function goToHome() {
    setCurrentView('home');
    setSelectedPdf(null);
    setNumPages(null);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🏛️</span>
            <h2>Gobierno de TI</h2>
          </div>
          <button 
            className="toggle-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={goToHome}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Inicio</span>
          </button>

          <div className="nav-section">
            <p className="nav-section-title">Documentos</p>
            {pdfDocuments.map(pdf => (
              <button
                key={pdf.id}
                className={`nav-item ${selectedPdf?.id === pdf.id ? 'active' : ''}`}
                onClick={() => handlePdfClick(pdf)}
              >
                <span className="nav-icon">{pdf.icon}</span>
                <span className="nav-text">{pdf.name}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <p>© 2024 Gobierno de TI</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Home View */}
        {currentView === 'home' && (
          <div className="home-view">
            <div className="hero-section">
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="hero-icon">🏛️</span>
                  Gobierno de TI
                </h1>
                <p className="hero-subtitle">
                  Sistema de Gestión y Gobierno de Tecnologías de la Información
                </p>
                <div className="hero-badges">
                  <span className="badge">🔐 Seguro</span>
                  <span className="badge">📊 Eficiente</span>
                  <span className="badge">✅ Confiable</span>
                </div>
              </div>
            </div>

            <div className="content-section">
              <div className="welcome-text">
                <h2>Bienvenido al Portal de Documentación</h2>
                <p>
                  Accede a todos los documentos oficiales del Gobierno de TI. 
                  Aquí encontrarás políticas, procedimientos, normas y estándares 
                  que rigen la gestión tecnológica de nuestra organización.
                </p>
              </div>

              <div className="documents-grid">
                {pdfDocuments.map(pdf => (
                  <div 
                    key={pdf.id} 
                    className="document-card"
                    onClick={() => handlePdfClick(pdf)}
                  >
                    <div className="document-icon">{pdf.icon}</div>
                    <h3>{pdf.name}</h3>
                    <p>{pdf.description}</p>
                    <button className="view-button">
                      Ver documento →
                    </button>
                  </div>
                ))}
              </div>

              <div className="info-cards">
                <div className="info-card">
                  <span className="info-icon">📚</span>
                  <h3>Biblioteca Digital</h3>
                  <p>Acceso completo a la documentación oficial</p>
                </div>
                <div className="info-card">
                  <span className="info-icon">🔄</span>
                  <h3>Actualizado</h3>
                  <p>Documentos actualizados periódicamente</p>
                </div>
                <div className="info-card">
                  <span className="info-icon">🛡️</span>
                  <h3>Seguro</h3>
                  <p>Cumplimiento de normas de seguridad</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PDF View */}
        {currentView === 'pdf' && selectedPdf && (
          <div className="pdf-view">
            <div className="pdf-header">
              <div className="pdf-title">
                <span className="pdf-icon">{selectedPdf.icon}</span>
                <div>
                  <h2>{selectedPdf.name}</h2>
                  <p>{selectedPdf.description}</p>
                </div>
              </div>
              <button className="back-button" onClick={goToHome}>
                ← Volver al inicio
              </button>
            </div>

            <div className="pdf-container">
              <Document
                file={selectedPdf.path}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="pdf-loading">
                    <div className="loading-spinner"></div>
                    <p>Cargando documento...</p>
                  </div>
                }
                error={
                  <div className="pdf-error">
                    <span>⚠️</span>
                    <p>Error al cargar el documento</p>
                  </div>
                }
              >
                <Page 
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={Math.min(900, window.innerWidth - 350)}
                />
              </Document>
            </div>

            {numPages && (
              <div className="pdf-controls">
                <button
                  disabled={pageNumber <= 1}
                  onClick={previousPage}
                  className="control-button"
                >
                  ← Anterior
                </button>
                <span className="page-info">
                  Página {pageNumber} de {numPages}
                </span>
                <button
                  disabled={pageNumber >= numPages}
                  onClick={nextPage}
                  className="control-button"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
