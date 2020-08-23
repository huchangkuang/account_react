yarn build &&
cd build &&
git init &&
git add . &&
git commit -m 'deploy' &&
git remote add origin git@github.com:huchangkuang/account_react_website.git &&
git push -u origin master -f
cd -
