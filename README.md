# CareBridge Hospital frontend

A Day 1 React portfolio frontend for the Smart Hospital Appointment & Queue Management System. The hospital name and department details are sample content.

## Start the frontend

```sh
npm install
npm run dev
```

Vite prints the local development URL (usually `http://localhost:5173`). Open it in a browser. Client-side navigation is handled by React Router.

To check the production bundle and lint the source:

```sh
npm run build
npm run lint
```

## Connect to the Spring Boot API

Copy `.env.example` to `.env` in this folder:

```text
VITE_API_BASE_URL=http://localhost:8080/api
```

Restart the Vite server after changing environment variables. `src/services/api.js` creates the shared Axios client using this base URL. The home page's `BackendStatus` component calls `GET /health`, and registration calls `POST /auth/register` (the full default URL is `http://localhost:8080/api/auth/register`).

The registration form validates required fields, name/email/phone formats, the backend password policy, and matching confirmation before sending anything. The backend independently validates the request and returns field errors; the frontend displays those alongside the relevant fields. Duplicate email, authorization, and network/server failures are reported without showing a success message. Successful registration returns HTTP 201 and shows a confirmation. The password is sent only in the registration request and is not persisted by the frontend.

The login page currently validates its fields but remains a UI preview: the backend project does not expose a login endpoint, so no login request is sent. Frontend validation is for usability only; it is not a security boundary or a defense against injection. Backend validation, safe database access, and output encoding remain necessary.

The home page reports **Backend Connected** only when its health request succeeds. If a request fails in the browser, inspect the browser's Network and Console panels. Spring Boot must allow the exact origin shown in the browser address bar (for example, `http://localhost:5173` or `http://127.0.0.1:5173`) through its CORS configuration.

## Day 1 routes and boundaries

- `/` — home page, sample departments, and backend status
- `/doctors` — doctor-directory placeholder
- `/departments` — sample department list
- `/login` — validated email/password fields; no authentication request
- `/register` — validated patient profile; submits to the Spring Boot registration endpoint

Doctor search, appointment booking, queue management, and AI integration are not implemented in this Day 1 frontend.
