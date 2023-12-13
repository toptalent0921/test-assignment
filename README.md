# Horse Care Name

## Description

This repository contains the source code for the Horse Care application. The project is divided into frontend and backend components. Follow the instructions below to set up and run the application locally.

## Getting Started

### Prerequisites

Make sure you have the following tools installed on your machine:

- [pnpm](https://pnpm.io/) - Package manager for the frontend dependencies.
- [Node.js](https://nodejs.org/) - JavaScript runtime for running the backend.

### Installation

1. Install frontend dependencies using `pnpm install`:

    ```bash
    pnpm install
    ```

2. Install backend dependencies using `npm install`:

    ```bash
    npm install
    ```

### Running the Application

#### Frontend

Run the following command to start the frontend development server:

```bash
npm run dev
```

#### Backend

Run the following command to start the backend server:

```bash
node src/index.js
```

### Environment Variables

#### Frontend

Set up the following environment variables for the frontend by creating a `.env` file in the root of the frontend directory or using your preferred method:

- `VITE_SUPABASE_PUBLIC_KEY`: Supabase public key
- `VITE_SUPABASE_URL`: Supabase URL
- `VITE_STRIPE_PK`: Stripe public key

Example `.env` file:

```env
VITE_SUPABASE_PUBLIC_KEY=your_supabase_public_key
VITE_SUPABASE_URL=your_supabase_url
VITE_STRIPE_PK=your_stripe_public_key
```

#### Backend

Set up the following environment variables for the backend in a similar way:

- `VITE_SUPABASE_PUBLIC_KEY`: Supabase public key
- `VITE_SUPABASE_URL`: Supabase URL
- `VITE_STRIPE_SK`: Stripe secret key

Example `.env` file for backend:

```env
VITE_SUPABASE_PUBLIC_KEY=your_supabase_public_key
VITE_SUPABASE_URL=your_supabase_url
VITE_STRIPE_SK=your_stripe_secret_key
```

## Contributing

If you'd like to contribute to the project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

