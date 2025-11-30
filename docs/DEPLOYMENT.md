# SoulLines Deployment Guide

Complete production deployment guide for SoulLines platform.

## 🚀 Quick Deploy

### One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nnkskt-art/soullines-poetry-platform)

## 📋 Pre-Deployment Checklist

- [ ] Supabase project created
- [ ] Database migrations run
- [ ] Storage buckets configured
- [ ] Google AI API key obtained
- [ ] Environment variables prepared
- [ ] Domain name ready (optional)
- [ ] SSL certificate configured
- [ ] Analytics setup (optional)

## 🌐 Web Application Deployment

### Deploy to Vercel (Recommended)

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
cd apps/web
vercel
```

Follow the prompts:
1. Set up and deploy? **Y**
2. Which scope? Select your account
3. Link to existing project? **N**
4. Project name? **soullines**
5. Directory? **./apps/web**
6. Override settings? **N**

#### Step 4: Configure Environment Variables

In Vercel Dashboard:

1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.example`
3. Set for Production, Preview, and Development

**Required Variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
GOOGLE_AI_API_KEY=xxx
NEXT_PUBLIC_APP_URL=https://your-domain.com
ADMIN_EMAIL=your-email@example.com
```

#### Step 5: Deploy to Production

```bash
vercel --prod
```

### Alternative: Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd apps/web
netlify deploy --prod
```

### Alternative: Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

---

## 📱 Mobile App Deployment

### iOS Deployment

#### Prerequisites
- Apple Developer Account ($99/year)
- Mac with Xcode installed
- EAS CLI installed

#### Step 1: Configure EAS

```bash
cd apps/mobile
npm install -g eas-cli
eas login
eas build:configure
```

#### Step 2: Update app.json

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourcompany.soullines",
      "buildNumber": "1.0.0"
    }
  }
}
```

#### Step 3: Build for iOS

```bash
# Development build
eas build --platform ios --profile development

# Production build
eas build --platform ios --profile production
```

#### Step 4: Submit to App Store

```bash
eas submit --platform ios
```

### Android Deployment

#### Prerequisites
- Google Play Developer Account ($25 one-time)
- EAS CLI installed

#### Step 1: Configure Android

```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.soullines",
      "versionCode": 1
    }
  }
}
```

#### Step 2: Build for Android

```bash
# Development build
eas build --platform android --profile development

# Production build (AAB for Play Store)
eas build --platform android --profile production
```

#### Step 3: Submit to Play Store

```bash
eas submit --platform android
```

---

## 🗄️ Database Deployment

### Supabase Production Setup

#### 1. Create Production Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Choose region closest to users
4. Select Pro plan for production

#### 2. Run Migrations

```bash
# Link to production project
supabase link --project-ref your-prod-ref

# Push migrations
supabase db push

# Verify
supabase db diff
```

#### 3. Configure Backups

In Supabase Dashboard:
1. Settings → Database
2. Enable Point-in-Time Recovery (PITR)
3. Set backup retention to 7 days minimum

#### 4. Set Up Replication (Optional)

For high availability:
```sql
-- Enable logical replication
ALTER SYSTEM SET wal_level = logical;
```

---

## 🔐 Security Configuration

### 1. Enable Row Level Security

Verify all tables have RLS enabled:

```sql
-- Check RLS status
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Enable if missing
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

### 2. Configure CORS

In Supabase Dashboard:
1. Settings → API
2. Add allowed origins:
   - `https://your-domain.com`
   - `https://www.your-domain.com`

### 3. Set Up Rate Limiting

```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '15 m'),
})
```

### 4. Enable 2FA for Admin

```typescript
// Enable in admin settings
await supabase.auth.mfa.enroll({
  factorType: 'totp',
})
```

---

## 📊 Monitoring Setup

### 1. Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Error Tracking with Sentry

```bash
npm install @sentry/nextjs
```

```bash
npx @sentry/wizard@latest -i nextjs
```

### 3. Uptime Monitoring

Use services like:
- UptimeRobot
- Pingdom
- StatusCake

### 4. Performance Monitoring

```typescript
// Web Vitals tracking
export function reportWebVitals(metric) {
  console.log(metric)
  // Send to analytics
}
```

---

## 🌍 CDN Configuration

### Vercel Edge Network (Automatic)

Vercel automatically uses their global CDN.

### Cloudflare (Optional)

1. Add site to Cloudflare
2. Update nameservers
3. Enable:
   - Auto Minify (JS, CSS, HTML)
   - Brotli compression
   - HTTP/3
   - Image optimization

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📧 Email Configuration

### SendGrid Setup

```bash
npm install @sendgrid/mail
```

```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

await sgMail.send({
  to: user.email,
  from: 'noreply@soullines.com',
  subject: 'Welcome to SoulLines',
  html: '<strong>Welcome!</strong>',
})
```

---

## 🎯 Performance Optimization

### 1. Enable Caching

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=120',
          },
        ],
      },
    ]
  },
}
```

### 2. Image Optimization

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['your-supabase-project.supabase.co'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
}
```

### 3. Database Optimization

```sql
-- Create indexes
CREATE INDEX CONCURRENTLY idx_poems_published 
ON poems(is_published, published_at DESC);

-- Analyze tables
ANALYZE poems;
ANALYZE likes;
ANALYZE comments;
```

---

## 🔍 SEO Configuration

### 1. Sitemap Generation

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const poems = await getPublishedPoems()
  
  return [
    {
      url: 'https://soullines.com',
      lastModified: new Date(),
    },
    ...poems.map((poem) => ({
      url: `https://soullines.com/poems/${poem.id}`,
      lastModified: poem.updatedAt,
    })),
  ]
}
```

### 2. Robots.txt

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: 'https://soullines.com/sitemap.xml',
  }
}
```

---

## 🧪 Testing Before Production

### 1. Load Testing

```bash
npm install -g artillery

# Run load test
artillery quick --count 100 --num 10 https://your-app.com
```

### 2. Security Audit

```bash
npm audit
npm audit fix
```

### 3. Lighthouse Audit

```bash
npm install -g lighthouse

lighthouse https://your-app.com --view
```

---

## 📱 Progressive Web App (PWA)

### Enable PWA

```typescript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  // your config
})
```

---

## 🚨 Rollback Strategy

### Quick Rollback on Vercel

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Database Rollback

```bash
# Restore from backup
supabase db restore --backup-id xxx
```

---

## 📈 Post-Deployment

### 1. Verify Deployment

- [ ] Homepage loads correctly
- [ ] Authentication works
- [ ] Poems display properly
- [ ] Admin panel accessible
- [ ] Mobile app connects
- [ ] Analytics tracking
- [ ] Error tracking active

### 2. Monitor First 24 Hours

- Check error rates
- Monitor response times
- Review user feedback
- Check database performance

### 3. Gradual Rollout

1. Deploy to staging
2. Test thoroughly
3. Deploy to 10% of users
4. Monitor metrics
5. Deploy to 100%

---

## 🆘 Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues

```bash
# Test connection
psql "postgresql://postgres:[password]@[host]:5432/postgres"
```

### Environment Variable Issues

```bash
# Verify in Vercel
vercel env ls

# Pull to local
vercel env pull
```

---

## 📞 Support

- **Documentation**: [docs.soullines.com](https://docs.soullines.com)
- **GitHub Issues**: [github.com/nnkskt-art/soullines-poetry-platform/issues](https://github.com/nnkskt-art/soullines-poetry-platform/issues)
- **Email**: nnkskt@gmail.com

---

**SoulLines** - Deployed with ❤️ and poetry
