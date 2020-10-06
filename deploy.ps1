# build
npm run build

# navigate into the build output directory
cd dist

# deploy to a custom domain
New-Item  -Path . -Name "CNAME" -ItemType "file" -Value "sarahetkev.in"

git init
git add -A
git commit -m 'deploy'

# deploy to https://kevinbourassahoule.github.io
git push -f git@github.com:kevinbourassahoule/kevinbourassahoule.github.io.git master

cd ../