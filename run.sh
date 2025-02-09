mv .env norun.txt
mv .env.build .env
npm run build
mv .env .env.build
mv norun.txt .env
scp -r build package.json package-lock.json sher:Documents/Taqdeer