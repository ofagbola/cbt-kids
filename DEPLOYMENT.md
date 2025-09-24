# CBT for Kids - Deployment Guide 🚀

This guide will help you deploy the CBT for Kids application to AWS using Amplify or S3 + CloudFront.

## Prerequisites

- AWS Account with appropriate permissions
- Node.js 18+ installed locally
- Git repository (GitHub recommended)
- Domain name (optional, for custom domain)

## Option 1: AWS Amplify (Recommended) 🌟

AWS Amplify is the easiest way to deploy this React application with automatic CI/CD.

### Step 1: Prepare Your Repository

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial CBT for Kids application"
   git push origin main
   ```

2. **Ensure your repository is public** (required for free Amplify hosting)

### Step 2: Deploy with AWS Amplify

1. **Go to AWS Amplify Console:**
   - Visit [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"

2. **Connect Repository:**
   - Choose "GitHub" as your source
   - Authorize AWS to access your GitHub account
   - Select your repository: `cbt-for-kids`
   - Choose the `main` branch

3. **Configure Build Settings:**
   - Amplify will auto-detect the build settings from `amplify.yml`
   - Review the configuration:
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - npm install -g pnpm
             - pnpm install
         build:
           commands:
             - pnpm run build
       artifacts:
         baseDirectory: dist
         files:
           - '**/*'
     ```

4. **Deploy:**
   - Click "Save and deploy"
   - Wait for the build to complete (5-10 minutes)
   - Your app will be available at: `https://main.d1234567890.amplifyapp.com`

### Step 3: Custom Domain (Optional)

1. **In Amplify Console:**
   - Go to "Domain management"
   - Click "Add domain"
   - Enter your domain name
   - Follow the DNS configuration instructions

2. **Update DNS:**
   - Add the provided CNAME record to your domain registrar
   - Wait for SSL certificate provisioning (up to 24 hours)

## Option 2: S3 + CloudFront 🗂️

For more control over hosting and CDN configuration.

### Step 1: Build the Application

```bash
# Install dependencies
pnpm install

# Build for production
pnpm run build
```

### Step 2: Create S3 Bucket

1. **Go to S3 Console:**
   - Visit [AWS S3 Console](https://console.aws.amazon.com/s3/)
   - Click "Create bucket"

2. **Configure Bucket:**
   - Bucket name: `cbt-kids-[your-unique-name]`
   - Region: Choose your preferred region
   - Uncheck "Block all public access"
   - Acknowledge the warning

3. **Enable Static Website Hosting:**
   - Go to "Properties" tab
   - Scroll to "Static website hosting"
   - Enable it
   - Set index document: `index.html`
   - Set error document: `index.html` (for SPA routing)

### Step 3: Upload Files

1. **Upload Build Files:**
   ```bash
   # Install AWS CLI if not already installed
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

2. **Set Bucket Policy:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

### Step 4: Create CloudFront Distribution

1. **Go to CloudFront Console:**
   - Visit [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/)
   - Click "Create distribution"

2. **Configure Distribution:**
   - Origin domain: Your S3 bucket domain
   - Default root object: `index.html`
   - Error pages: Add custom error response for 403/404 → 200 → `/index.html`

3. **Deploy:**
   - Click "Create distribution"
   - Wait for deployment (15-20 minutes)
   - Your app will be available at the CloudFront domain

## Environment Configuration 🔧

### Required Environment Variables

Create a `.env` file for local development:

```env
VITE_APP_TITLE="CBT Tools for Kids"
VITE_APP_DESCRIPTION="A bright, kid-friendly CBT space to explore thoughts, feelings, and behaviors"
VITE_APP_VERSION="1.0.0"
```

### Production Environment

For production deployments, set these in your hosting platform:

- **Amplify:** Environment variables in the console
- **S3/CloudFront:** Build-time variables only

## Performance Optimization ⚡

### Build Optimization

The app is already optimized with:
- ✅ Vite for fast builds
- ✅ Tree shaking for smaller bundles
- ✅ Code splitting
- ✅ Optimized images
- ✅ CSS purging with Tailwind

### Additional Optimizations

1. **Enable Compression:**
   - CloudFront: Automatic gzip compression
   - Amplify: Built-in compression

2. **Cache Headers:**
   - Static assets: 1 year
   - HTML files: 1 hour

3. **CDN:**
   - CloudFront provides global CDN
   - Amplify includes global CDN

## Monitoring and Analytics 📊

### AWS CloudWatch

Monitor your application:
- **Amplify:** Built-in monitoring
- **CloudFront:** Access logs and metrics

### Google Analytics (Optional)

Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Security Considerations 🔒

### Content Security Policy

Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;">
```

### HTTPS

- **Amplify:** Automatic HTTPS
- **CloudFront:** Automatic HTTPS with AWS Certificate Manager

## Troubleshooting 🛠️

### Common Issues

1. **Build Failures:**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   pnpm run build
   ```

2. **Routing Issues (404 on refresh):**
   - Ensure error pages redirect to `index.html`
   - Check SPA routing configuration

3. **Environment Variables Not Working:**
   - Ensure variables start with `VITE_`
   - Rebuild after adding new variables

### Support

- Check AWS documentation
- Review build logs in Amplify Console
- Test locally with `pnpm run preview`

## Cost Estimation 💰

### AWS Amplify
- **Free tier:** 1,000 build minutes/month
- **Hosting:** Free for 12 months, then $0.023/GB/month
- **Custom domain:** Free SSL certificate

### S3 + CloudFront
- **S3:** $0.023/GB/month (first 50GB free)
- **CloudFront:** $0.085/GB (first 1TB free)
- **Data transfer:** $0.09/GB (first 1GB free)

## Next Steps 🎯

After deployment:

1. **Test all functionality** on the live site
2. **Set up monitoring** and alerts
3. **Configure custom domain** if desired
4. **Set up CI/CD** for automatic deployments
5. **Add analytics** to track usage
6. **Create backup strategy** for user data

---

**Need help?** Check the [AWS documentation](https://docs.aws.amazon.com/) or create an issue in the repository.