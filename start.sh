git pull
Looz41
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

npm i
rm -rf .next
npm run build
pm2 restart client
pm2 monit
