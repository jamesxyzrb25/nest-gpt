Nest-GPT
💡 Descripción del Proyecto
Nest-GPT es una aplicación backend construida con NestJS que funciona como una pasarela de servicios de Inteligencia Artificial (IA). Abstrae y expone las capacidades de OpenAI a través de una serie de APIs HTTP REST bien definidas.

El sistema está diseñado para:

Procesamiento de Texto: (Ej. Verificación de ortografía).

Generación y Conversión: Creación de imágenes y conversión de audio.

Asistente Conversacional: Funcionalidad de asistente conversacional avanzada (Sam Assistant).

Manejo de subidas, descargas y almacenamiento local de archivos.

🛠️ Stack Tecnológico Clave
El proyecto se basa en un stack moderno de Node.js, centrado en la seguridad de tipos, la validación y la integración con IA:

Categoría	Tecnología	Propósito
Framework	NestJS (^10.0.0)	Framework de aplicación con inyección de dependencias.
Integración IA	openai (^4.28.0)	Biblioteca cliente oficial para la API de OpenAI.
Runtime / Lenguaje	Node.js (^20.3.1) / TypeScript	Entorno de ejecución y desarrollo con tipado seguro.
Archivos	multer / sharp	Manejo de subida de archivos y manipulación de imágenes.

Exportar a Hojas de cálculo
🚀 Guía de Inicio Rápido (Getting Started)
Sigue estos pasos para configurar y ejecutar la aplicación localmente:

Prerrequisitos
Asegúrate de tener instalados los siguientes componentes:

Node.js: Versión 16.x o superior.

npm: Versión 8.x o superior.

Git

Clave de API de OpenAI (Activa)

Configuración del Entorno
Copia el archivo de plantilla para crear tu archivo de variables de entorno:

Bash

cp .env.template .env
Configura las variables requeridas en el archivo .env:

Variable	Descripción	Ejemplo
OPEN_API_KEY	Clave de API de OpenAI para los servicios de IA.	sk-...
SERVER_URL	URL base de la aplicación.	http://localhost:3000

Exportar a Hojas de cálculo
Verificación y Health Check Básico
Una vez ejecutada la aplicación, puedes verificar su estado y probar un endpoint con curl:

Bash

# Verificar respuesta del servidor
curl http://localhost:3000

# Probar el endpoint de verificación de ortografía (GPT)
curl -X POST http://localhost:3000/gpt/orthography-check \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello worlld"}'
Nota: La aplicación creará automáticamente los directorios generated/audios/ y generated/images/ para el almacenamiento de archivos generados por los servicios de IA.
