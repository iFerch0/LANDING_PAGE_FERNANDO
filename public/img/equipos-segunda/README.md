# 📸 Carpeta de Imágenes para Equipos de Segunda Mano

Colocá en esta carpeta las fotografías reales de los equipos usados o reacondicionados que tengas a la venta.

## Estructura sugerida:

```
public/img/equipos-segunda/
├── EQ-GAMER-01/          (Carpeta por cada equipo o modelo)
│   ├── 1.png             (Foto principal del equipo)
│   └── 2.jpg             (Fotos secundarias / puertos / interior)
├── EQ-LAPTOP-01/
│   ├── 1.jpg
│   └── 2.jpg
└── [ID-DEL-EQUIPO]/
    └── ...
```

## Formatos recomendados:
- **Formatos**: `.webp`, `.png` o `.jpg`.
- **Relación de aspecto**: 4:3 o 16:9 con buena iluminación.
- **Configuración en el código**: En `src/data/usedEquipment.ts` podés referenciarlas simplemente con la ruta web:
  ```ts
  images: [
    '/img/equipos-segunda/EQ-GAMER-01/1.png',
    '/img/equipos-segunda/EQ-GAMER-01/2.jpg',
  ]
  ```
