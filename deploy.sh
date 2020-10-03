# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# deploying to https://kevinbourassahoule.github.io
git push -f git@github.com:kevinbourassahoule/kevinbourassahoule.github.io.git master

cd -