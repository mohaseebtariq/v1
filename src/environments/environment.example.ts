// Copy to .env in the project root, then run: npm run config -- --environment=dev
// (or use npm start / npm run build, which run config automatically)
export const environment = {
  production: false,
  contentful: {
    spaceId: 'YOUR_CONTENTFUL_SPACE_ID',
    token: 'YOUR_CONTENTFUL_DELIVERY_TOKEN',
  },
};
