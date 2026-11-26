# ManteniApp — Landing Page & Captura de Leads

Landing page oficial de **ManteniApp**, desarrollada con **HTML5 semántico**, **Tailwind CSS** y servidor backend en **Node.js** con envío automático de correos vía **Nodemailer (SMTP)**, replicando con máxima fidelidad el diseño del mockup de Figma.

---

## 🚀 Características

- **Diseño 1:1 con el Mockup de Figma:**
  - Tipografía moderna `Plus Jakarta Sans`.
  - Paleta de color oficial con verde esmeralda institucional (`#0D824B`) y sección oscura Navy (`#0D1929`).
  - Maqueta detallada del Dashboard SaaS interactivo (`app.manteniapp.com/resumen`) con métricas, tabla de equipos y alertas en tiempo real.
  - Franja de valor de 3 pilares.
  - Sección de Beneficios con tarjetas de hoja de vida, alertas automáticas y órdenes de servicio.
  - Sección oscura de módulos con Hoja de vida digital, Calendario preventivo, Alertas inteligentes y Reportes técnicos.
  - Formulario de contacto y solicitud de demo optimizado para conversión.
  - Footer corporativo completo con navegación y avisos legales.
- **100% Responsiva:** Adaptación fluida para smartphones, tablets y pantallas de escritorio.
- **Formulario Totalmente Funcional:**
  - Envío asíncrono con `fetch`.
  - Estados visuales de carga (spinner), éxito y validación de campos.
  - Integración directa con el servidor Node.js y despacho de correo con plantilla HTML enriquecida.

---

## 🛠️ Cómo Iniciar el Proyecto

### 1. Requisitos
- Node.js instalado (v18 o superior).

### 2. Instalar dependencias (si no se han instalado)
```bash
npm install
```

### 3. Iniciar el servidor
```bash
npm start
```
El servidor se iniciará en `http://localhost:3001` (o el puerto configurado en `.env`).

Abre en tu navegador:
👉 **[http://localhost:3001](http://localhost:3001)**

---

## 🚀 Módulos del Proyecto

1. **Landing Page (`index.html`):**
   - Página principal de presentación comercial, réplica exacta del mockup de Figma.
   - Formulario de contacto con envío automático de correo vía SMTP (Nodemailer).

2. **Aplicación Web Demo Interactiva (`demo.html`):**
   - Panel de control operativo completo y 100% interactivo, basado en `mockup-Panel-de-control.png` y `mockup-Hoja-de-vida-abierta.png`.
   - **Cero backend:** Funciona totalmente en el navegador con datos en memoria y persistencia automática en `localStorage`.
   - **Resumen de KPIs dinámico:** Contadores de Total, Al día, Próximos y Vencidos calculados en tiempo real.
   - **Filtros y Búsqueda en tiempo real:** Búsqueda instantánea con atajo `⌘K` / `Ctrl+K`, filtros segmentados (*Todos*, *Al día*, *Próximos*, *Vencidos*) y ordenamiento dinámico.
   - **Modal "Hoja de Vida / Detalle":** Inspección visual con fotos de maquinaria, especificaciones técnicas completas, historial de órdenes de servicio y botón funcional **"Completar Mantenimiento"** que actualiza el estado a *"Al día"*, añade un registro al historial y recalcula los contadores.
   - **Modal "Registrar Nuevo Equipo":** Permite agregar nuevos activos al inventario con actualización inmediata de la tabla y los KPIs.
   - **Campana de Alertas:** Dropdown interactivo con accesos directos a equipos urgentes o con mantenimiento próximo.
   - **Restablecer Demo:** Botón de reinicio para volver a los datos originales en cualquier momento.

---

## 📬 Flujo de Envío de la Demo por Correo

1. El usuario completa sus datos (Nombre, Empresa, Correo, Teléfono) y presiona **"Quiero mi Demo"**.
2. El backend procesa la petición y envía un correo interactivo directamente al **correo del usuario**.
3. El correo contiene una plantilla corporativa con un botón directo hacia la demo:
   👉 **`https://manteniapp.vercel.app/demo.html`**
4. Se envía una copia oculta (BCC) a `entregaservicio53@gmail.com` para registro del proyecto.
