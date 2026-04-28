# Delia Fajas y Lencería

Este es un proyecto construido con Next.js 14+ (App Router), Tailwind CSS y Sanity.io.

## Autenticación de Sanity (Proteger el Panel)

Sanity Studio viene protegido por defecto usando su sistema de autenticación nativo. No es necesario implementar un sistema extra en Next.js (como NextAuth/Auth.js) para acceder al panel de administración. Solo los miembros de tu proyecto en Sanity pueden acceder a `/studio`.

Para asegurar que solo la dueña pueda entrar:

1. Ingresa al panel de control de Sanity: [https://manage.sanity.io](https://manage.sanity.io)
2. Selecciona el proyecto de **Delia**.
3. Ve a la pestaña **Members**.
4. Haz clic en **Invite Member**.
5. Ingresa el correo electrónico de la dueña (Google/Email).
6. Asígnale el rol de **Administrator** (para poder cambiar esquemas) o **Editor** (para solo editar contenido y no romper la configuración).
7. Cuando ella intente acceder a `tusitio.com/studio`, Sanity le pedirá que inicie sesión con su cuenta (Google, GitHub, o Email). Solo ella (y quienes estén en esa lista) podrán ver y modificar los datos.

## Desarrollo Local

1. Clona el proyecto.
2. Instala dependencias: `npm install`
3. Copia el archivo de entorno (necesitas tu Project ID y Dataset de Sanity):
   Crea un archivo `.env.local` con:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="tu-project-id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```
4. Ejecuta el servidor: `npm run dev`
5. La página web corre en `http://localhost:3000`
6. El panel de administración corre en `http://localhost:3000/studio`
