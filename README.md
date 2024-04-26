1) git clone "git@github.com:SunkaraNaveenKumar/monorepo-pnpm.git"
2) At the root of the repo run "pnpm install"
3) At the root of the repo run "pnpm start"(all the servers will be automatically started and build for stencil component will automatically start)
4) If you do any change in any repo and if the changes are not reflected in the server then come to the root folder and restart the server, so that all the servers and build will be automatically taken place
5) if one have changes in their code of any of the repos , come to the root component (i.e MONOREPOPNPM) and 
git add ., git commit -m "add your message" , git push 