const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Configuración del transporte de correo SMTP
function createTransporter() {
  const host = (process.env.EMAIL_HOST || 'smtp.gmail.com').trim();
  const port = parseInt((process.env.EMAIL_PORT || '465').trim(), 10);
  const secure = process.env.EMAIL_SECURE ? process.env.EMAIL_SECURE.trim() === 'true' : (port === 465);
  const user = (process.env.EMAIL_USER || '').trim();
  const pass = (process.env.EMAIL_PASS || '').trim();

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    },
    tls: {
      // Evita errores de certificados intermedios/proxies locales en entornos de desarrollo Windows
      rejectUnauthorized: false
    }
  });
}

// Ruta para procesar la solicitud de demo
app.post('/api/solicitar-demo', async (req, res) => {
  try {
    const { nombre, empresa, correo, telefono } = req.body;

    // Validación básica de campos requeridos
    if (!nombre || !empresa || !correo || !telefono) {
      return res.status(400).json({
        success: false,
        error: 'Por favor completa todos los campos del formulario.'
      });
    }

    // Validación de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({
        success: false,
        error: 'El formato de correo electrónico ingresado no es válido.'
      });
    }

    const transporter = createTransporter();

    // Enlace de la demo interactiva en Vercel
    const demoUrl = 'https://manteniapp.vercel.app/';

    // Contenido del correo que se envía al usuario solicitante
    const mailOptions = {
      from: `"ManteniApp Demo" <${process.env.EMAIL_USER.trim()}>`,
      to: correo.trim(),
      bcc: process.env.EMAIL_USER.trim(), // Copia oculta al administrador para registro
      subject: `¡Hola ${nombre}! Tu acceso a la Demo de ManteniApp está listo 🚀`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a la Demo de ManteniApp</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px 12px; color: #1e293b; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
            .header { background: #0D1929; padding: 36px 32px 30px; text-align: center; }
            .logo { font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; text-decoration: none; }
            .logo-app { color: #10B981; }
            .header-tag { display: inline-block; background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 12px; border-radius: 20px; margin-top: 12px; }
            .content { padding: 36px 32px; }
            .greeting { font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px; }
            .lead-text { font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
            .cta-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; margin: 28px 0; }
            .cta-button { display: inline-block; background: #0D824B; color: #ffffff !important; font-size: 16px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(13, 130, 75, 0.25); transition: background 0.2s; }
            .cta-subtext { font-size: 12px; color: #94a3b8; margin-top: 12px; margin-bottom: 0; }
            .features-box { margin-top: 28px; border-top: 1px solid #f1f5f9; pt: 20px; }
            .feature-item { display: flex; align-items: flex-start; margin-bottom: 14px; }
            .feature-icon { background: #ecfdf5; color: #059669; font-size: 14px; font-weight: bold; width: 24px; height: 24px; line-height: 24px; text-align: center; border-radius: 50%; margin-right: 12px; flex-shrink: 0; }
            .feature-text { font-size: 13.5px; color: #334155; line-height: 1.5; margin: 0; }
            .feature-title { font-weight: 700; color: #0f172a; }
            .details-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 16px 20px; margin: 28px 0 16px; }
            .details-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #166534; margin-top: 0; margin-bottom: 8px; }
            .details-row { font-size: 13px; color: #15803d; margin: 4px 0; }
            .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 32px; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.5; }
            .footer-link { color: #0D824B; text-decoration: none; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            
            <!-- Encabezado con Identidad Visual -->
            <div class="header">
              <a href="${demoUrl}" class="logo">Manteni<span class="logo-app">App</span></a>
              <br>
              <span class="header-tag">Demo Interactiva Habilitada</span>
            </div>

            <!-- Cuerpo del Correo -->
            <div class="content">
              <h2 class="greeting">¡Hola, ${escapeHtml(nombre)}! 👋</h2>
              <p class="lead-text">
                Muchas gracias por solicitar la demostración de <strong>ManteniApp</strong> para <strong>${escapeHtml(empresa)}</strong>. Hemos preparado tu entorno interactivo para que explores de primera mano cómo optimizar el mantenimiento de tus equipos y evitar fallas imprevistas.
              </p>

              <!-- Botón de Llamado a la Acción hacia Vercel -->
              <div class="cta-card">
                <a href="${demoUrl}" target="_blank" class="cta-button">
                  Ingresar a la Demo Interactiva &rarr;
                </a>
                <p class="cta-subtext">Haz clic arriba o accede directamente en: <a href="${demoUrl}" style="color: #0D824B;">${demoUrl}</a></p>
              </div>

              <!-- Qué puedes explorar en la Demo -->
              <div class="features-box">
                <p style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 14px;">
                  ¿Qué encontrarás en esta versión?
                </p>

                <div class="feature-item">
                  <div class="feature-icon">&#10003;</div>
                  <p class="feature-text">
                    <span class="feature-title">Tablero Operativo en Tiempo Real:</span> Visualiza de inmediato qué equipos están al día, cuáles están por programar y cuáles requieren atención urgente.
                  </p>
                </div>

                <div class="feature-item">
                  <div class="feature-icon">&#10003;</div>
                  <p class="feature-text">
                    <span class="feature-title">Hojas de Vida Digitales:</span> Olvídate de los cuadernos y hojas de cálculo dispersas; centraliza documentación e historial en una sola vista.
                  </p>
                </div>

                <div class="feature-item">
                  <div class="feature-icon">&#10003;</div>
                  <p class="feature-text">
                    <span class="feature-title">Prevención y Seguimiento:</span> Trazabilidad de órdenes de servicio y calendario de intervenciones preventivas.
                  </p>
                </div>
              </div>

              <!-- Resumen de los datos registrados -->
              <div class="details-box">
                <div class="details-title">Datos registrados para tu empresa</div>
                <div class="details-row"><strong>Contacto:</strong> ${escapeHtml(nombre)}</div>
                <div class="details-row"><strong>Empresa:</strong> ${escapeHtml(empresa)}</div>
                <div class="details-row"><strong>Correo:</strong> ${escapeHtml(correo)}</div>
                <div class="details-row"><strong>Teléfono:</strong> ${escapeHtml(telefono)}</div>
              </div>

              <p style="font-size: 13px; color: #64748b; margin-top: 20px; line-height: 1.5;">
                Si tienes preguntas o comentarios durante tu recorrido por la demo, puedes responder directamente a este correo electrónico. ¡Estaremos encantados de ayudarte!
              </p>
            </div>

            <!-- Pie de Página -->
            <div class="footer">
              <p style="margin: 0 0 6px;">
                <strong>ManteniApp</strong> &middot; Proyecto Académico Universitario
              </p>
              <p style="margin: 0;">
                Plataforma web desplegada en Vercel: <a href="${demoUrl}" class="footer-link">${demoUrl}</a>
              </p>
            </div>

          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Sent to User] MessageId: ${info.messageId} para ${correo}`);

    return res.status(200).json({
      success: true,
      message: `¡Listo! Hemos enviado el enlace de acceso a la demo a tu correo (${correo}). Revisa tu bandeja de entrada.`
    });

  } catch (error) {
    console.error('[Error sending email]:', error);
    return res.status(500).json({
      success: false,
      error: 'Hubo un error al enviar tu solicitud. Por favor intenta de nuevo o comunícate directamente con soporte.'
    });
  }
});

// Endpoint de verificación / estado del servidor
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    smtp_configured: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS)
  });
});

// Servir index.html para cualquier otra ruta
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Función auxiliar para escapar texto HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

let currentPort = parseInt(process.env.PORT || '3001', 10);

function startServer(portToTry) {
  const server = app.listen(portToTry, () => {
    console.log(`===============================================`);
    console.log(` ManteniApp Landing Server iniciado con éxito!`);
    console.log(` URL Local: http://localhost:${portToTry}`);
    console.log(` Modo SMTP: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT} (Usuario: ${process.env.EMAIL_USER})`);
    console.log(`===============================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Puerto ${portToTry} en uso, intentando con el puerto ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('Error al iniciar el servidor:', err);
    }
  });
}

startServer(currentPort);
