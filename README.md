# 🏛️ Portal Gobierno de TI

Sistema de gestión y visualización de documentos para el Gobierno de Tecnologías de la Información.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 📋 Descripción

Portal web profesional para la gestión y visualización de documentos PDF del Gobierno de TI. Incluye un sistema de navegación lateral, página de inicio atractiva y un visor de PDFs integrado.

### ✨ Características

- 🏠 **Página de Inicio**: Hero section con diseño moderno y tarjetas de documentos.
- 📁 **Menú Lateral**: Navegación intuitiva con iconos y capacidad de colapsar.
- 📄 **Visor de PDF**: Visualización de documentos con controles de navegación.
- 🎨 **Diseño Profesional**: Interfaz moderna con gradientes y animaciones.
- 📱 **Responsive**: Adaptable a dispositivos móviles y tablets.
- ⚡ **Rápido**: Construido con Vite para un desarrollo ágil.

---

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.0 o superior)
- **npm** (incluido con Node.js)

Para verificar tu instalación ejecuta:
```bash
node --version
npm --version
```

## 📦 Instalación
1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd untitled
```

2. Instalar dependencias
```bash
git clone <url-del-repositorio>
cd untitled
```

3. Agregar archivos PDF Coloca tus documentos PDF en la carpeta public/pdfs/:
```bash
public/
 └── pdfs/
      ├── documento1.pdf
      ├── documento2.pdf
      ├── documento3.pdf
      └── documento4.pdf
```

4. Actualiza el array pdfDocuments en src/App.jsx si cambias los nombres:
```bash
const pdfDocuments = [
  {
    id: 1,
    name: 'Tu Documento',
    path: '/pdfs/tu-archivo.pdf',
    icon: '🔒',
    description: 'Descripción de tu documento'
  }
];
```

## 🎯 Uso
Modo Desarrollo

Para iniciar el servidor local:
```bash
npm run dev
```

## 🤝 Contribuciones
1. Haz Fork del proyecto.
2. Crea una rama (git checkout -b feature/NuevaCaracteristica).
3. Haz Commit (git commit -m 'Agrega nueva característica').
4. Haz Push (git push origin feature/NuevaCaracteristica).
5. Abre un Pull Request.

## 👤 Autores
Abundes Cortés Alejandro

Atilano Gutiérrez Kevin

García Jimpenez Osmar Alejandro

Hecho con ❤️ para el Gobierno de TI



