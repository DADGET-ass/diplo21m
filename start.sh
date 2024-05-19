pm2 stop all
git pull

npm i
rm -rf .next
npm run build
pm2 restart all
pm2 monit
