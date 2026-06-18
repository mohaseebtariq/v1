<div align="center">
  <img alt="Logo" src="https://lh3.googleusercontent.com/tT0mylPVy8KxS8ZsctpzLPOli6sdTvQch2X1ZLPAfIzw2QNhCOnXyvsGE3_QNONAnglVT7B2pVajPa9xX5AC1TEUo4LFSIosKRjFTOnESz6Zbo976PU6r-vTm0uQyIPvpjk3fQE-sg=s131-p-k" width="100" />
</div>
<br>
<p align="center">
  My Personal Portfolio <a href="https://www.haseebtariq.dev/" target="_blank" rel="noopener noreferrer">haseebtariq.dev</a> built with <a href="https://angular.io/" target="_blank" rel="noopener noreferrer">Angular</a> and hosted with <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a>
</p>

![demo](https://lh3.googleusercontent.com/pw/AP1GczPvkkAqekb7GTpKUsLimoIfz2HhhyvBm_8rT2WFQukPSof7JQN16KR_Msg-TshRyJjvHihH2gUbhk0u4IIYjkl9j4sqmr_C-EpYsvnvV83FF9q2MvCk=w2400)

## 🛠 Installation & Set Up

1. Install the Angular CLI

   ```sh
   npm install -g @angular/cli
   ```

2. Install dependencies

   ```sh
   npm i
   ```

3. Copy environment variables (see `.env.example`), then start the development server

   ```sh
   npm start
   ```

   Or:

   ```sh
   ng serve
   ```

   Navigate to `http://localhost:4200/`

## 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
   npm run build
   ```

   Or:

   ```sh
   ng build
   ```

   The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build on older Angular versions.

2. Preview the site as it will appear once deployed

   ```sh
   Go to the /dist directory and run command `ng serve`
   ```

## Deployment

Production deploys run on **Netlify** from the `develop` branch (`dist/portfolio/browser`). Content is managed in **Contentful**; publishing content can trigger a rebuild via the CMS webhook.

## 🎨 Color Reference

| Token | Hex | Usage |
| ----- | --- | ----- |
| Background Primary | ![#122F5A](https://img.shields.io/badge/%23122F5A-122F5A?style=flat-square) | Page background (`--bg-primary-color`) |
| Card Background | ![#143565](https://img.shields.io/badge/%23143565-143565?style=flat-square) | Cards and panels (`--card-background-color`) |
| Primary Text | ![#D4F1F4](https://img.shields.io/badge/%23D4F1F4-D4F1F4?style=flat-square&color=555555) | Body text (`--primary-text-color`) |
| Heading Secondary | ![#E2E8F0](https://img.shields.io/badge/%23E2E8F0-E2E8F0?style=flat-square&color=555555) | Headings and labels (`--heading-sec-color`) |
| Accent | ![#00FFB3](https://img.shields.io/badge/%2300FFB3-00FFB3?style=flat-square) | Links and highlights (`--secondary-text-color`) |
| Muted Text | ![#A8B8C8](https://img.shields.io/badge/%23A8B8C8-A8B8C8?style=flat-square&color=555555) | Secondary copy (`--muted-text-color`) |
| Image Fill | ![#F3F3F3](https://img.shields.io/badge/%23F3F3F3-F3F3F3?style=flat-square&color=555555) | Image placeholders (`--img-fill-color`) |
