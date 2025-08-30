# 🎨 Nueva Paleta de Colores - Fernando Tech

## Paleta Principal

```css
:root {
  /* Colores de marca */
  --brand-azul_oscuro: #2b495d;      /* Azul oscuro profesional */
  --brand-naranja_quemado: #d97334;   /* Naranja quemado vibrante */
  --brand-beige_claro: #d2b384;       /* Beige claro cálido */
  --brand-rojo_intenso: #b93c27;      /* Rojo intenso de acento */
  --brand-azul_vibrante: #3a6e93;     /* Azul vibrante principal */
  --brand-marron_calido: #8b4c2f;     /* Marrón cálido terroso */
  --brand-gris_oscuro: #444444;       /* Gris oscuro para textos */
  --brand-negro: #101010;             /* Negro profundo */
  --brand-piel_bronceada: #e08f55;    /* Piel bronceada suave */
  --brand-rojo_anaranjado: #e24a27;   /* Rojo anaranjado energético */
}
```

## Uso Semántico

### Colores Principales
- **Primary**: `var(--brand-azul_vibrante)` - Botones principales, enlaces
- **Primary Hover**: `var(--brand-azul_oscuro)` - Estados hover
- **Accent**: `var(--brand-naranja_quemado)` - Elementos destacados
- **Accent Strong**: `var(--brand-rojo_anaranjado)` - CTAs importantes

### Colores de Estado
- **Success**: `var(--brand-azul_vibrante)` - Mensajes de éxito
- **Warning**: `var(--brand-naranja_quemado)` - Advertencias
- **Error**: `var(--brand-rojo_intenso)` - Errores
- **Info**: `var(--brand-gris_oscuro)` - Información general

### Colores de Texto
- **Text Primary**: `var(--brand-gris_oscuro)` - Texto principal
- **Text Secondary**: `rgba(var(--brand-gris_oscuro-rgb), 0.72)` - Texto secundario

## Implementación

### ✅ Componentes Actualizados
- [x] **SuccessCases.tsx** - Títulos y componentes técnicos
- [x] **Testimonials.tsx** - Título principal con gradiente
- [x] **Faq.tsx** - Título y estadísticas de confianza
- [x] **globals.css** - Variables CSS base y modo oscuro

### 🎯 Mapeo de Componentes Técnicos
#### Success Cases - Códigos de color por categoría:
- **🌡️ Diagnóstico**: Rojo anaranjado (alerta)
- **🧹 Limpieza**: Azul vibrante (proceso)
- **❄️ Refrigeración**: Azul oscuro (cooling)
- **⚡ Optimización**: Marrón cálido (rendimiento)
- **📊 Medición**: Naranja quemado (análisis)
- **✅ Validación**: Gris oscuro (confirmación)

### 🌙 Compatibilidad Modo Oscuro
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--brand-negro);
    --color-surface: var(--brand-gris_oscuro);
    --color-text: var(--color-gray-200);
    /* Manteniendo colores de marca para consistencia */
    --color-primary: var(--brand-azul_vibrante);
    --color-accent: var(--brand-naranja_quemado);
  }
}
```

## Beneficios de la Nueva Paleta

### 🎨 **Diseño**
- Paleta cohesiva y profesional
- Colores tierra y naturales
- Excelente contraste para accesibilidad

### 🔧 **Técnico**
- Variables CSS reutilizables
- Compatibilidad tema claro/oscuro
- Fácil mantenimiento y escalabilidad

### 📱 **UX**
- Consistencia visual en toda la aplicación
- Jerarquía clara de información
- Mejor legibilidad en todos los dispositivos

### ⚡ **Automatización**
- Script de actualización automática
- Integrado en el proceso de build
- Fácil aplicación de cambios futuros

## Scripts Disponibles

```bash
# Actualizar colores en todos los componentes
npm run update:colors

# Build completo con optimizaciones
npm run build  # Incluye actualización de colores automática
```

## Próximos Pasos

1. **Revisar contraste** en modo oscuro
2. **Validar accesibilidad** WCAG 2.1
3. **Optimizar gradientes** para mejor rendimiento
4. **Documentar tokens** para el equipo

---

*Paleta implementada el ${new Date().toLocaleDateString('es-ES')} por el sistema automatizado de Fernando Tech*
