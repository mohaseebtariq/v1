<div align="center">
  <img alt="Logo" src="https://lh3.googleusercontent.com/tT0mylPVy8KxS8ZsctpzLPOli6sdTvQch2X1ZLPAfIzw2QNhCOnXyvsGE3_QNONAnglVT7B2pVajPa9xX5AC1TEUo4LFSIosKRjFTOnESz6Zbo976PU6r-vTm0uQyIPvpjk3fQE-sg=s131-p-k" width="100" />
</div>
<br>
<p align="center">
  Personal portfolio of <strong>Haseeb Tariq</strong> —
  <a href="https://www.haseebtariq.dev/" target="_blank" rel="noopener noreferrer">haseebtariq.dev</a>
  built with <a href="https://angular.io/" target="_blank" rel="noopener noreferrer">Angular</a>
  and hosted with <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a>
</p>

<p align="center">
  <a href="https://www.haseebtariq.dev/" target="_blank" rel="noopener noreferrer">Live site</a>
  ·
  <a href="https://github.com/mohaseebtariq/v1" target="_blank" rel="noopener noreferrer">Public repo (v1)</a>
  ·
  <a href="https://www.linkedin.com/in/mohaseebtariq" target="_blank" rel="noopener noreferrer">LinkedIn</a>
</p>

![demo](https://lh3.googleusercontent.com/BiGiGk7_Gb3cmzE7O9CbJlCu6rElcZbKtBt5sNt4cXEFHxTPHoEP7tWpb_Hr6Y3Et9m-Bhc9PCzrFcV3swOGSYaNNMY9Oqe87Rdx_gwS8pDurm-xfJFsLouuix0SFMYPc9Fso0iLCw=w2400)

> **Note:** This private repository is used for active development and deployment. The public source for version one is [github.com/mohaseebtariq/v1](https://github.com/mohaseebtariq/v1).

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

| Color        | Hex |
| ------------ | --- |
| Eden         | ![#155B4A](https://img.shields.io/badge/%23155B4A-155B4A?style=flat-square) |
| Acapulco     | ![#76B9A5](https://img.shields.io/badge/%2376B9A5-76B9A5?style=flat-square) |
| Spring Green | ![#00FFB3](https://img.shields.io/badge/%2300FFB3-00FFB3?style=flat-square) |
| Concrete     | ![#F3F3F3](https://img.shields.io/badge/%23F3F3F3-F3F3F3?style=flat-square&color=555555) |
