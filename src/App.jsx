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
  const [pdfScale, setPdfScale] = useState(1.0);
  const [focusMode, setFocusMode] = useState(false);

  // Lista de documentos PDF
  const pdfDocuments = [
    {
      id: 1,
      name: 'Marco Organizacional del Servicio de IT',
      path: '/pdfs/1.pdf',
      icon: '📘',
      description: 'Documento que integra la introducción, objetivo del servicio de IT, descripción del servicio, misión, visión y valores de la empresa.'
    },
    {
      id: 2,
      name: 'Metas Corporativas (COBIT)',
      path: '/pdfs/2.pdf',
      icon: '🎯',
      description: 'Metas corporativas definidas con el marco COBIT, alineadas a las cuatro dimensiones del Balanced Scorecard.'
    },
    {
      id: 3,
      name: 'Metas de IT (COBIT)',
      path: '/pdfs/3.pdf',
      icon: '💻',
      description: 'Metas del área de Tecnologías de la Información elaboradas con COBIT, una por cada dimensión del Balanced Scorecard.'
    },
    {
      id: 4,
      name: 'Cascada de Metas Corporativas',
      path: '/pdfs/4.pdf',
      icon: '🔗',
      description: 'Mapeo de relaciones primarias y secundarias entre las metas corporativas según la cascada de metas de COBIT.'
    },
    {
      id: 5,
      name: 'Cascada de Metas de IT',
      path: '/pdfs/5.pdf',
      icon: '🧩',
      description: 'Relación y alineación de las metas de IT con las metas corporativas mediante la cascada de metas de COBIT.'
    },
    {
      id: 6,
      name: 'Mapa Estratégico Corporativo',
      path: '/pdfs/6.pdf',
      icon: '🗺️',
      description: 'Mapa estratégico elaborado con COBIT y Balanced Scorecard, enfocado en una meta corporativa.'
    },
    {
      id: 7,
      name: 'Mapa Estratégico de IT',
      path: '/pdfs/7.pdf',
      icon: '📊',
      description: 'Mapa estratégico del área de IT basado en COBIT y Balanced Scorecard, alineado a una meta de IT.'
    },
    {
      id: 8,
      name: 'Caso de Negocio',
      path: '/pdfs/8.pdf',
      icon: '📈',
      description: 'Caso de negocio desarrollado en formato formal, justificando la inversión y el valor del servicio de IT.'
    },
    {
      id: 9,
      name: 'Cédula de Servicio de IT',
      path: '/pdfs/9.pdf',
      icon: '📝',
      description: 'Cédula de servicio completa elaborada con ITIL, que describe el servicio, alcance, responsables y niveles de servicio.'
    },
    {
      id: 10,
      name: 'Inventario de Activos',
      path: '/pdfs/10.pdf',
      icon: '📦',
      description: 'Inventario de activos de TI que integra los activos de los tres procesos definidos.'
    },
    {
      id: 11,
      name: 'Matriz de Riesgos de Seguridad de la Información',
      path: '/pdfs/11.pdf',
      icon: '⚠️',
      description: 'Matriz de riesgos elaborada con ISO 27000, incluyendo matriz de confidencialidad, integridad, disponibilidad (CID) y de infraestructuras críticas.'
    },
    {
      id: 12,
      name: 'BIA Táctico',
      path: '/pdfs/12.pdf',
      icon: '📑',
      description: 'Análisis de Impacto al Negocio (BIA) a nivel táctico, integrando los tres BIA correspondientes a los procesos definidos del servicio de IT.'
    },
    {
      id: 13,
      name: 'BIA Operacional',
      path: '/pdfs/13.pdf',
      icon: '⚙️',
      description: 'Análisis de Impacto al Negocio (BIA) a nivel operacional, que integra un BIA enfocado en la operación directa del servicio.'
    },
    {
      id: 14,
      name: 'Plan de Continuidad del Servicio',
      path: '/pdfs/14.pdf',
      icon: '🛡️',
      description: 'Plan de Continuidad del Servicio de IT, elaborado con base en los resultados de los BIA táctico y operacional para garantizar la recuperación y continuidad del servicio.'
    }
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

  // PDF zoom handlers
  const zoomIn = () => setPdfScale((s) => Math.min(s + 0.1, 2));
  const zoomOut = () => setPdfScale((s) => Math.max(s - 0.1, 0.5));
  const resetZoom = () => setPdfScale(1.0);

  // Permitir zoom con la rueda del mouse (Ctrl+rueda o solo rueda)
  function handlePdfWheel(event) {
    // Si el usuario mantiene presionada Ctrl o Cmd, o solo usa la rueda
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      if (event.deltaY < 0) zoomIn();
      else if (event.deltaY > 0) zoomOut();
    }
  }

  // Al activar focusMode, ocultar sidebar y expandir PDF
  const handleEnterFocusMode = () => setFocusMode(true);
  const handleExitFocusMode = () => setFocusMode(false);

  return (
    <div className={`app${focusMode ? ' focus-mode' : ''}`}>
      {/* Sidebar */}
      {!focusMode && (
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <div className="logo">
              <span className="logo-icon">🏛️</span>
              <h2>ESCOQUALITY</h2>
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
            <p>© 2025 KAO</p>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className={`main-content${focusMode ? ' focus-mode' : ''}`}>
        {/* Home View */}
        {currentView === 'home' && !focusMode && (
          <div className="home-view">
            <div className="hero-section">
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="hero-icon">🏛️</span>
                  ESCOQUALITY
                </h1>
                <p className="hero-subtitle">
                  Consultora de QA
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
                  Accede a todos los documentos oficiales de ESCOQUALITY.
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
                  <p>Acceso completo a la documentación</p>
                </div>
                <div className="info-card">
                  <span className="info-icon">🔄</span>
                  <h3>Actualizado</h3>
                  <p>Documentos actualizados</p>
                </div>
                <div className="info-card">
                  <span className="info-icon">🛡️</span>
                  <h3>Seguro</h3>
                  <p>Cumplimiento de normas</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PDF View */}
        {currentView === 'pdf' && selectedPdf && (
          <div className={`pdf-view${focusMode ? ' focus-mode' : ''}`}>
            <div className="pdf-header">
              <div className="pdf-title">
                <span className="pdf-icon">{selectedPdf.icon}</span>
                <div>
                  <h2>{selectedPdf.name}</h2>
                  <p>{selectedPdf.description}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!focusMode && (
                  <button className="back-button" onClick={goToHome}>
                    ← Volver al inicio
                  </button>
                )}
                <a
                  href={selectedPdf.path}
                  download
                  className="back-button"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                  title="Descargar PDF"
                >
                  Descargar PDF
                </a>
                {!focusMode ? (
                  <button className="back-button" onClick={handleEnterFocusMode} title="Modo concentración">
                    🧘 Modo concentración
                  </button>
                ) : (
                  <button className="back-button" onClick={handleExitFocusMode} title="Salir de modo concentración">
                    Salir de concentración
                  </button>
                )}
              </div>
            </div>
            <div className="pdf-container" onWheel={handlePdfWheel}>
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
                  width={Math.min(900, window.innerWidth - 350) * pdfScale}
                  scale={pdfScale}
                />
              </Document>
            </div>

            {numPages && (
              <div className="pdf-controls">
                <button onClick={zoomOut} className="control-button" title="Alejar">−</button>
                <button onClick={resetZoom} className="control-button" title="Restablecer zoom">100%</button>
                <button onClick={zoomIn} className="control-button" title="Acercar">+</button>
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
