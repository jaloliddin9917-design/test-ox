# OX NestJS Backend

OX GROUP uchun NestJS backend test task.

## Texnologiyalar

- NestJS
- Prisma ORM (SQLite)
- JWT autentifikatsiya
- class-validator (DTO validatsiya)
- Custom decoratorlar: `@AdminOnly()`, `@ManagerOnly()`

## O'rnatish

```bash
# Dependencylarni o'rnatish
npm install

# .env faylni sozlash (namuna pastda)
cp .env.example .env

# Prisma migratsiya
npx prisma migrate dev

# Loyihani ishga tushirish
npm run start:dev
```

## .env

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
```

## API Endpoints

| Method | Endpoint | Auth | Tavsif |
|--------|----------|------|--------|
| POST | `/auth/login` | - | Email orqali OTP olish |
| POST | `/auth/verify` | - | OTP tasdiqlash, JWT olish |
| POST | `/register-company` | JWT | Kompaniya ro'yxatdan o'tkazish |
| DELETE | `/company/:id` | JWT + Admin | Kompaniyani o'chirish |
| GET | `/products?page=1&size=10` | JWT + Manager | Mahsulotlar ro'yxati |
