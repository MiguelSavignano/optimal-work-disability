# Design System — Incapacidad Temporal Óptima

Referencia visual del sistema de diseño de la aplicación.
La paleta está orientada a herramientas profesionales del ámbito sanitario/laboral,
inspirada en los colores institucionales de la Seguridad Social española (azules clínicos).

---

## Paleta de colores

### Primarios

| Nombre | Hex | Uso |
|---|---|---|
| Azul principal | `#29b6f6` | Acento primario — botón, iconos, borde card, resultados, tooltips, focus ring |
| Azul marino | `#1e3a5f` | Título H1 — máxima jerarquía tipográfica |
| Azul acero | `#4a6fa5` | Subtítulo H2 — jerarquía secundaria |
| Azul subordinado | `#7a9cc0` | Notas y metadatos (ej. edición) |

### Fondo

| Nombre | Hex | Uso |
|---|---|---|
| Gradiente inicio | `#e8f4fd` | Esquina superior izquierda del fondo hero |
| Gradiente medio | `#dbeafe` | Centro del gradiente |
| Gradiente final | `#e0f2fe` | Esquina inferior derecha del fondo hero |

```
background: linear-gradient(135deg, #e8f4fd 0%, #dbeafe 50%, #e0f2fe 100%)
```

### Texto neutro

| Nombre | Hex | Uso |
|---|---|---|
| Texto principal | `#333` | Valores seleccionados en dropdowns |
| Texto secundario | `#4a4a4a` | Card header icon label |
| Texto de apoyo | `#666` | Labels de resultado, leyenda de campos |
| Placeholder | `#757575` | Placeholder en selects (WCAG AA) |
| Texto tenue | `#888` | Footer branding |
| Texto muy tenue | `#aaa` | Footer copyright |
| Placeholder resultado | `#bbb` | Texto de espera antes de calcular |

### Estados y semántica

| Nombre | Hex | Uso |
|---|---|---|
| Requerido / Error | `#e53935` | Asterisco en campos obligatorios |
| Focus | `#3273dc` | Borde de select con foco (Bulma) |
| Focus outline | `#29b6f6` | `outline` personalizado en selects |

---

## Tipografía

| Elemento | Tamaño | Peso | Color |
|---|---|---|---|
| H1 `.hero .title` | `1.8rem` | `700` | `#1e3a5f` |
| H2 `.hero .subtitle` | `1rem` | `400` | `#4a6fa5` |
| Nota de edición `.edition-note` | `0.75rem` | heredado | `#7a9cc0` |
| Card header icon | `1.1rem` | `600` | `#4a4a4a` |
| Labels de formulario | `0.85–1rem` | heredado (Bulma) | heredado |
| Asterisco requerido `.required-mark` | `0.9em` | `700` | `#e53935` |
| Leyenda requeridos `.required-legend` | `0.85rem` | heredado | `#666` |
| Resultado `.result-value` | `2rem` | `700` | `#29b6f6` |
| Label resultado `.result-label` | `0.9rem` | heredado | `#666` |
| Placeholder resultado | `0.85rem` | heredado | `#bbb` (italic) |
| Tooltip hint `.tooltip-hint` | `0.85rem` | heredado | `#29b6f6` |
| Links footer | `0.9rem` | heredado | `#555` / `#222` hover |
| Footer branding | `0.75rem` | heredado | `#888` |
| Footer copyright | `0.7rem` | heredado | `#aaa` |
| Fuente base | `14px` | `300` | — |
| Familia | `'Open Sans', sans-serif` | — | — |

---

## Componentes — Card (`.box`)

```
border-top:  3px solid #29b6f6
box-shadow:  0 4px 20px rgba(41, 182, 246, 0.08)
padding-top: 1.5rem
margin-top:  5rem
```

---

## Componentes — Selects (react-virtualized-select)

| Estado | Regla |
|---|---|
| Placeholder | `color: #757575` |
| Valor seleccionado | `color: #333` |
| Foco (outline) | `outline: 2px solid #29b6f6; outline-offset: 2px` |
| Foco (Bulma fallback) | `border-color: #3273dc; box-shadow: 0 0 0 0.125em rgba(50,115,220,.25)` |

---

## Componentes — Botón CTA

```scss
.button--big {
  width: 100%;
  margin-top: 1rem;
}
```
Color base: clase Bulma `is-info` → fondo `#29b6f6`.

---

## Componentes — Loading Spinner (`.loading-spinner`)

```
display: flex
justify-content: center
align-items: center
height: 100vh
font-size: 1.2rem
color: #666
```

---

## Jerarquía visual de colores

```
#1e3a5f  ████  Título principal (H1)
#4a6fa5  ████  Subtítulo (H2)
#29b6f6  ████  Acento — botón, icono, borde, resultados
#7a9cc0  ████  Metadatos y notas
#4a4a4a  ████  Texto de card header
#666     ████  Texto de apoyo
#757575  ████  Placeholder (mínimo WCAG AA)
#888     ████  Footer branding
#aaa     ████  Footer copyright
#bbb     ████  Placeholder de resultados
#e53935  ████  Campos requeridos (asterisco)
```

---

## Criterios de accesibilidad

| Par de colores | Ratio aprox. | Nivel WCAG |
|---|---|---|
| `#1e3a5f` sobre `#e8f4fd` | ~8:1 | AAA |
| `#4a6fa5` sobre `#e8f4fd` | ~4.6:1 | AA |
| `#333` sobre blanco (card) | ~12:1 | AAA |
| `#757575` sobre blanco | ~4.6:1 | AA (mínimo cumplido) |
| `#e53935` sobre blanco | ~4.5:1 | AA |
