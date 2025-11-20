# TechOS - Landing Page con Temática de Sistema Operativo

## 🎯 Descripción

Landing page profesional con temática de sistema operativo diseñada para servicios de **reparación, asesoría y armado de computadores**. Presenta una experiencia única e interactiva que simula un sistema operativo moderno con efectos visuales atractivos y una paleta de colores suave.

## ✨ Características Principales

### 1. **Pantalla de Carga (Boot Screen)**
- Animación de inicio tipo BIOS/OS
- Barra de progreso animada
- Mensajes de carga secuenciales
- Logo personalizado con efectos de brillo
- Efectos de fondo tipo terminal (grid y scanline)

### 2. **Escritorio del Sistema (Desktop)**
- Interfaz tipo OS moderno
- Fondo con gradientes animados y rejilla dinámica
- Iconos organizados en grid responsivo
- Sistema de ventanas interactivas y arrastrables
- Taskbar funcional con reloj en tiempo real

### 3. **Iconos de Escritorio**
- **Servicios**: Muestra las características y servicios principales
- **Proceso**: Explica el flujo de trabajo
- **Testimonios**: Muestra opiniones de clientes
- **Estadísticas**: Presenta métricas y números clave
- **FAQ**: Preguntas frecuentes
- **Contacto**: Formulario de contacto
- **Acerca de**: Información de la empresa
- **Portafolio**: Trabajos realizados

### 4. **Ventanas Interactivas**
- Ventanas arrastrables (drag & drop)
- Botones de control: minimizar, maximizar, cerrar
- Contenido dinámico integrado con componentes existentes
- Scroll personalizado
- Animaciones suaves de apertura/cierre

### 5. **Barra de Tareas (Taskbar)**
- Menú de inicio con accesos rápidos
- Indicadores de ventanas abiertas
- Reloj con fecha y hora
- Iconos del sistema (red, volumen)
- Totalmente responsiva

## 🎨 Paleta de Colores

```css
/* Colores Principales */
Azul Oscuro: #0f172a, #1e293b, #334155
Azul Claro: #60a5fa, #3b82f6
Cyan: #22d3ee
Grises: #f8fafc, #e2e8f0, #cbd5e1, #94a3b8
```

