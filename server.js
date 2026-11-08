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

    // Contenido del correo en formato HTML elegante
    const mailOptions = {
      from: `"ManteniApp Notificaciones" <${process.env.EMAIL_USER.trim()}>`,
      to: process.env.EMAIL_USER.trim(),
      replyTo: correo,
      subject: `🚀 Nueva Solicitud de Demo: ${empresa} - ${nombre}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
            .card { background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
            .header { background: #0D824B; color: #ffffff; padding: 24px 32px; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
            .header p { margin: 4px 0 0; font-size: 14px; opacity: 0.9; }
            .content { padding: 32px; }
            .data-row { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; }
            .label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px; }
            .value { font-size: 16px; font-weight: 500; color: #0f172a; }
            .highlight { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 8px; margin-top: 24px; font-size: 14px; color: #166534; }
            .footer { padding: 16px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>¡Nueva Solicitud de Demo en ManteniApp!</h1>
              <p>Un cliente potencial ha solicitado una demostración personalizada.</p>
            </div>
            <div class="content">
              <div class="data-row">
                <div class="label">Nombre del Contacto</div>
                <div class="value">${escapeHtml(nombre)}</div>
              </div>
              <div class="data-row">
                <div class="label">Empresa / Organización</div>
                <div class="value">${escapeHtml(empresa)}</div>
              </div>
              <div class="data-row">
                <div class="label">Correo Electrónico</div>
                <div class="value"><a href="mailto:${escapeHtml(correo)}" style="color: #0D824B; text-decoration: none;">${escapeHtml(correo)}</a></div>
              </div>
              <div class="data-row">
                <div class="label">Teléfono de Contacto</div>
                <div class="value"><a href="tel:${escapeHtml(telefono)}" style="color: #0D824B; text-decoration: none;">${escapeHtml(telefono)}</a></div>
              </div>
              <div class="highlight">
                <strong>Siguiente paso sugerido:</strong> Contactar al prospecto dentro de las primeras 24 horas para agendar la llamada de demostración.
              </div>
            </div>
            <div class="footer">
              Enviado automáticamente desde el sitio web de ManteniApp · ${new Date().toLocaleString('es-ES', { timeZone: 'America/Bogota' })}
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Sent] MessageId: ${info.messageId} para ${correo}`);

    return res.status(200).json({
      success: true,
      message: '¡Solicitud enviada exitosamente! Nos pondremos en contacto contigo muy pronto.'
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
