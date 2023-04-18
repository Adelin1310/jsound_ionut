/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SANITY_TOKEN: 'skHRQiqnO2Ad0ceeAp1p4b5fMcUKAevf5rOV0TLqrd0c3GCd3LfiXfp1088lxRzDYlmFXaKKx7ZtMZK8KOBAqqe3Aypiy8rk0yE3ooqW8XEfrse3MNx9LMn0pn44JUAP3QITJqUSvO3ivHFUl2uOZp7btOBGW6hRH6Iw6W7kZd59EVBD1oRj',
    NEXT_PUBLISHABLE_KEY_STRIPE: 'pk_test_51LwpEmCGJaRHCAZbi6DfKbiXcB3A2NB1fnYpPRSjGN0ziwSy9lSPWEisF65uKRaSkeTRoNavUnhBd2vzbuQMRbZH00JAnixHpJ',
    NEXT_SECRET_KEY_STRIPE: 'sk_test_51LwpEmCGJaRHCAZb2MVe16KEXUmtpBIRd5jucFYDfIZm86mT2bS3CJT2OIAzSggypMW8PJ7KtuCsKZvDdlIp5sdN00NA8ywsMS',
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