### Tema Visual
- **Fondo**: Gradientes oscuros con tonos azules
- **Acentos**: Azul claro brillante (#60a5fa)
- **Texto**: Blanco y grises claros para alto contraste
- **Efectos**: Sombras suaves, blur y transparencias

## 🚀 Tecnologías Utilizadas

- **Next.js 15.5.0** - Framework React con App Router
- **React 19.1.0** - Biblioteca de UI
- **TypeScript 5** - Tipado estático
- **CSS Modules** - Estilos con scope local
- **CSS Custom Properties** - Variables CSS para temas

## 📁 Estructura de Archivos

```
src/
├── components/
│   └── OSLanding/
│       ├── BootScreen.tsx           # Pantalla de carga inicial
│       ├── BootScreen.module.css
│       ├── Desktop.tsx              # Escritorio principal
│       ├── Desktop.module.css
│       ├── DesktopIcon.tsx          # Componente de icono
│       ├── DesktopIcon.module.css
│       ├── Window.tsx               # Ventana modal arrastrable
│       ├── Window.module.css
│       ├── Taskbar.tsx              # Barra de tareas
│       ├── Taskbar.module.css
│       ├── OSIcons.tsx              # Colección de iconos SVG
│       ├── OSLanding.tsx            # Componente principal
│       └── index.ts                 # Exports
│
└── app/
    └── os-landing/
        ├── page.tsx                 # Página principal
        └── layout.tsx               # Layout específico
```

## 🌐 Cómo Acceder

### Desarrollo
```bash
npm run dev
```
Visita: `http://localhost:3000/os-landing`

### Producción
```bash
npm run build
npm start
```

## 💡 Características Técnicas

### Efectos Visuales
- **Animaciones CSS**: Keyframes para transiciones suaves
- **Gradientes animados**: Movimiento de fondo continuo
- **Grid dinámico**: Efecto de rejilla en movimiento
- **Scanline**: Efecto de escaneo tipo CRT
- **Blur y transparencias**: Backdrop filter para efectos glassmorphism
- **Sombras y brillos**: Box-shadow y drop-shadow para profundidad

### Interactividad
- **Drag & Drop**: Ventanas arrastrables
- **Estado global**: useState para gestionar ventanas abiertas
- **Eventos del mouse**: Manejo de click, mousedown, mousemove
- **Reloj en tiempo real**: useEffect con setInterval
- **Menú desplegable**: Start menu con detección de clicks externos

### Responsividad
- **Mobile First**: Diseño adaptativo desde 320px
- **Breakpoints**: 480px, 768px, 1024px
- **Grid flexible**: Auto-fit para iconos del escritorio
- **Ventanas adaptativas**: Pantalla completa en móviles
- **Taskbar responsiva**: Ajustes de tamaño y visibilidad

## 🎭 Componentes Integrados

La landing page reutiliza componentes existentes:
- `Features` - Características del servicio
- `Process` - Proceso de trabajo
- `Testimonials` - Testimonios de clientes
- `Stats` - Estadísticas
- `Faq` - Preguntas frecuentes
- `ContactForm` - Formulario de contacto

## 📱 Experiencia de Usuario

### Flujo de Navegación
1. **Carga**: El usuario ve la pantalla de boot (5 segundos)
2. **Escritorio**: Aparece el escritorio con todos los iconos
3. **Exploración**: Click en iconos para abrir ventanas
4. **Interacción**: Arrastrar ventanas, maximizar, minimizar, cerrar
5. **Multitarea**: Abrir múltiples ventanas simultáneamente
6. **Taskbar**: Acceso rápido a ventanas abiertas

### Accesibilidad
- ARIA labels en botones
- Títulos descriptivos en iconos
- Alto contraste para legibilidad
- Navegación por teclado (próxima mejora)

## 🔧 Personalización

### Cambiar Colores
Edita las variables CSS en los archivos `.module.css`:
```css
/* Ejemplo en Desktop.module.css */
background: linear-gradient(135deg, #TU_COLOR_1, #TU_COLOR_2);
```

### Agregar Nuevos Iconos
1. Crea un nuevo icono SVG en `OSIcons.tsx`
2. Agrega el app en el array `desktopApps` en `Desktop.tsx`
3. Define el componente que se mostrará en la ventana

### Modificar Tiempo de Boot
En `BootScreen.tsx`, línea ~45:
```typescript
const bootTimer = setTimeout(() => {
  onBootComplete();
}, 5500); // Cambia este valor (en milisegundos)
```

## 🐛 Resolución de Problemas

### El servidor no inicia
```bash
# Reinstalar dependencias
CYPRESS_INSTALL_BINARY=0 npm install --legacy-peer-deps
```

### Ventanas no se arrastran
Verifica que no haya CSS que interfiera con `position: absolute` en las ventanas.

### Iconos desalineados
Ajusta el grid en `Desktop.module.css`:
```css
grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
```

## 📈 Mejoras Futuras

- [ ] Soporte para teclado (Tab, Enter, Esc)
- [ ] Animación de minimize que guarda en taskbar
- [ ] Modo oscuro/claro
- [ ] Guardar posición de ventanas en localStorage
- [ ] Más temas de color predefinidos
- [ ] Widgets en el escritorio (clima, calculadora)
- [ ] Sistema de notificaciones
- [ ] Múltiples escritorios virtuales

## 📄 Licencia

Este componente es parte del proyecto Fernando Técnico Web.

## 👨‍💻 Desarrollado por

Claude Code - Asistente de IA de Anthropic

---

**Nota**: Esta landing page está optimizada para navegadores modernos que soporten CSS Grid, Flexbox, CSS Variables y backdrop-filter.
