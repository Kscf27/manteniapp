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

## 📬 Flujo de Envío de la Demo por Correo

1. El usuario completa sus datos (Nombre, Empresa, Correo, Teléfono) y presiona **"Quiero mi Demo"**.
2. El backend procesa la petición y envía un correo interactivo directamente al **correo del usuario**.
3. El correo recibido contiene una plantilla diseñada para **ManteniApp**, con un botón principal que redirige a la aplicación en vivo desplegada en Vercel:
   👉 **https://manteniapp.vercel.app/**
4. Se envía una copia oculta (BCC) a `entregaservicio53@gmail.com` para registro del proyecto.
