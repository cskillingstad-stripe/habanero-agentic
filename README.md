This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

This project requires **Node.js >= 20**. The `.node-version` file is included so
tools like `nodenv`, `fnm`, and `nvm` will automatically select the right
version.

## Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. Set up environment variables

Copy the example env file and fill in your Stripe test API keys:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your keys from the
[Stripe Dashboard](https://dashboard.stripe.com/test/apikeys). Both keys must be
from the same Stripe account.

### 3. Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.
